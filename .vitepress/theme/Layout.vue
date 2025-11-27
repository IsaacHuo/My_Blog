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
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { computed } from 'vue'
import List100Page from './components/List100Page.vue'
import BackToTop from './components/BackToTop.vue'
import Comments from './components/Comments.vue'

const { Layout } = DefaultTheme
const { frontmatter, page } = useData()

// 判断是否是文章页面（在 zh/blog 或 en/blog 目录下）
const isArticlePage = computed(() => {
  return page.value.relativePath.includes('/blog/') && 
         !page.value.relativePath.endsWith('index.md')
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
  border-top: 1px solid var(--vp-c-border);
}
</style>