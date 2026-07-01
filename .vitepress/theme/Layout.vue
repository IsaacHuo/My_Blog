<template>
  <Layout :class="{ 'is-article-page': isArticlePage, 'is-project-page': isProjectPage }">
    <template
      v-if="frontmatter.layout === 'List50Page'"
      #doc-before
    >
      <List50Page />
    </template>
    <!-- 文章页脚：元信息 + 阅读量 + 评论 -->
    <template
      v-if="isArticlePage"
      #doc-after
    >
      <div class="article-meta-container">
        <span>{{ articleMetaText }}</span>
        <ViewCounter
          :key="pageRelativePath"
          :id="pageRelativePath"
          :is-zh="isZh"
        />
      </div>
      <div class="article-comments-section">
        <Comments />
      </div>
    </template>
    <!-- 回到顶部按钮 -->
    <template #layout-bottom>
      <BackToTop />
      <ArticleTOC v-if="isArticlePage" />
    </template>
    <template #nav-bar-content-after>
      <a
        :class="['custom-language-link', languageLink.className]"
        :href="languageLink.href"
        @click="handleLanguageClick"
      >
        {{ languageLink.text }}
      </a>
    </template>
    <template #nav-screen-content-after>
      <a
        :class="['custom-language-link', 'nav-screen-language-link', languageLink.className]"
        :href="languageLink.href"
        @click="handleLanguageClick"
      >
        {{ languageLink.text }}
      </a>
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import List50Page from './components/List50Page.vue'
import BackToTop from './components/BackToTop.vue'
import Comments from './components/Comments.vue'
import ArticleTOC from './components/ArticleTOC.vue'

const { Layout } = DefaultTheme
const { frontmatter, page, lang } = useData()

const isArticlePage = computed(() => {
  const path = page.value.relativePath || ''
  return (path.indexOf('blog/') !== -1 || path.indexOf('projects/') !== -1) &&
         path.indexOf('index.md') === -1
})

const isProjectPage = computed(() => {
  const path = page.value.relativePath || ''
  return path.indexOf('projects/') !== -1 && path.indexOf('index.md') === -1
})

const isZh = computed(() => lang.value === 'zh-CN')

const pageRelativePath = computed(() => page.value.relativePath || '')

const switchLocalePath = (relativePath, targetLocale) => {
  const path = relativePath || ''
  const withoutLocale = path.replace(/^(zh|en)\//, '').replace(/\.md$/, '')
  const targetPath = withoutLocale === 'index' ? targetLocale : `${targetLocale}/${withoutLocale}`
  return `/${targetPath.replace(/\/index$/, '')}${targetPath.endsWith('/index') || withoutLocale === 'index' ? '/' : ''}`
}

const languageLink = computed(() => {
  return isZh.value
    ? { text: 'EN', href: switchLocalePath(page.value.relativePath, 'en'), className: 'language-link-en' }
    : { text: '中文', href: switchLocalePath(page.value.relativePath, 'zh'), className: 'language-link-zh' }
})

const handleLanguageClick = (event) => {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
  event.preventDefault()
  window.location.assign(languageLink.value.href)
}

const articleMetaText = computed(() => {
  if (!isArticlePage.value) return ''
  const parts = []
  if (frontmatter.value.date) {
    parts.push(formatArticleDate(frontmatter.value.date))
  }
  if (frontmatter.value.author) {
    parts.push(frontmatter.value.author)
  }
  return parts.join(' · ')
})

const formatArticleDate = (value) => {
  try {
    const date = new Date(value)
    if (Number.isNaN(date.getTime())) return value
    return new Intl.DateTimeFormat(isZh.value ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  } catch {
    return value
  }
}
</script>

<style>
[data-frontmatter-layout="BooksPage"] .VPDoc .container .content .content-container {
  display: none;
}

[data-frontmatter-layout="BooksPage"] .VPDoc {
  padding: 0;
}

[data-frontmatter-layout="List50Page"] .VPDoc .container .content .content-container {
  display: none;
}

[data-frontmatter-layout="List50Page"] .VPDoc {
  padding: 0;
}

.article-meta-container {
  display: flex;
  align-items: baseline;
  gap: 6px;
  flex-wrap: wrap;
  color: var(--vp-c-text-3);
  font-size: 0.95rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.article-meta-container :deep(.view-count) {
  font-size: 0.95rem;
  margin-top: 0;
}

.article-comments-section {
  margin-top: 2rem;
  padding-top: 2rem;
}
</style>
