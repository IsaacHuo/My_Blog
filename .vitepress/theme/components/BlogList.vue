<template>
  <div class="simple-blog-list">
    <article v-for="post in posts" :key="post.url" class="blog-item">
      <div class="blog-date">{{ formatDate(post.frontmatter.date) }}</div>
      <div class="blog-title">
        <a :href="withBase(post.url)">{{ post.frontmatter.title }}</a>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { withBase, useData } from 'vitepress'
import { computed } from 'vue'
import { data as blogPosts } from '../data/blogPosts.data.js'

interface Props {
  category?: string
}

const props = withDefaults(defineProps<Props>(), {
  category: 'all'
})

const { site, page } = useData()
const isZh = computed(() => site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/'))

// 根据语言和分类过滤文章
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
    .filter(post => {
      if (props.category === 'all') return true
      
      // 根据文章的category字段或tags字段进行分类
      const postCategory = post.frontmatter.category || ''
      const postTags = post.frontmatter.tags || []
      
      if (props.category === 'technical') {
        return postCategory === 'technical' || 
               postTags.some((tag: string) => {
                 const lowerTag = tag.toLowerCase()
                 return ['技术', '前端', '后端', '开发', 'frontend', 'backend', 'tech', 'development', 'vue', 'typescript', 'javascript', 'web'].includes(lowerTag) ||
                        lowerTag.includes('development') || lowerTag.includes('tech')
               })
      }
      
      if (props.category === 'life') {
        return postCategory === 'life' || 
               postTags.some((tag: string) => {
                 const lowerTag = tag.toLowerCase()
                 return ['生活', '随笔', '思考', '读书', '旅行', 'life', 'thoughts', 'reading', 'travel', 'personal'].includes(lowerTag) ||
                        lowerTag.includes('life') || lowerTag.includes('personal')
               })
      }
      
      return true
    })
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
})

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(d))
  } catch {
    return d
  }
}
</script>

<style scoped>
.simple-blog-list {
  width: 100%;
  margin: 0;
  padding: 2rem 0;
  background: var(--vp-c-bg);
}

.blog-item {
  display: flex;
  align-items: baseline;
  padding: 0.75rem 0;
  border-bottom: none;
  margin-bottom: 0.5rem;
  justify-content: space-between;
}

.blog-item:last-child {
  border-bottom: none;
}

.blog-date {
  flex-shrink: 0;
  width: 120px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-right: 2rem;
  font-weight: 400;
}

.blog-title {
  flex: 1;
}

.blog-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.4;
  transition: color 0.2s ease;
}

/* 强制中文标题使用楷体 - 更高优先级 */
.simple-blog-list .blog-title a:lang(zh),
.simple-blog-list .blog-title a:lang(zh-CN),
html[lang="zh-CN"] .simple-blog-list .blog-title a,
html[lang="zh"] .simple-blog-list .blog-title a,
[data-page-path*="/zh/"] .simple-blog-list .blog-title a,
body:has([href*="/zh/"]) .simple-blog-list .blog-title a {
  font-family: 'KaiTi', '楷体', 'STKaiti', serif !important;
  font-size: 24px !important;
}

.blog-title a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 640px) {
  .blog-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .blog-date {
    width: auto;
    margin-right: 0;
    font-size: 12px;
  }
  
  .blog-title a {
    font-size: 15px;
  }
}
</style>