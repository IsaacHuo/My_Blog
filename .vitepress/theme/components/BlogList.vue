<template>
  <div class="blog-list-page">
    <ul class="post-list">
      <li
        v-for="post in posts"
        :key="post.url"
        class="post-list-item"
      >
        <span class="post-meta">{{ formatDate(post.frontmatter.date) }}</span>
        <a
          class="post-link"
          :href="withBase(post.url)"
        >
          {{ post.frontmatter.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as blogPosts } from '../data/blogPosts.data.js'

const { page, site } = useData()

const isZh = computed(() => {
  return site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/')
})

const posts = computed(() => {
  if (!Array.isArray(blogPosts)) return []

  return blogPosts.filter((post: { url: string; frontmatter: Record<string, any> }) => {
    if (!post.frontmatter.title) return false
    return isZh.value
      ? post.url.startsWith('/zh/blog/')
      : post.url.startsWith('/en/blog/')
  })
})

function formatDate(value?: string) {
  if (!value) return ''

  try {
    return new Intl.DateTimeFormat(isZh.value ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(new Date(value))
  } catch {
    return value
  }
}
</script>

<style scoped>
.blog-list-page {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 30px 15px;
}

.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.post-list-item {
  margin-bottom: 30px;
}

.post-meta {
  display: block;
  margin-bottom: 2px;
  color: var(--vp-c-text-3);
  font-size: 14px;
  line-height: 1.5;
}

.post-link {
  display: block;
  color: #4d74eb !important;
  font-size: 24px;
  line-height: 1.35;
  text-decoration: none;
}

.post-link:hover {
  color: var(--vp-c-text-1) !important;
  text-decoration: underline;
}

@media (max-width: 800px) {
  .blog-list-page {
    padding-right: 7.5px;
    padding-left: 7.5px;
  }
}
</style>
