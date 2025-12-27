<template>
  <div class="custom-language-switch">
    <button 
      class="lang-toggle-btn" 
      :title="currentLang === 'zh' ? 'Switch to English' : '切换到中文'"
      @click="toggleLanguage"
    >
      <span class="lang-icon">🌐</span>
      <span class="lang-text">{{ currentLang === 'zh' ? 'EN' : '中' }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const currentLang = computed(() => {
  return route.path.startsWith('/zh/') ? 'zh' : 'en'
})

const toggleLanguage = () => {
  const currentPath = route.path
  let newPath
  
  if (currentLang.value === 'zh') {
    // 从中文切换到英文
    newPath = currentPath.replace('/zh/', '/en/')
  } else {
    // 从英文切换到中文
    if (currentPath.startsWith('/en/')) {
      newPath = currentPath.replace('/en/', '/zh/')
    } else {
      // 如果是根路径，添加 /zh 前缀
      newPath = '/zh' + currentPath
    }
  }
  
  router.push(newPath)
}
</script>

<style scoped>
.custom-language-switch {
  display: flex;
  align-items: center;
  margin-left: 12px;
}

.lang-toggle-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background: transparent;
  color: var(--vp-c-text-1);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 50px;
  justify-content: center;
  height: 28px;
}

.lang-toggle-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.lang-icon {
  font-size: 14px;
}

.lang-text {
  font-weight: 600;
  letter-spacing: 0.3px;
}

/* 深色模式适配 */
.dark .lang-toggle-btn {
  border-color: var(--vp-c-divider);
  background: transparent;
}

.dark .lang-toggle-btn:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

/* 导航栏集成样式 */
@media (max-width: 768px) {
  .custom-language-switch {
    margin-left: 8px;
  }
  
  .lang-toggle-btn {
    padding: 3px 6px;
    min-width: 45px;
    height: 26px;
    font-size: 12px;
  }
}
</style>