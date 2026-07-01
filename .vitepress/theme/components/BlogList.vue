<template>
  <div class="blog-list-page">
    <!-- 技术文章 -->
    <section class="post-section">
      <h2 class="section-title">
        技术
      </h2>
      <ul class="post-list">
        <li
          v-for="post in techPosts"
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
    </section>

    <!-- 生活文章 -->
    <section class="post-section">
      <h2 class="section-title">
        生活
      </h2>
      <ul class="post-list">
        <li
          v-for="post in lifePosts"
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
    </section>
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

const filteredPosts = computed(() => {
  if (!Array.isArray(blogPosts)) return []

  return blogPosts.filter((post: { url: string; frontmatter: Record<string, any> }) => {
    if (!post.frontmatter.title) return false
    return isZh.value
      ? post.url.startsWith('/zh/blog/')
      : post.url.startsWith('/en/blog/')
  })
})

const techPosts = computed(() => {
  return filteredPosts.value.filter(
    (p: { frontmatter: Record<string, any> }) => p.frontmatter.category === '技术'
  )
})

const lifePosts = computed(() => {
  return filteredPosts.value.filter(
    (p: { frontmatter: Record<string, any> }) => p.frontmatter.category === '生活'
  )
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

.post-section {
  margin-bottom: 50px;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-2);
  margin: 0 0 24px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vp-c-border);
  text-align: left;
  letter-spacing: 0.05em;
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

  .post-section {
    margin-bottom: 36px;
  }
}
</style>
