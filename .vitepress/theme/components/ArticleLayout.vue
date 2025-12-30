<template>
  <div class="article-container">
    <!-- 左侧目录导航 -->
    <aside class="article-sidebar">
      <div class="sidebar-content">
        <nav class="toc-nav">
          <ul class="toc-list">
            <li
              v-for="heading in headings"
              :key="heading.id" 
              :class="['toc-item', `toc-level-${heading.level}`, { active: activeHeading === heading.id }]"
            >
              <a
                :href="`#${heading.id}`"
                class="toc-link"
                @click="scrollToHeading(heading.id)"
              >
                {{ heading.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- 回到顶部按钮 -->
    <Transition name="fade">
      <button 
        v-show="showBackToTop" 
        class="back-to-top-btn" 
        aria-label="回到顶部" 
        @click="scrollToTop"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </Transition>

    <!-- 右侧文章内容 -->
    <main class="article-main">
      <article class="article-layout">
        <header class="article-header">
          <h1 class="article-title">
            {{ frontmatter.title }}
          </h1>
          <div class="article-meta">
            <time
              v-if="frontmatter.date"
              :datetime="frontmatter.date"
            >{{ formatDate(frontmatter.date) }}</time>
            <span
              v-if="frontmatter.author"
              class="author"
            >• {{ frontmatter.author }}</span>
            <span class="view-count-wrapper">
              • <ViewCounter :id="pageId" :showLabel="false" :isZh="isZh" />
            </span>
          </div>
        </header>

        <div class="article-content">
          <Content />
        </div>

        <!-- 评论区 -->
        <Comments />
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { ref, onMounted, onUnmounted, nextTick, computed } from 'vue'
import Comments from './Comments.vue'
import ViewCounter from './ViewCounter.vue'

const { site, frontmatter } = useData()
const route = useRoute()
const headings = ref<Array<{ id: string; text: string; level: number }>>([])
const activeHeading = ref('')
const showBackToTop = ref(false)

const isZh = computed(() => site.value.lang === 'zh-CN' || route.path.startsWith('/zh/'))
const pageId = computed(() => route.path.replace(/^\/|\/$/g, ''))

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

function handleScroll() {
  // 滚动超过300px时显示回到顶部按钮
  showBackToTop.value = window.scrollY > 300
  updateActiveHeading()
}

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(d))
  } catch {
    return d
  }
}

function extractHeadings() {
  nextTick(() => {
    const headingElements = document.querySelectorAll('.article-content h1, .article-content h2')
    headings.value = Array.from(headingElements).map((el, index) => {
      let id = el.id
      if (!id) {
        const text = el.textContent || ''
        id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/--+/g, '-')
          .trim() || `heading-${index}`
        el.id = id
      }
      return {
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1))
      }
    })
    updateActiveHeading()
  })
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function updateActiveHeading() {
  if (headings.value.length === 0) return
  
  const headingElements = headings.value.map(h => document.getElementById(h.id)).filter(Boolean)
  // 只有滚动超过100px后才开始检测，避免页面刚加载就选中
  const scrollTop = window.scrollY
  
  // 如果页面滚动不足100px，不选中任何项
  if (scrollTop < 100) {
    activeHeading.value = ''
    return
  }
  
  let activeId = ''
  const offset = 150 // 标题要在视口顶部下方150px才算激活
  
  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]
    if (element && element.offsetTop <= scrollTop + offset) {
      activeId = element.id
      break
    }
  }
  
  activeHeading.value = activeId
}

onMounted(() => {
  extractHeadings()
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* 主容器布局 - 强制左右排列 */
.article-container {
  width: 100vw;
  display: flex !important;
  flex-direction: row !important;
  min-height: 100vh;
  overflow-x: hidden;
}

/* 左侧边栏 - 必须在左边，序号1 */
.article-sidebar {
  order: 1;
  width: 240px;
  flex-shrink: 0;
  border-right: 1px solid var(--vp-c-border);
  padding: 1.5rem;
  background: var(--vp-c-bg);
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  position: sticky;
  top: 80px;
  height: fit-content;
  max-height: calc(100vh - 80px);
}

/* 移除滚动条样式，因为不再需要 */

/* 目录导航 */
.toc-nav {
  margin: 0;
  overflow: visible; /* 允许内容完全显示 */
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item {
  margin: 0;
  line-height: 1.4;
}

.toc-link {
  display: block;
  padding: 6px 12px;
  color: #000;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  border-left: 3px solid transparent;
  padding-left: 12px;
  margin: 2px 0;
  border-radius: 0 4px 4px 0;
  position: relative;
  overflow: hidden;
}

.toc-link::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 0;
  background: transparent;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.toc-link:hover {
  color: #0066cc;
  background: transparent;
  transform: translateX(0);
  border-left-color: transparent;
}

.toc-link:hover::before {
  width: 0;
}

.toc-item.active .toc-link {
  color: #0066cc;
  border-left-color: transparent;
  font-weight: 600;
  background: transparent;
  transform: translateX(0);
}

.toc-item.active .toc-link::before {
  width: 0;
}

/* 不同级别的标题缩进 */
.toc-level-1 { 
  padding-left: 0; 
}
.toc-level-1 .toc-link {
  font-weight: 500;
  padding-left: 12px;
  font-size: 14px;
}

.toc-level-2 { 
  padding-left: 12px; 
}
.toc-level-2 .toc-link {
  font-size: 13px;
  padding-left: 12px;
}

.toc-level-3 { 
  padding-left: 24px; 
}
.toc-level-3 .toc-link {
  font-size: 12px;
  padding-left: 12px;
}

.toc-level-4 { 
  padding-left: 36px; 
}
.toc-level-4 .toc-link {
  font-size: 12px;
  padding-left: 12px;
}

/* 右侧文章内容 - 必须在右边，序号2 */
.article-main {
  order: 2;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
  overflow-x: hidden;
  width: 100%;
}

/* 文章内容容器 - 正文在这里居中 */
.article-layout {
  width: 100%;
  max-width: 700px;
  padding: 0;
  overflow-x: hidden;
}

/* 文章头部 */
.article-header {
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--vp-c-border);
  width: 100%;
}

.article-title {
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 0.4rem 0;
  color: var(--vp-c-text-1);
  line-height: 1.1;
}

.article-meta {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0;
}

.article-meta .author {
  margin-left: 0.5rem;
}

.article-meta .view-count {
  margin-left: 0.5rem;
}

/* 文章内容 */
.article-content {
  line-height: 1.4;
  font-size: 15px;
  color: var(--vp-c-text-1);
  max-width: none;
  padding: 0;
  overflow-x: hidden; /* 禁止水平滚动 */
  word-wrap: break-word; /* 长单词自动换行 */
  overflow-wrap: break-word; /* 长单词自动换行 */
}

.article-content :deep(*) {
  line-height: 1.4;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  margin: 1rem 0 0 0;
  font-weight: 600;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  width: 100%;
}

.article-content :deep(h1) {
  font-size: 1.8rem;
  border-bottom: 1px solid var(--vp-c-border);
  padding-bottom: 0.3rem;
}

.article-content :deep(h2) {
  font-size: 1.3rem;
}

.article-content :deep(h3) {
  font-size: 1.1rem;
}

.article-content :deep(h4) {
  font-size: 1rem;
}

.article-content :deep(h5) {
  font-size: 0.95rem;
}

.article-content :deep(h6) {
  font-size: 0.9rem;
}

.article-content :deep(p) {
  margin: 0.6rem 0;
  font-size: 15px;
  color: var(--vp-c-text-1);
  width: 100%;
}

.article-content :deep(a) {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.article-content :deep(a:hover) {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0.6rem 0;
  padding-left: 1.2rem;
  width: 100%;
}

.article-content :deep(ul) {
  list-style-type: disc; /* 无序列表使用实心圆点 */
}

.article-content :deep(ol) {
  list-style-type: decimal; /* 有序列表使用数字 */
}

.article-content :deep(li) {
  margin: 0.05rem 0;
  color: var(--vp-c-text-1);
  display: list-item; /* 确保显示为列表项 */
}

.article-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.8rem 1.2rem;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 8px;
  font-style: italic;
  color: var(--vp-c-text-2);
  width: 100%;
}

.article-content :deep(blockquote p) {
  margin: 0.3rem 0;
}

.article-content :deep(code) {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  color: var(--vp-c-text-1);
  word-break: break-word;
}

.article-content :deep(pre) {
  background: var(--vp-c-bg-soft);
  padding: 0.4rem 0.6rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0 0 0.8rem 0;
  border: 1px solid var(--vp-c-border);
  width: 100%;
  white-space: pre; /* 保持代码原始格式 */
  overflow-wrap: normal; /* 不强制换行 */
  display: block; /* 确保块级显示 */
  box-sizing: border-box; /* 包含边框和内边距 */
}

/* 列表项内的代码块需要更小的上边距 */
.article-content :deep(li pre) {
  margin-top: 0;
  margin-bottom: 0.8rem;
}

.article-content :deep(pre code) {
  background: none;
  padding: 0;
  color: var(--vp-c-text-1);
  white-space: pre; /* 保持代码原始格式 */
  word-break: normal; /* 不强制断词 */
  font-size: 14px;
  line-height: 1.4;
  display: block;
  width: 100%;
  box-sizing: border-box;
}

/* 针对 VitePress 代码块的特殊处理 */
.article-content :deep(.vp-code-group) {
  width: 100%;
}

.article-content :deep(.shiki) {
  width: 100%;
  overflow-x: auto;
  white-space: pre;
}

.article-content :deep(.line-numbers-wrapper) {
  display: none; /* 隐藏行号 */
}

.article-content :deep(.line-numbers) {
  display: none; /* 隐藏行号 */
}

.article-content :deep(.line-number) {
  display: none; /* 隐藏行号 */
}

/* 隐藏代码块语言标识 */
.article-content :deep(.lang) {
  display: none; /* 隐藏语言标识如 bash */
}

.article-content :deep([class*="language-"]:before) {
  display: none; /* 隐藏语言标识伪元素 */
}

.article-content :deep(.vp-code-tab) {
  display: none; /* 隐藏代码标签 */
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  margin: 0.8rem 0;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 14px;
}

.article-content :deep(th),
.article-content :deep(td) {
  border: 1px solid var(--vp-c-border);
  padding: 0.4rem 0.8rem;
  text-align: left;
}

.article-content :deep(th) {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.article-content :deep(hr) {
  margin: 1.5rem 0;
  border: none;
  border-top: 1px solid var(--vp-c-border);
  width: 100%;
}

.article-content :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.article-content :deep(em) {
  font-style: italic;
}

/* 回到顶部按钮 */
.back-to-top-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 50px;
  height: 50px;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  z-index: 999;
  transition: all 0.3s ease;
  outline: none;
}

.back-to-top-btn:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.back-to-top-btn:active {
  transform: translateY(-1px);
}

.back-to-top-btn svg {
  width: 24px;
  height: 24px;
  display: block;
}

/* 移动端适配 */
@media (max-width: 768px) {
  /* 保持按钮显示，样式自适应 */
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* 覆盖 VitePress 默认主题的左侧 padding，避免整页被挤到右边 */
:global(.VPDoc) {
  padding-left: 0 !important;
}

:global(.VPContent) {
  padding-left: 0 !important;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .article-sidebar {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .article-container {
    flex-direction: column;
  }
  
  .article-sidebar {
    display: none;
    width: 100%;
  }
  
  .article-main {
    padding: 1rem;
  }
  
  .article-title {
    font-size: 1.75rem;
  }

  /* 移动端保持回到顶部按钮显示 */
}
</style>