<template>
  <div class="home-layout">
    <div class="home-main">
      <div class="categories-bar">
        <button :class="['tag-chip', { active: activeTag === 'all' }]" @click="activeTag = 'all'">全部</button>
        <button v-for="tag in tags" :key="tag" :class="['tag-chip', { active: activeTag === tag }]" @click="activeTag = tag">{{ tag }}</button>
      </div>

      <div class="posts-list">
        <article v-for="post in filteredPosts" :key="post.path" class="post-item">
          <div class="post-date">{{ formatDate(post.frontmatter.date) }}</div>
          <h2 class="post-title">
            <a :href="withBase(post.path)">{{ post.frontmatter.title }}</a>
          </h2>
          <p v-if="post.frontmatter.description" class="post-desc">{{ post.frontmatter.description }}</p>
          <div class="post-tags">
            <span v-for="t in (post.frontmatter.tags || [])" :key="t" class="tag-chip small">{{ t }}</span>
          </div>
        </article>
      </div>
    </div>

    <aside class="home-sidebar">
      <section class="about-card">
        <h3>关于我</h3>
        <p>我是 Isaac Huo，专注于编程、AI 与创意应用。欢迎阅读与交流。</p>
      </section>

      <section class="latest-card">
        <h3>最新文章</h3>
        <ul class="latest-list">
          <li v-for="post in latestPosts" :key="post.path">
            <a :href="withBase(post.path)">{{ post.frontmatter.title }}</a>
            <span class="latest-date">{{ formatDate(post.frontmatter.date) }}</span>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase, useData } from 'vitepress'

const { site } = useData()

// Import posts from both English and Chinese blogs
const enModules = (import.meta as any).glob('../../../en/blog/**/*.md', { eager: true }) as Record<string, any>
const zhModules = (import.meta as any).glob('../../../zh/blog/**/*.md', { eager: true }) as Record<string, any>

// Determine current locale
const isChineseLocale = computed(() => {
  return typeof window !== 'undefined' && window.location.pathname.startsWith('/zh/')
})

// Process posts based on current locale
const allPosts = computed(() => {
  const modules = isChineseLocale.value ? zhModules : enModules
  const pathPrefix = isChineseLocale.value ? '/zh/blog/' : '/en/blog/'
  
  return Object.entries(modules)
    .filter(([path]) => !/\/blog\/index\.md$/.test(path))
    .map(([path, mod]) => {
      const route = path.replace(/^.*\/blog\//, pathPrefix).replace(/\.md$/, '')
      return { path: route, frontmatter: (mod as any).frontmatter || {} }
    })
    .filter(p => p.frontmatter && p.frontmatter.title)
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
})

const tags = computed(() => Array.from(new Set(allPosts.value.flatMap(p => p.frontmatter.tags || []))))
const activeTag = ref<'all' | string>('all')

const filteredPosts = computed(() => {
  if (activeTag.value === 'all') return allPosts.value
  return allPosts.value.filter(p => (p.frontmatter.tags || []).includes(activeTag.value))
})

const latestPosts = computed(() => allPosts.value.slice(0, 5))

function formatDate(d?: string) {
  if (!d) return ''
  try {
    return new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(d))
  } catch {
    return d
  }
}
</script>

<style>
.home-layout .post-title,
.home-layout .post-date,
.home-layout .post-desc {
  text-align: center !important;
}

.home-layout .post-title a {
  text-align: center !important;
  display: block;
}
</style>