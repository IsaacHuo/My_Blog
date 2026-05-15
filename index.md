---
layout: home
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.location.replace('/zh/')
  }
})
</script>

# 正在跳转...

默认首页已切换为中文。如果没有自动跳转，请点击[中文首页](/zh/)。
