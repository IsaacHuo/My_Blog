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
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 3rem;
  padding: 1.5rem;
  min-height: 100vh;
}

/* 左侧边栏 */
.article-sidebar {
  position: sticky;
  top: 80px;
  height: fit-content;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
  border-right: 1px solid var(--vp-c-border);
  padding-right: 1.5rem;
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
}

.article-layout {
  max-width: none;
  margin: 0;
  padding: 0;
}

/* 文章头部 */
.article-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.article-title {
  font-size: 26px;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-text-1);
  line-height: 1.2;
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
  line-height: 1.7;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.article-content h1,
.article-content h2,
.article-content h3,
.article-content h4,
.article-content h5,
.article-content h6 {
  margin: 2rem 0 1rem 0;
  font-weight: 600;
  line-height: 1.3;
  color: var(--vp-c-text-1);
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

.article-content a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
}

.article-content a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.article-content ul,
.article-content ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.article-content li {
  margin: 0.5rem 0;
}

.article-content blockquote {
  margin: 1.5rem 0;
  padding: 1rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  font-style: italic;
}

.article-content code {
  background: var(--vp-c-bg-soft);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.article-content pre {
  background: var(--vp-c-bg-soft);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.article-content pre code {
  background: none;
  padding: 0;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .article-container {
    grid-template-columns: 200px 1fr;
    gap: 2rem;
    padding: 1rem;
  }
  
  .article-sidebar {
    padding-right: 1rem;
  }
  
  .article-title {
    font-size: 2rem;
  }
}

@media (max-width: 768px) {
  .article-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }
  
  .article-sidebar {
    position: static;
    max-height: none;
    border-right: none;
    border-bottom: 1px solid var(--vp-c-border);
    padding-right: 0;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  
  .toc-nav {
    max-height: 200px;
  }
  
  .article-title {
    font-size: 1.75rem;
  }
}
</style>