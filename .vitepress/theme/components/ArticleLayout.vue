<template>
  <div class="article-container">
    <!-- 左侧目录导航 -->
    <aside class="article-sidebar">
      <div class="sidebar-content">
        <h3 class="sidebar-title">Table of Contents</h3>
        <nav class="toc-nav" ref="tocNav">
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

        <footer class="article-footer">
          <!-- 移除了标签显示 -->
        </footer>
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

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(d))
  } catch {
    return d
  }
}

function extractHeadings() {
  // 等待DOM渲染完成
  setTimeout(() => {
    const headingElements = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4')
    headings.value = Array.from(headingElements).map((el, index) => {
      let id = el.id
      if (!id) {
        // 生成ID基于标题文本
        const text = el.textContent || ''
        id = text.toLowerCase()
          .replace(/[^\w\s-]/g, '') // 移除特殊字符
          .replace(/\s+/g, '-') // 空格替换为连字符
          .replace(/--+/g, '-') // 多个连字符替换为单个
          .trim() || `heading-${index}`
        el.id = id
      }
      return {
        id,
        text: el.textContent || '',
        level: parseInt(el.tagName.charAt(1))
      }
    })
    
    // 提取完标题后更新当前激活的标题
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
  const scrollTop = window.scrollY + 120 // 调整偏移量
  
  let activeId = ''
  
  // 找到当前可视区域内的标题
  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]
    if (element && element.offsetTop <= scrollTop) {
      activeId = element.id
      break
    }
  }
  
  // 如果没有找到，使用第一个标题
  if (!activeId && headingElements.length > 0 && headingElements[0]) {
    activeId = headingElements[0].id
  }
  
  activeHeading.value = activeId
}

onMounted(() => {
  extractHeadings()
  window.addEventListener('scroll', updateActiveHeading)
  // 初始化时也更新一次
  setTimeout(updateActiveHeading, 300)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveHeading)
})
</script>

<style scoped>
/* 主容器布局 */
.article-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 60px;
  padding: 2rem;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 左侧边栏 */
.article-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  width: 280px;
  flex-shrink: 0;
}

.sidebar-content {
  padding: 0;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 1rem;
  color: var(--vp-c-text-1);
  border-bottom: 1px solid var(--vp-c-border);
  padding-bottom: 0.5rem;
}

/* 目录导航 - 更紧凑的样式 */
.toc-nav {
  margin: 0;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item {
  margin: 2px 0;
}

.toc-level-1 { 
  padding-left: 0; 
  font-weight: 500;
}
.toc-level-2 { 
  padding-left: 12px; 
  font-size: 13px;
}
.toc-level-3 { 
  padding-left: 24px; 
  font-size: 12px;
}
.toc-level-4 { 
  padding-left: 36px; 
  font-size: 11px;
}

.toc-link {
  display: block;
  padding: 3px 0;
  color: #4285f4;
  text-decoration: none;
  transition: color 0.2s ease;
  line-height: 1.3;
  font-size: 13px;
}

.toc-link:hover {
  color: #1a73e8;
}

.toc-item.active .toc-link {
  color: #1a73e8;
  font-weight: 600;
  background: rgba(26, 115, 232, 0.1);
  padding-left: 8px;
  margin-left: -8px;
  border-radius: 3px;
}

/* 右侧文章主体 */
.article-main {
  max-width: 800px;
  margin: 0;
}

.article-layout {
  padding: 0;
  margin: 0;
}

.article-header { 
  margin-bottom: 2rem; 
  border-bottom: 1px solid var(--vp-c-border);
  padding-bottom: 1rem;
}

.article-title { 
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 28px;
  line-height: 1.2; 
  letter-spacing: -0.02em; 
  margin: 0 0 1rem; 
  font-weight: 400;
  color: var(--vp-c-text-1);
}

.article-meta { 
  color: var(--vp-c-text-2); 
  font-size: 14px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.author {
  margin-left: 0.5rem;
}

.article-content { 
  line-height: 1.6; 
  color: var(--vp-c-text-1);
  font-size: 16px;
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  line-height: 1.3;
}

.article-content h1 {
  font-size: 2rem;
  border-bottom: 1px solid var(--vp-c-border);
  padding-bottom: 0.5rem;
}

.article-content h2 {
  font-size: 1.5rem;
}

.article-content h3 {
  font-size: 1.25rem;
}

.article-content p {
  margin: 1rem 0;
}

.article-content img { 
  display: block; 
  margin: 2rem auto; 
  border-radius: 8px; 
  max-width: 100%; 
  height: auto; 
}

.article-content blockquote { 
  border-left: 4px solid var(--vp-c-border); 
  padding: 0 1.5rem; 
  color: var(--vp-c-text-2); 
  margin: 1.5rem 0; 
  font-style: italic;
}

.article-content pre {
  margin: 1.5rem 0;
  border-radius: 8px;
  overflow-x: auto;
}

.article-content code {
  font-size: 0.9em;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  background: var(--vp-c-bg-mute);
}

.article-footer { 
  margin-top: 3rem; 
  padding-top: 1.5rem; 
  border-top: 1px solid var(--vp-c-border); 
}

/* Dark mode adjustments */
.dark .toc-link {
  color: #8ab4f8;
}

.dark .toc-link:hover,
.dark .toc-item.active .toc-link {
  color: #aecbfa;
  background: rgba(138, 180, 248, 0.1);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .article-container {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 1.5rem;
  }
  
  .article-sidebar {
    position: static;
    max-height: none;
    order: -1;
    background: var(--vp-c-bg-soft);
    padding: 1rem;
    border-radius: 8px;
    border: 1px solid var(--vp-c-border);
    width: 100%;
  }
  
  .sidebar-title {
    margin-bottom: 0.75rem;
    font-size: 13px;
  }
  
  .toc-nav {
    max-height: 200px;
    overflow-y: auto;
  }
  
  .toc-link {
    font-size: 12px;
    padding: 2px 0;
  }
  
  .toc-level-2 { 
    padding-left: 10px; 
    font-size: 11px;
  }
  .toc-level-3 { 
    padding-left: 20px; 
    font-size: 11px;
  }
  .toc-level-4 { 
    padding-left: 30px; 
    font-size: 10px;
  }
  
  .article-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 640px) {
  .article-container {
    padding: 1rem;
    gap: 1.5rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
  
  .article-content {
    font-size: 15px;
  }
  
  .toc-nav {
    max-height: 150px;
  }
}
</style>