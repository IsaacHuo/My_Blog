<template>
  <div class="article-container">
    <article class="article-layout">
      <header class="article-header">
        <h1 class="article-title">{{ frontmatter.title }}</h1>
        <div class="article-meta">
          <span v-if="frontmatter.author">{{ frontmatter.author }}</span>
          <span>·</span>
          <time v-if="frontmatter.date" :datetime="frontmatter.date">{{ formatDate(frontmatter.date) }}</time>
        </div>
      </header>

      <div class="article-content">
        <Content />
      </div>

      <footer class="article-footer">
        <div class="article-tags" v-if="(frontmatter.tags || []).length">
          <span v-for="t in frontmatter.tags" :key="t" class="tag-chip small"># {{ t }}</span>
        </div>
        <Comments />
      </footer>
    </article>

    <!-- 右侧标签导航栏 -->
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
        
        <div class="sidebar-tags" v-if="(frontmatter.tags || []).length">
          <h4 class="tags-title">Tags</h4>
          <div class="tags-list">
            <span v-for="tag in frontmatter.tags" :key="tag" class="tag-chip">{{ tag }}</span>
          </div>
        </div>
      </div>
    </aside>
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
  const headingElements = document.querySelectorAll('.article-content h1, .article-content h2, .article-content h3, .article-content h4')
  headings.value = Array.from(headingElements).map((el, index) => {
    const id = el.id || `heading-${index}`
    if (!el.id) el.id = id
    return {
      id,
      text: el.textContent || '',
      level: parseInt(el.tagName.charAt(1))
    }
  })
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function updateActiveHeading() {
  const headingElements = headings.value.map(h => document.getElementById(h.id)).filter(Boolean)
  const scrollTop = window.scrollY + 100
  
  for (let i = headingElements.length - 1; i >= 0; i--) {
    const element = headingElements[i]
    if (element && element.offsetTop <= scrollTop) {
      activeHeading.value = element.id
      break
    }
  }
}

onMounted(() => {
  setTimeout(extractHeadings, 100)
  window.addEventListener('scroll', updateActiveHeading)
  updateActiveHeading()
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
  grid-template-columns: 1fr 280px;
  gap: var(--space-2xl);
  padding: var(--space-2xl) var(--space-lg);
}

/* 文章主体 */
.article-layout {
  max-width: none;
  margin: 0;
  padding: 0;
}

.article-header { margin-bottom: var(--space-xl); }
.article-title { font-family: 'Lora', Georgia, serif; font-size: 42px; line-height: 1.25; letter-spacing: -0.01em; margin: 0 0 var(--space-sm); font-weight: 700; }
.article-meta { color: var(--vp-c-text-2); font-size: 14px; }
.article-content { line-height: 1.6; }
.article-content img { display: block; margin: var(--space-xl) auto; border-radius: 8px; max-width: 100%; height: auto; }
.article-content blockquote { border-left: 4px solid var(--vp-c-border); padding: 0 var(--space-lg); color: var(--vp-c-text-2); margin: var(--space-lg) 0; }
.article-content h2 { margin-top: var(--space-2xl); font-weight: 700; }
.article-content h3 { margin-top: var(--space-xl); font-weight: 600; }
.article-footer { margin-top: var(--space-2xl); padding-top: var(--space-lg); border-top: 1px solid var(--vp-c-border); }

/* 右侧边栏 */
.article-sidebar {
  position: sticky;
  top: 80px;
  height: fit-content;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

.sidebar-content {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  padding: var(--space-lg);
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 var(--space-md);
  color: var(--vp-c-text-1);
}

/* 目录导航 */
.toc-nav {
  margin-bottom: var(--space-lg);
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item {
  margin: 4px 0;
}

.toc-level-1 { padding-left: 0; }
.toc-level-2 { padding-left: 16px; }
.toc-level-3 { padding-left: 32px; }
.toc-level-4 { padding-left: 48px; }

.toc-link {
  display: block;
  padding: 4px 8px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  border-radius: 4px;
  transition: all 0.2s ease;
  line-height: 1.4;
}

.toc-link:hover {
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
}

.toc-item.active .toc-link {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  font-weight: 500;
}

/* 标签区域 */
.sidebar-tags {
  border-top: 1px solid var(--vp-c-border);
  padding-top: var(--space-md);
}

.tags-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 var(--space-sm);
  color: var(--vp-c-text-1);
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-chip {
  font-size: 12px;
  padding: 4px 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
}

.tag-chip:hover {
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}

.tag-chip.small {
  font-size: 12px;
  padding: 2px 8px;
  margin-right: 6px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .article-container {
    grid-template-columns: 1fr;
    gap: var(--space-xl);
  }
  
  .article-sidebar {
    position: static;
    max-height: none;
    order: -1;
  }
  
  .sidebar-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-lg);
  }
}

@media (max-width: 640px) {
  .article-container {
    padding: var(--space-xl) var(--space-md);
  }
  
  .article-title {
    font-size: 30px;
  }
  
  .sidebar-content {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }
}
</style>