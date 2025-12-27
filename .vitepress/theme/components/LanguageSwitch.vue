<template>
  <div class="language-switch">
    <button 
      class="lang-button"
      :title="isZh ? 'Switch to English' : '切换到中文'"
      @click="toggleLanguage"
    >
      <span class="lang-icon">🌐</span>
      <span class="lang-text">{{ isZh ? 'EN' : '中文' }}</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { page } = useData()

// 检测当前是否为中文页面
const isZh = computed(() => {
  const relativePath = page.value.relativePath
  const currentPath = window.location.pathname
  // 同时检查相对路径和URL路径
  return relativePath.startsWith('zh/') || currentPath.includes('/zh/')
})

// 语言切换逻辑
const toggleLanguage = () => {
  const currentPath = window.location.pathname
  
  console.log('Current path:', currentPath)
  console.log('isZh.value:', isZh.value)
  
  // 清理和规范化路径
  const cleanPath = (path) => {
    // 确保路径以 / 结尾（如果不是文件）
    if (!path.includes('.') && !path.endsWith('/')) {
      path += '/'
    }
    return path
  }
  
  // 提取路径的基础部分和语言部分
  const extractPathParts = (path) => {
    const cleanedPath = cleanPath(path)
    
    // 匹配 /[lang]/[page]/ 格式
    const match = cleanedPath.match(/^\/(zh|en)\/(.*?)\/?$/)
    if (match) {
      return {
        lang: match[1],
        page: match[2] || ''
      }
    }
    
    // 匹配 /[lang]/ 格式
    const langMatch = cleanedPath.match(/^\/(zh|en)\/?$/)
    if (langMatch) {
      return {
        lang: langMatch[1],
        page: ''
      }
    }
    
    // 其他路径格式
    return {
      lang: null,
      page: cleanedPath
    }
  }
  
  const pathParts = extractPathParts(currentPath)
  console.log('Path parts:', pathParts)
  
  // 确定目标语言
  let targetLang
  if (pathParts.lang === 'zh') {
    targetLang = 'en'
  } else if (pathParts.lang === 'en') {
    targetLang = 'zh'
  } else {
    // 没有语言代码时，根据当前检测到的语言决定
    targetLang = isZh.value ? 'en' : 'zh'
  }
  
  // 构建新路径
  let newPath
  if (pathParts.base === '/My_Blog/') {
    if (pathParts.page) {
      newPath = `/${targetLang}/${pathParts.page}/`
    } else {
      newPath = `/${targetLang}/`
    }
  } else {
    newPath = `/${targetLang}${pathParts.page}`
  }
  
  console.log('New path:', newPath)
  window.location.href = newPath
}
</script>

<style scoped>
.language-switch {
  display: flex;
  align-items: center;
  margin-left: 12px;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s;
  text-decoration: none;
}

.lang-button:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.lang-icon {
  font-size: 16px;
}

.lang-text {
  font-family: var(--vp-font-family-base);
}

/* 暗色模式适配 */
.dark .lang-button {
  border-color: var(--vp-c-border);
  background: var(--vp-c-bg-alt);
}

.dark .lang-button:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}
</style>