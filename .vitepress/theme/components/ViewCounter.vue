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
      <!-- 出错时显示 -- 或隐藏，避免显示吓人的错误信息 -->
      --
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
import { ref, onMounted, computed, onBeforeUnmount, watch } from 'vue'

const props = defineProps<{
  id: string
  showLabel?: boolean
  readonly?: boolean
  isZh?: boolean
}>()

const count = ref<number | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
let abortController: AbortController | null = null
let timeoutId: any = null

// ⚠️ 请替换为您的真实 Worker 地址
// ⚠️ Please replace with your actual Worker URL
const WORKER_URL = 'https://blog-counter.2210286979.workers.dev/'

const formattedCount = computed(() => {
  if (count.value === null) return '0'
  return count.value.toLocaleString()
})

const fetchCount = async () => {
    if (!props.id) return
    
    // 如果之前的请求还在进行，取消它
    if (abortController) {
      abortController.abort()
    }
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    abortController = new AbortController()
    
    // 设定 5 秒超时，防止网络卡住时无限 Loading
    timeoutId = setTimeout(() => {
        if (abortController) abortController.abort()
    }, 5000)

    loading.value = true
    error.value = null
    
    try {
        const url = new URL(WORKER_URL)
        url.searchParams.set('id', props.id)
        if (props.readonly) {
            url.searchParams.set('readonly', 'true')
        }
        // 增加时间戳防止缓存
        url.searchParams.set('t', Date.now().toString())

        const res = await fetch(url.toString(), {
            signal: abortController.signal
        })
        
        clearTimeout(timeoutId) // 成功响应，清除超时

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        
        count.value = data.count
    } catch (e: any) {
        if (e.name === 'AbortError') {
            // 超时或取消时不显示错误，静默失败
            return
        }
        console.error('ViewCounter Error:', e)
        error.value = e.message
    } finally {
        loading.value = false
        if (timeoutId) clearTimeout(timeoutId)
    }
}

onMounted(() => {
  fetchCount()
})

// 监听 ID 变化，如果在同一个页面组件没销毁但 ID 变了的情况（虽然这里主要是 inject 方式）
watch(() => props.id, () => {
  fetchCount()
})

onBeforeUnmount(() => {
    if (abortController) {
        abortController.abort()
    }
    if (timeoutId) {
        clearTimeout(timeoutId)
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
