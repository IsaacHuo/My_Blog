<template>
  <Layout>
    <template #doc-before v-if="frontmatter.layout === 'List100Page'">
      <List100Page />
    </template>
    <!-- 在文章内容后添加评论 -->
    <template #doc-after v-if="isArticlePage">
      <div class="article-comments-section">
        <Comments />
      </div>
    </template>
    <!-- 回到顶部按钮 - 添加到所有页面 -->
    <template #layout-bottom>
      <BackToTop />
    </template>
    
    <!-- Navbar Title Extension -->
    <template #nav-bar-content-before>
       <ViewCounter 
         id="total-views" 
         :showLabel="false" 
         :readonly="true"
         :isZh="isZh" 
         class="nav-view-counter" 
       />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, useRouter } from 'vitepress'
import { computed, onMounted, onBeforeUnmount, watch, nextTick, createApp } from 'vue'
import List100Page from './components/List100Page.vue'
import BackToTop from './components/BackToTop.vue'
import Comments from './components/Comments.vue'
import ViewCounter from './components/ViewCounter.vue'

const { Layout } = DefaultTheme
const { frontmatter, page, site, lang } = useData()
const router = useRouter()

// 判断是否是文章页面（在 zh/blog 或 en/blog 目录下）
const isArticlePage = computed(() => {
  return page.value.relativePath.includes('/blog/') && 
         !page.value.relativePath.endsWith('index.md')
})

// View Counter Injection Logic
let viewCounterApp = null
let viewCounterEl = null

const cleanupViewCounter = () => {
  if (viewCounterApp) {
    viewCounterApp.unmount()
    viewCounterApp = null
  }
  if (viewCounterEl && viewCounterEl.parentNode) {
    viewCounterEl.parentNode.removeChild(viewCounterEl)
    viewCounterEl = null
  }
}

const injectViewCounter = async () => {
  cleanupViewCounter()
  
  if (!isArticlePage.value) return

  await nextTick()
  // Give a small delay for content to render if needed
  setTimeout(() => {
    const h1 = document.querySelector('.vp-doc h1')
    if (h1 && h1.parentNode) {
      // Create container
      viewCounterEl = document.createElement('div')
      viewCounterEl.className = 'article-view-count-container'
      viewCounterEl.style.textAlign = 'center'
      viewCounterEl.style.marginBottom = '0.5rem'
      viewCounterEl.style.marginTop = '0'
      viewCounterEl.style.lineHeight = '1'
      
      // Insert after H1
      h1.parentNode.insertBefore(viewCounterEl, h1.nextSibling)
      
      // Reduce H1 margin to pull counter closer
      h1.style.marginBottom = '0.25rem'

      // Check language
      const isZhValue = lang.value === 'zh-CN'
      console.log('Injecting ViewCounter. Lang:', lang.value, 'isZh:', isZhValue)
      
      // Create and mount app
      // Use clean ID: remove language prefix and .md extension
      const id = page.value.relativePath
        .replace(/^zh\/blog\//, '')
        .replace(/^en\/blog\//, '')
        .replace(/\.md$/, '')
        
      viewCounterApp = createApp(ViewCounter, {
        id: page.value.relativePath.replace(/\.md$/, ''),
        showLabel: false,
        isZh: isZhValue
      })
      viewCounterApp.mount(viewCounterEl)
    }
  }, 100)
}

onMounted(() => {
  injectViewCounter()
})

watch(() => page.value.relativePath, () => {
  injectViewCounter()
})

onBeforeUnmount(() => {
  cleanupViewCounter()
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

/* 对于List100Page页面，隐藏默认的文档内容 */
[data-frontmatter-layout="List100Page"] .VPDoc .container .content .content-container {
  display: none;
}

/* 确保List100Page有正确的样式 */
[data-frontmatter-layout="List100Page"] .VPDoc {
  padding: 0;
}

/* 文章评论区样式 */
.article-comments-section {
  margin-top: 2rem;
  padding-top: 2rem;
}

/* Navbar View Counter */
.nav-view-counter {
  margin-right: 12px !important; /* spacing before menu */
  margin-left: 0 !important;
  margin-top: 0 !important;
  font-size: 0.9em !important;
  vertical-align: middle;
  opacity: 0.8;
  background: var(--vp-c-bg-mute);
  padding: 2px 8px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-border);
}

.nav-view-counter .view-count {
  margin-top: 0 !important;
}
</style>