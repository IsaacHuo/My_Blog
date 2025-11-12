<template>
  <div class="modern-blog-list">
    <div class="blog-content">
      <h1>{{ isZh ? '文章' : 'Blog' }}</h1>
      <div class="blog-articles">
        <article v-for="post in posts" :key="post.url" class="blog-article">
          <div class="article-date">{{ formatDate(post.frontmatter.date) }}</div>
          <h2 class="article-title">
            <a :href="withBase(post.url)">{{ post.frontmatter.title }}</a>
          </h2>
          <div v-if="post.frontmatter.description" class="article-description">
            {{ post.frontmatter.description }}
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withBase, useData } from 'vitepress'
import { computed } from 'vue'
import { data as blogPosts } from '../data/blogPosts.data.js'

// 移除了Props接口和category相关的逻辑

const { site, page } = useData()
const isZh = computed(() => site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/'))

// 根据语言过滤文章
const posts = computed(() => {
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
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
})

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('en-US', { 
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.blog-content h1 {
  font-size: var(--vp-font-size-2xl);
  font-weight: 700;
  margin-bottom: 30px;
  margin-top: 6.5px;
  color: var(--vp-c-text-1);
  text-align: center;
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