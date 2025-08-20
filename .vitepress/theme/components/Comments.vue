<template>
  <div class="comments-wrapper" ref="container">
    <noscript>请启用 JavaScript 以加载评论。</noscript>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const container = ref<HTMLElement | null>(null)

onMounted(() => {
  // 使用 utterances 作为无服务端评论方案
  if (!container.value) return
  const script = document.createElement('script')
  script.src = 'https://utteranc.es/client.js'
  script.async = true
  script.setAttribute('repo', 'IsaacHuo/My_Blog')
  script.setAttribute('issue-term', 'pathname')
  script.setAttribute('theme', 'github-light')
  script.setAttribute('crossorigin', 'anonymous')
  container.value.appendChild(script)
})
</script>

<style scoped>
.comments-wrapper {
  margin-top: var(--space-3xl);
  padding-top: var(--space-xl);
  border-top: 1px solid var(--vp-c-border);
}
</style>