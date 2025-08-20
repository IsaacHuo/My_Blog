---
layout: home
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 重定向到根首页
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
})
</script>

# Redirecting...

You are being redirected to the homepage. If you are not redirected automatically, [click here](/).