<template>
  <div class="progress-tracker" ref="trackerRef">
    <div 
      class="progress-item" 
      @mouseenter="showTooltip = true"
      @mouseleave="showTooltip = false"
    >
      <div class="item-content">
        <span class="item-text">{{ itemText }}</span>
        <span class="progress-icon" v-if="progressText">📝</span>
      </div>
      
      <!-- 悬停提示框 -->
      <div v-if="showTooltip" class="progress-tooltip">
        <div class="tooltip-content">
          <div class="tooltip-header">{{ getTooltipHeader() }}</div>
          <div class="tooltip-text" v-if="progressText">
            {{ progressText }}
          </div>
          <div class="tooltip-empty" v-else>
             {{ getEmptyText() }}
           </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  itemId: {
    type: [String, Number],
    required: true
  },
  itemText: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: 'zh'
  }
})

const showTooltip = ref(false)
const progressText = ref('')
const trackerRef = ref(null)

const storageKey = `list100-progress-${props.itemId}`

// 从本地存储加载进度
const loadProgress = () => {
  const saved = localStorage.getItem(storageKey)
  if (saved) {
    progressText.value = saved
  }
}

// 获取提示框标题
const getTooltipHeader = () => {
  return props.language === 'en' ? 'Progress Tracker' : '进度记录'
}

// 获取空状态文字
const getEmptyText = () => {
  return props.language === 'en' ? 'No progress recorded yet' : '暂无进度记录'
}

// 组件挂载时加载保存的进度
onMounted(() => {
  loadProgress()
})
</script>

<style scoped>
.progress-tracker {
  position: relative;
  display: inline-block;
  width: 100%;
}

.progress-item {
  position: relative;
  transition: all 0.2s ease;
  border-radius: 4px;
  padding: 2px 4px;
}

.progress-item:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.item-text {
  flex: 1;
  text-align: left;
}

.progress-icon {
  font-size: 14px;
  opacity: 0.6;
  margin-left: 8px;
}

/* 悬停提示框样式 */
.progress-tooltip {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%) translateY(-100%);
  z-index: 1000;
  pointer-events: none;
  animation: tooltipFadeIn 0.2s ease-out;
}

.tooltip-content {
  background: white;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 12px 16px;
  max-width: 300px;
  min-width: 200px;
  border: 1px solid #e5e7eb;
}

.tooltip-content::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 6px solid transparent;
  border-top-color: white;
}

.tooltip-content::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 7px solid transparent;
  border-top-color: #e5e7eb;
  z-index: -1;
}

.tooltip-header {
  font-weight: 600;
  font-size: 14px;
  color: #111111;
  margin-bottom: 8px;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 6px;
}

.tooltip-text {
  font-size: 13px;
  color: #111111;
  line-height: 1.4;
  white-space: pre-wrap;
  word-break: break-word;
}

.tooltip-empty {
  font-size: 13px;
  color: #111111;
  font-style: italic;
}

@keyframes tooltipFadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-100%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(-100%) scale(1);
  }
}

/* 响应式设计 */
@media (max-width: 640px) {
  .tooltip-content {
    max-width: 250px;
    min-width: 180px;
    padding: 10px 12px;
  }
  
  .tooltip-header {
    font-size: 13px;
    margin-bottom: 6px;
  }
  
  .tooltip-text,
  .tooltip-empty {
    font-size: 12px;
  }
}
</style>