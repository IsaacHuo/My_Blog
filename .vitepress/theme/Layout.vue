<template>
  <Layout :class="{ 'is-article-page': isArticlePage, 'is-project-page': isProjectPage }">
    <template
      v-if="frontmatter.layout === 'List50Page'"
      #doc-before
    >
      <List50Page />
    </template>
    <!-- 在文章内容后添加评论 -->
    <template
      v-if="isArticlePage"
      #doc-after
    >
      <div class="article-comments-section">
        <Comments />
      </div>
    </template>
    <!-- 回到顶部按钮 - 添加到所有页面 -->
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
import { computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import List50Page from './components/List50Page.vue'
import BackToTop from './components/BackToTop.vue'
import Comments from './components/Comments.vue'
import ArticleTOC from './components/ArticleTOC.vue'

const { Layout } = DefaultTheme
const { frontmatter, page, lang } = useData()

// 判断是否是文章页面（在 zh/blog 或 en/blog 目录下）
// 判断是否是文章页面（在 zh/blog, en/blog, zh/projects, en/projects 目录下）
const isArticlePage = computed(() => {
  const path = page.value.relativePath || ''
  return (path.indexOf('blog/') !== -1 || path.indexOf('projects/') !== -1) && 
         path.indexOf('index.md') === -1
})

const isProjectPage = computed(() => {
  const path = page.value.relativePath || ''
  return path.indexOf('projects/') !== -1 && path.indexOf('index.md') === -1
})

const isZh = computed(() => {
  return lang.value === 'zh-CN'
})

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

  return parts.join(' • ')
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

let articleMetaEl = null

const cleanupArticleMeta = () => {
  if (articleMetaEl && articleMetaEl.parentNode) {
    articleMetaEl.parentNode.removeChild(articleMetaEl)
    articleMetaEl = null
  }
}

const injectArticleMeta = async () => {
  cleanupArticleMeta()
  
  if (!isArticlePage.value) return

  await nextTick()
  // Give a small delay for content to render if needed
  setTimeout(() => {
    const h1 = document.querySelector('.vp-doc h1')
    if (h1 && h1.parentNode) {
      articleMetaEl = document.createElement('div')
      articleMetaEl.className = 'article-meta-container'
      articleMetaEl.textContent = articleMetaText.value
      h1.parentNode.insertBefore(articleMetaEl, h1.nextSibling)
    }
  }, 100)
}

onMounted(() => {
  injectArticleMeta()
})

watch(() => page.value.relativePath, () => {
  injectArticleMeta()
})

onBeforeUnmount(() => {
  cleanupArticleMeta()
})
</script>

<style>
/* 对于BooksPage页面，隐藏默认的文档内容 */
[data-frontmatter-layout="BooksPage"] .VPDoc .container .content .content-container {
  display: none;
}

/* 确保BooksPage有正确的样式 */
[data-frontmatter-layout="BooksPage"] .VPDoc {
  padding: 0;
}

/* 对于List50Page页面，隐藏默认的文档内容 */
[data-frontmatter-layout="List50Page"] .VPDoc .container .content .content-container {
  display: none;
}

/* 确保List50Page有正确的样式 */
[data-frontmatter-layout="List50Page"] .VPDoc {
  padding: 0;
}

/* 文章评论区样式 */
.article-comments-section {
  margin-top: 2rem;
  padding-top: 2rem;
}

</style>
