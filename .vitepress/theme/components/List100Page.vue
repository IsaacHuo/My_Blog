<template>
  <div class="list100-layout">
    <div class="list100-content">
      <h1>{{ isZh ? '清单 50' : 'List 50' }}</h1>
      <p>
        {{ isZh
          ? '死前想做的事情。进度截至2023年12月31日。'
          : 'Things I want to do before I die. Progress as of Dec 31, 2023.'
        }}
      </p>

      <ol>
        <li
          v-for="itemNumber in list100Numbers"
          :key="itemNumber"
        >
          {{ itemNumber }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed } from 'vue'

const { site, page } = useData()
const isZh = computed(() => site.value.lang === 'zh-CN' || page.value.relativePath.startsWith('zh/'))
const list100Numbers = Array.from({ length: 50 }, (_, index) => index + 1)
</script>

<style scoped>
.list100-layout {
  max-width: var(--content-max-width);
  margin: 0 auto;
  padding: 30px 15px;
}

.list100-content {
  --list100-item-offset: 36px;
}

.list100-content h1 {
  margin: 0 0 15px var(--list100-item-offset);
  color: var(--vp-c-text-1);
  font-size: 42px;
  font-weight: 400;
  line-height: 1;
}

.list100-content p {
  margin: 0 0 15px var(--list100-item-offset);
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 1.5;
}

.list100-content ol {
  margin: 0 0 15px var(--list100-item-offset);
  padding: 0;
  list-style: none;
}

.list100-content li {
  margin: 0;
  padding: 0;
  color: var(--vp-c-text-1);
  font-size: 16px;
  line-height: 1.5;
}

.list100-content :deep(a) {
  color: #4d74eb !important;
  text-decoration: none;
}

.list100-content :deep(a:hover) {
  color: var(--vp-c-text-1) !important;
  text-decoration: underline;
}

@media (max-width: 800px) {
  .list100-layout {
    padding-right: 7.5px;
    padding-left: 7.5px;
  }

  .list100-content h1 {
    font-size: 36px;
  }
}
</style>
