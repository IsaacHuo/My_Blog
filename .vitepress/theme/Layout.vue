<template>
  <Layout>
    <template #doc-before v-if="frontmatter.layout === 'ArticleLayout'">
      <ArticleLayout />
    </template>
    <template #doc-before v-if="frontmatter.layout === 'List100Page'">
      <List100Page />
    </template>
  </Layout>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import ArticleLayout from './components/ArticleLayout.vue'
import List100Page from './components/List100Page.vue'

const { Layout } = DefaultTheme
const { frontmatter } = useData()
</script>

<style>
/* 对于ArticleLayout页面，隐藏默认的文档内容 */
[data-frontmatter-layout="ArticleLayout"] .VPDoc .container .content .content-container {
  display: none;
}

/* 确保ArticleLayout有正确的样式 */
[data-frontmatter-layout="ArticleLayout"] .VPDoc {
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
</style>