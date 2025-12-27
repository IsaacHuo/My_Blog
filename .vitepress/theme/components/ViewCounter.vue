<template>
  <span
    class="view-count"
    :class="{ 'with-label': showLabel }"
  >
    <span
      v-if="loading"
      class="count-loading"
    >...</span>
    <span
      v-else-if="error"
      class="count-error"
      :title="error"
    >
      {{ isZh ? '(配置错误)' : '(Config Error)' }}
    </span>
    <template v-else>
      <span v-if="showLabel">{{ isZh ? '总阅读量: ' : 'Total Views: ' }}</span>
      <span class="count-number">{{ formattedCount }}</span>
      <span
        v-if="!showLabel"
        class="count-suffix"
      > {{ isZh ? '阅读量' : ' views' }}</span>
    </template>
  </span>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  id: string
  showLabel?: boolean
  readonly?: boolean
  isZh?: boolean
}>()

const count = ref<number | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

// ⚠️ 请替换为您的真实 Worker 地址
// ⚠️ Please replace with your actual Worker URL
const WORKER_URL = 'https://blog-counter.2210286979.workers.dev/'

const formattedCount = computed(() => {
  if (count.value === null) return '0'
  return count.value.toLocaleString()
})

onMounted(async () => {
  try {
    loading.value = true
    error.value = null
    
    // Construct URL
    const url = new URL(WORKER_URL)
    url.searchParams.set('id', props.id)
    if (props.readonly) {
      url.searchParams.set('readonly', 'true')
    }

    const res = await fetch(url.toString())
    if (!res.ok) {
        // If 404/500 etc
        const text = await res.text()
        throw new Error(`Fetch error: ${res.status} - ${text}`)
    }
    
    const data = await res.json()
    if (data.error) throw new Error(data.error)
    
    count.value = data.count
  } catch (e: any) {
    console.error('ViewCounter Error:', e)
    error.value = e.message
    // If it's a network error (likely invalid URL), we want to show it
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.view-count {
  font-family: var(--vp-font-family-base);
  font-size: 0.9rem;
  color: var(--vp-c-text-3);
  display: inline-flex;
  align-items: center;
  margin-top: 0.1rem;
}

.view-count.with-label {
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.count-number {
  font-feature-settings: "tnum";
  margin: 0 0.25em;
}

.count-suffix {
  font-size: 0.85em;
  opacity: 0.8;
}

.count-error {
    color: #ef4444;
    font-size: 0.8em;
    cursor: help;
}
</style>
