<template>
  <div class="blog-list-page">
    <!-- 居中 Tab 切换 -->
    <nav class="blog-tabs">
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'tech' }"
        @click="activeTab = 'tech'"
      >
        技术
      </button>
      <span class="tab-divider">|</span>
      <button
        class="tab-btn"
        :class="{ active: activeTab === 'life' }"
        @click="activeTab = 'life'"
      >
        随笔
      </button>
    </nav>

    <!-- 技术文章 -->
    <ul
      v-show="activeTab === 'tech'"
      class="post-list"
    >
      <li
        v-for="post in techPosts"
        :key="post.url"
        class="post-list-item"
      >
        <span class="post-meta">
          {{ formatDate(post.frontmatter.date) }}
          <ViewCounter
            :id="postRelativePath(post.url)"
            :is-zh="isZh"
            readonly
            class="inline-vc"
          />
        </span>
        <a
          class="post-link"
          :href="withBase(post.url)"
        >
          {{ post.frontmatter.title }}
        </a>
      </li>
    </ul>

    <!-- 随笔文章 -->
    <ul
      v-show="activeTab === 'life'"
      class="post-list"
    >
      <li
        v-for="post in lifePosts"
        :key="post.url"
        class="post-list-item"
      >
        <span class="post-meta">
          {{ formatDate(post.frontmatter.date) }}
          <ViewCounter
            :id="postRelativePath(post.url)"
            :is-zh="isZh"
            readonly
            class="inline-vc"
          />
        </span>
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
import { computed, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { data as blogPosts } from '../data/blogPosts.data.js'

const { page, site } = useData()

const activeTab = ref<'tech' | 'life'>('tech')

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

function postRelativePath(url: string): string {
  // /zh/blog/slug 或 /en/blog/slug → zh/blog/slug.md
  return url.replace(/^\//, '') + '.md'
}

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
  text-align: center;
}

.blog-tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 40px;
}

.tab-btn {
  background: none;
  border: none;
  font-size: 18px;
  font-family: inherit;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 6px 16px;
  transition: color 0.2s;
}

.tab-btn:hover {
  color: var(--vp-c-text-1);
}

.tab-btn.active {
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.tab-divider {
  color: var(--vp-c-border);
  font-size: 18px;
  user-select: none;
}

.post-list {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
}

.post-list-item {
  margin-bottom: 30px;
}

.post-meta {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 2px;
  color: var(--vp-c-text-3);
  font-size: 14px;
  line-height: 1.5;
}

.post-meta :deep(.view-count) {
  font-size: 14px;
  margin-top: 0;
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
