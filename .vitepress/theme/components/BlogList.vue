<template>
  <div class="modern-blog-list">
    <div class="blog-content">
      <div class="blog-header">
        <h1>{{ isZh ? '文章' : 'Blog' }}</h1>
        
        <!-- Search Bar -->
        <div class="search-container">
          <div class="search-box">
            <span class="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              v-model="searchQuery" 
              type="text" 
              :placeholder="isZh ? '搜索标题或内容...' : 'Search title or content...'"
              class="search-input"
            />
            <button v-if="searchQuery" class="clear-btn" @click="searchQuery = ''">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <div class="sort-controls">
          <button 
            class="sort-btn" 
            :class="{ active: sortBy === 'date' }"
            @click="sortBy = 'date'"
          >
            {{ isZh ? '最新发布' : 'Date' }}
          </button>
          <span class="divider">/</span>
          <button 
            class="sort-btn" 
            :class="{ active: sortBy === 'views' }"
            @click="sortBy = 'views'"
          >
            {{ isZh ? '最多阅读' : 'Views' }}
          </button>
        </div>
      </div>
      
      <div class="blog-articles">
        <article
          v-for="post in displayPosts"
          :key="post.url"
          class="blog-article"
        >
          <div class="article-date">
            {{ formatDate(post.frontmatter.date) }}
            <span v-if="sortBy === 'views' && viewCounts[post.url]" class="view-count-badge">
              · {{ viewCounts[post.url] }} {{ isZh ? '阅读' : 'views' }}
            </span>
          </div>
          <h2 class="article-title">
            <!-- Use v-html for highlighted title -->
            <a :href="withBase(post.url)" v-html="post.displayTitle || post.frontmatter.title"></a>
          </h2>
          
          <!-- Show description if no search is active or no snippet found -->
          <div
            v-if="!searchQuery || !post.matchSnippet"
            class="article-description"
          >
            {{ post.frontmatter.description }}
          </div>
          
          <!-- Show match snippet if search is active -->
          <div 
            v-else
            class="article-snippet"
            v-html="post.matchSnippet"
          ></div>
        </article>
        
        <div v-if="displayPosts.length === 0" class="no-results">
          {{ isZh ? '没有找到相关文章' : 'No posts found' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase, useData } from 'vitepress'
import { computed, ref, onMounted } from 'vue'
import { data as blogPosts } from '../data/blogPosts.data.js'

const { site, page } = useData()
const isZh = computed(() => site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/'))

const sortBy = ref<'date' | 'views'>('date')
const viewCounts = ref<Record<string, number>>({})
const searchQuery = ref('') // Search query state

const WORKER_URL = 'https://count.huoweifang.cn/'

// Fetch view counts for all posts
onMounted(async () => {
  const postsToFetch = blogPosts.filter(p => !p.url.includes('/index'))
  
  postsToFetch.forEach(async (post) => {
    try {
      const id = post.url.replace(/^\//, '').replace(/\.html$/, '')
      const url = new URL(WORKER_URL)
      url.searchParams.set('id', id)
      url.searchParams.set('readonly', 'true')
      
      const res = await fetch(url.toString())
      if (res.ok) {
        const data = await res.json()
        viewCounts.value[post.url] = data.count || 0
      }
    } catch (e) {
      console.warn('Failed to fetch view count for', post.url)
    }
  })
})

const filteredPosts = computed(() => {
  if (!blogPosts || !Array.isArray(blogPosts)) return []
  
  return blogPosts
    .filter((post: { url: string; frontmatter: Record<string, any> }) => {
      if (isZh.value) {
        return post.url.startsWith('/zh/blog/')
      } else {
        return post.url.startsWith('/en/blog/')
      }
    })
    .filter(post => post.frontmatter.title)
})

// Helper to highlight text
function highlightText(text: string, query: string) {
  if (!query) return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  // Use <mark> for highlighting
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>')
}

// Helper to get snippet
function getSnippet(content: string, query: string) {
  const lowerContent = content.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerContent.indexOf(lowerQuery)
  
  if (index === -1) return ''
  
  // Grab a window of text
  const start = Math.max(0, index - 40)
  const end = Math.min(content.length, index + query.length + 60)
  
  let snippet = content.substring(start, end)
  
  // Highlight within the snippet
  snippet = highlightText(snippet, query)
  
  return '...' + snippet + '...'
}

const displayPosts = computed(() => {
  const posts = [...filteredPosts.value]
  const query = searchQuery.value.trim()
  
  // Default mode (no search)
  if (!query) {
    // Sort logic
    if (sortBy.value === 'date') {
      return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
    } else {
      return posts.sort((a, b) => {
        const viewA = viewCounts.value[a.url] || 0
        const viewB = viewCounts.value[b.url] || 0
        if (viewB === viewA) {
          return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
        }
        return viewB - viewA
      })
    }
  }

  // Search mode
  const lowerQuery = query.toLowerCase()
  const results = []

  for (const post of posts) {
    const title = post.frontmatter.title || ''
    const content = post.src || '' // Using raw markdown source
    const lowerTitle = title.toLowerCase()
    
    let score = 0
    let displayTitle = title
    let matchSnippet = ''

    // 1. Title match (High priority)
    if (lowerTitle.includes(lowerQuery)) {
      score += 100
      displayTitle = highlightText(title, query)
    }

    // 2. Content match
    // Only verify content match if we need a snippet or if title didn't match
    const lowerContent = content.toLowerCase()
    if (lowerContent.includes(lowerQuery)) {
      score += 10
      matchSnippet = getSnippet(content, query)
    }

    if (score > 0) {
      results.push({
        ...post,
        score,
        displayTitle,
        matchSnippet
      })
    }
  }

  // Sort by score (desc), then date (desc)
  return results.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score
    }
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
})

function formatDate(d?: string) {
  if (!d) return ''
  try {
    const locale = isZh.value ? 'zh-CN' : 'en-US'
    return new Intl.DateTimeFormat(locale, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(new Date(d))
  } catch {
    return d
  }
}
</script>

<style scoped>
/* Search Styles */
.search-container {
  margin: 0.5rem 0 1.5rem 0;
  width: 100%;
  max-width: 400px;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  padding: 0.6rem 2.5rem 0.6rem 2.2rem;
  border-radius: 24px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  transition: all 0.2s ease;
  outline: none;
}

.search-input:focus {
  border-color: #4285f4;
  box-shadow: 0 0 0 2px rgba(66, 133, 244, 0.1);
  background: var(--vp-c-bg);
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  display: flex;
}

.clear-btn {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  border-radius: 50%;
}

.clear-btn:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
}

.no-results {
  color: var(--vp-c-text-2);
  margin-top: 2rem;
  font-style: italic;
}

.article-snippet {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-family: monospace, var(--vp-font-family-base); /* Monospace helps showing code snippets if present */
  background: var(--vp-c-bg-alt);
  padding: 0.5rem;
  border-radius: 6px;
  margin-top: 0.5rem;
}

/* Highlight style */
:deep(mark) {
  background-color: rgba(255, 215, 0, 0.4);
  color: inherit;
  border-radius: 2px;
  padding: 0 2px;
}

.dark :deep(mark) {
  background-color: rgba(255, 215, 0, 0.25);
  color: #fff;
}

/* Original Styles */
.modern-blog-list {
  display: block;
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: var(--space-lg) var(--space-lg);
  text-align: center;
  background: var(--vp-c-bg);
  font-family: var(--vp-font-family-base);
}

.blog-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 6.5px;
}

.blog-content h1 {
  font-size: var(--vp-font-size-2xl);
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  text-align: center;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 16px;
  color: var(--vp-c-text-2);
}

.sort-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.2rem 0.5rem;
  color: var(--vp-c-text-2);
  font-weight: 400;
  transition: all 0.2s ease;
  font-family: inherit;
  opacity: 0.7;
}

.sort-btn:hover {
  opacity: 1;
  color: var(--vp-c-text-1);
}

.sort-btn.active {
  color: var(--vp-brand-1);
  font-weight: 600;
  opacity: 1;
}

.divider {
  opacity: 0.3;
}

.blog-articles {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.blog-article {
  display: block;
  padding: 0;
  border: none;
  background: transparent;
}

.article-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.5rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
}

.view-count-badge {
  color: var(--vp-c-text-3);
  font-size: 0.9em;
  opacity: 0.8;
  text-transform: none;
}

.article-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.5rem;
  font-weight: 400;
  line-height: 1.3;
  text-align: center;
}

.article-title a {
  color: #4285f4;
  text-decoration: none;
  transition: color 0.2s ease;
  display: block;
  text-align: center;
}

.article-title a:hover {
  color: #1a73e8;
  text-decoration: none;
}

.article-description {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
  text-align: center;
}

/* Dark mode adjustments */
.dark .article-title a {
  color: #8ab4f8;
}

.dark .article-title a:hover {
  color: #aecbfa;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .modern-blog-list {
    padding: 1.5rem 1rem;
  }
  
  .blog-articles {
    gap: 2rem;
  }
  
  .article-title {
    font-size: 1.25rem;
  }
  
  .article-date {
    font-size: 0.8rem;
  }
  
  .article-description {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .modern-blog-list {
    padding: 1rem 0.75rem;
  }
  
  .article-title {
    font-size: 1.125rem;
  }
}
</style>