<template>
  <div class="modern-blog-list">
    <div class="blog-content">
      <div class="blog-header">
        <h1>{{ isZh ? '文章' : 'Blog' }}</h1>
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
          v-for="post in sortedPosts"
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
            <a :href="withBase(post.url)">{{ post.frontmatter.title }}</a>
          </h2>
          <div
            v-if="post.frontmatter.description"
            class="article-description"
          >
            {{ post.frontmatter.description }}
          </div>
        </article>
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

const WORKER_URL = 'https://blog-counter.2210286979.workers.dev/'

// Fetch view counts for all posts
onMounted(async () => {
  const postsToFetch = blogPosts.filter(p => !p.url.includes('/index'))
  
  // Create a map of promises to fetch concurrently
  // We limit concurrency slightly just to be safe, though browsers handle it
  // Given it's a blog list, we just fire them.
  postsToFetch.forEach(async (post) => {
    try {
      // usage in Layout.vue: page.value.relativePath.replace(/\.md$/, '')
      // post.url is like /en/blog/foo or /en/blog/foo.html
      // We want en/blog/foo
      
      const id = post.url.replace(/^\//, '').replace(/\.html$/, '')
      
      const url = new URL(WORKER_URL)
      url.searchParams.set('id', id)
      url.searchParams.set('readonly', 'true') // We are just listing, not incrementing
      
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

const sortedPosts = computed(() => {
  const posts = [...filteredPosts.value]
  
  if (sortBy.value === 'date') {
    return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
  } else {
    // Sort by views
    return posts.sort((a, b) => {
      const viewA = viewCounts.value[a.url] || 0
      const viewB = viewCounts.value[b.url] || 0
      // If views are equal (or both 0/loading), fallback to date
      if (viewB === viewA) {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
      }
      return viewB - viewA
    })
  }
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