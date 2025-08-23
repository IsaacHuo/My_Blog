<template>
  <div class="article-container">
    <!-- 左侧目录导航 -->
    <aside class="article-sidebar">
      <div class="sidebar-content">
        <div class="toc-header">
          <h3 class="sidebar-title">Table of Contents</h3>
          <button class="toc-toggle" @click="toggleToc">
            <span class="toggle-icon">{{ tocExpanded ? '▼' : '▶' }}</span>
          </button>
        </div>
        <nav class="toc-nav" ref="tocNav" :class="{ expanded: tocExpanded }">
          <ul class="toc-list">
            <li v-for="heading in headings" :key="heading.id" 
                :class="['toc-item', `toc-level-${heading.level}`, { active: activeHeading === heading.id }]">
              <a :href="`#${heading.id}`" @click="scrollToHeading(heading.id)" class="toc-link">
                {{ heading.text }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <!-- 右侧文章内容 -->
    <main class="article-main">
      <article class="article-layout">
        <header class="article-header">
          <h1 class="article-title">{{ frontmatter.title }}</h1>
          <div class="article-meta">
            <time v-if="frontmatter.date" :datetime="frontmatter.date">{{ formatDate(frontmatter.date) }}</time>
            <span v-if="frontmatter.author" class="author">• {{ frontmatter.author }}</span>
          </div>
        </header>

        <div class="article-content">
          <Content />
        </div>
      </article>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { ref, onMounted, onUnmounted } from 'vue'

const { frontmatter } = useData()
const headings = ref<Array<{ id: string; text: string; level: number }>>([])
const activeHeading = ref('')
const tocExpanded = ref(true)

function toggleToc() {
  tocExpanded.value = !tocExpanded.value
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
  setTimeout(() => {
    const headingElements = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4')
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
  }, 200)
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
  const scrollTop = window.scrollY + 120
  
  let activeId = ''
  
  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]
    if (element && element.offsetTop <= scrollTop) {
      activeId = element.id
      break
    }
  }
  
  if (!activeId && headingElements.length > 0 && headingElements[0]) {
    activeId = headingElements[0].id
  }
  
  activeHeading.value = activeId
}

onMounted(() => {
  extractHeadings()
  window.addEventListener('scroll', updateActiveHeading)
  setTimeout(updateActiveHeading, 300)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<style scoped>
/* 主容器布局 */
.article-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem;
  min-height: 100vh;
  position: relative;
  margin-left: auto;
  margin-right: 0; /* 让整个容器向右靠 */
}

/* 左侧边栏 */
.article-sidebar {
  position: absolute;
  top: 0;
  left: 0;
  width: 240px;
  height: calc(100vh - 160px);
  overflow-y: auto;
  border-right: 1px solid var(--vp-c-border);
  padding: 0 1.5rem 0 0;
  background: var(--vp-c-bg);
  z-index: 10;
}

.toc-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: var(--vp-c-text-1);
}

.toc-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  color: var(--vp-c-text-2);
  font-size: 12px;
}

.toc-toggle:hover {
  color: var(--vp-c-text-1);
}

/* 目录导航 */
.toc-nav {
  margin: 0;
  max-height: 70vh;
  overflow-y: auto;
  transition: all 0.3s ease;
}

.toc-nav:not(.expanded) {
  max-height: 0;
  overflow: hidden;
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
  padding: 4px 0;
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
  border-left: 2px solid transparent;
  padding-left: 8px;
}

.toc-link:hover {
  color: var(--vp-c-brand-1);
}

.toc-item.active .toc-link {
  color: var(--vp-c-brand-1);
  border-left-color: var(--vp-c-brand-1);
  font-weight: 500;
}

/* 不同级别的标题缩进 */
.toc-level-1 { 
  padding-left: 0; 
}
.toc-level-1 .toc-link {
  font-weight: 500;
  padding-left: 8px;
}

.toc-level-2 { 
  padding-left: 16px; 
}
.toc-level-2 .toc-link {
  font-size: 13px;
  padding-left: 8px;
}

.toc-level-3 { 
  padding-left: 32px; 
}
.toc-level-3 .toc-link {
  font-size: 12px;
  padding-left: 8px;
}

.toc-level-4 { 
  padding-left: 48px; 
}
.toc-level-4 .toc-link {
  font-size: 12px;
  padding-left: 8px;
}

/* 右侧文章内容 */
.article-main {
  min-width: 0;
  flex: 1;
  margin-left: 270px; /* 为侧边栏留出空间 */
  width: calc(100% - 270px);
}

.article-layout {
  max-width: none;
  margin: 0;
  padding: 0;
}

/* 文章头部 */
.article-header {
  margin-bottom: 1.5rem;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid var(--vp-c-border);
  max-width: 600px; /* 限制文章头部最大宽度 */
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

/* 文章内容 */
.article-content {
  line-height: 1.4;
  font-size: 15px;
  color: var(--vp-c-text-1);
  max-width: none;
  padding: 0;
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
  margin: 1.2rem 0 0.6rem 0;
  font-weight: 600;
  line-height: 1.2;
  color: var(--vp-c-text-1);
  max-width: 600px; /* 限制标题最大宽度 */
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
  max-width: 600px; /* 限制段落最大宽度 */
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
  max-width: 600px; /* 限制列表最大宽度 */
}

.article-content :deep(li) {
  margin: 0.2rem 0;
  color: var(--vp-c-text-1);
}

.article-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.8rem 1.2rem;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  font-style: italic;
  color: var(--vp-c-text-2);
  max-width: 600px; /* 限制引用块最大宽度 */
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
  padding: 0.8rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1rem 0;
  border: 1px solid var(--vp-c-border);
  max-width: 600px; /* 固定最大宽度 */
  white-space: pre; /* 保持代码原始格式 */
  overflow-wrap: normal; /* 不强制换行 */
  display: block; /* 确保块级显示 */
  box-sizing: border-box; /* 包含边框和内边距 */
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
  max-width: 600px;
}

.article-content :deep(.shiki) {
  max-width: 600px;
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
  max-width: 600px; /* 限制图片最大宽度 */
  height: auto;
  margin: 0.8rem 0;
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.article-content :deep(table) {
  width: 100%;
  max-width: 600px; /* 限制表格最大宽度 */
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
  max-width: 400px; /* 限制分隔线最大宽度 */
}

.article-content :deep(strong) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.article-content :deep(em) {
  font-style: italic;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .article-container {
    padding: 1rem;
    margin: 0 auto; /* 小屏幕时恢复居中 */
  }
  
  .article-sidebar {
    width: 200px;
  }
  
  .article-main {
    margin-left: 230px;
    width: calc(100% - 230px);
  }
  
  .article-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .article-container {
    padding: 1rem;
    margin: 0 auto; /* 移动端居中 */
  }
  
  .article-sidebar {
    position: static;
    width: 100%;
    height: auto;
    max-height: none;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-border);
    padding: 0 0 1rem 0;
    margin-bottom: 1rem;
    background: transparent;
  }
  
  .article-main {
    margin-left: 0;
    width: 100%;
  }
  
  .toc-nav {
    max-height: 200px;
  }
  
  .article-title {
    font-size: 1.75rem;
  }
}
</style>