<template>
  <Transition name="fade">
    <button
      v-show="isVisible && shouldShow"
      class="back-to-top"
      aria-label="回到顶部"
      @click="scrollToTop"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()
const isVisible = ref(false)

// 在 ArticleLayout 页面隐藏按钮，因为文章页面有自己的回到顶部按钮
const shouldShow = computed(() => {
  return frontmatter.value.layout !== 'ArticleLayout'
})

function handleScroll() {
  // 滚动超过100px时显示按钮
  isVisible.value = window.scrollY > 100
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  outline: none; /* 移除默认轮廓 */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 999;
  padding: 0; /* 确保没有内边距影响对齐 */
  flex-shrink: 0; /* 防止收缩 */
}

.back-to-top:hover {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.back-to-top:active {
  transform: translateY(-1px);
}

.back-to-top:focus {
  /* 保持默认焦点样式或自定义 */
}

.back-to-top svg {
  width: 24px;
  height: 24px;
  display: block; /* 确保 SVG 块级显示，避免内联元素的空白 */
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

/* 移动端适配 */
@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 45px;
    height: 45px;
  }
  
  .back-to-top svg {
    width: 20px;
    height: 20px;
  }
}
</style>
