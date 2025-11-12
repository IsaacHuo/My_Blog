<template>
  <div class="thoughts-layout">
    <div class="thoughts-content">
      <div class="thoughts-list">
        <a v-for="thought in thoughts" :key="thought.url" :href="thought.url" class="thought-item">
          <div class="thought-image">
            <img :src="thought.image || '/My_Blog/avatar.jpg'" :alt="thought.title" />
          </div>
          <div class="thought-content">
            <span class="thought-title">
              {{ thought.title }}
            </span>
          </div>
        </a>
      </div>
      
      <div v-if="thoughts.length === 0" class="empty-state">
        <p>{{ isZh ? '脑袋空空，暂无随想...' : 'No thoughts yet...' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { site, page, frontmatter } = useData()
const isZh = computed(() => site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/'))

// 这里可以根据实际需要从文件系统或数据源获取随想列表
// 目前先用示例数据
const thoughts = computed(() => {
  // 示例数据 - 实际使用时可以从 frontmatter 或其他数据源获取
  return frontmatter.value.thoughts || []
})
</script>

<style scoped>
/* 强制整个页面使用 DFKai 字体 */
.thoughts-layout,
.thoughts-layout *,
.thoughts-layout a,
.thoughts-layout a * {
  font-family: 'DFKai', 'GoudyOldStyle', sans-serif !important;
}

.thoughts-layout {
  display: block;
  max-width: 900px;
  margin: 0 auto;
  padding: var(--space-3xl) var(--space-lg);
}

.thoughts-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
}

.thought-item {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-lg);
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  transition: all 0.3s ease;
  background: var(--vp-c-bg-soft);
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.thought-item:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.thought-image {
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 6px;
  background: var(--vp-c-bg);
}

.thought-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.thought-item:hover .thought-image img {
  transform: scale(1.05);
}

.thought-content {
  flex: 1;
  min-width: 0;
}

.thought-title {
  display: block;
  font-size: var(--vp-font-size-lg);
  color: var(--vp-c-text-1);
  font-weight: 500;
  line-height: 1.6;
  transition: color 0.3s ease;
}

.thought-item:hover .thought-title {
  color: var(--vp-c-brand-1);
}

.empty-state {
  text-align: center;
  padding: var(--space-3xl) 0;
  color: var(--vp-c-text-2);
  font-size: var(--vp-font-size-lg);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .thoughts-layout {
    padding: var(--space-xl) var(--space-md);
  }

  .thought-item {
    flex-direction: column;
    text-align: center;
    gap: var(--space-md);
  }

  .thought-image {
    width: 100%;
    max-width: 200px;
    height: 200px;
    margin: 0 auto;
  }

  .thought-title {
    font-size: var(--vp-font-size-md);
  }
}
</style>
