<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-backdrop" @click="$emit('close')">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h3>{{ isZh ? item.textZh : item.textEn }}</h3>
            <button class="close-btn" @click="$emit('close')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <div class="modal-body">
            <div v-if="!item.records || item.records.length === 0" class="empty-state">
              {{ isZh ? '暂无记录' : 'No records yet.' }}
            </div>
            
            <div v-else class="timeline">
              <div v-for="(record, idx) in item.records" :key="idx" class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <div class="record-meta">
                    <span class="record-date">{{ record.date }}</span>
                    <span class="record-status" :class="getStatusClass(record.status)">
                      {{ record.status }}
                    </span>
                  </div>
                  <div class="record-text">
                    {{ isZh ? record.contentZh : record.contentEn }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
  item: any
  isZh: boolean
}>()

defineEmits(['close'])

const getStatusClass = (status: string) => {
  const s = status.toLowerCase()
  if (s.includes('done') || s.includes('complete') || s === 'completed') return 'status-success'
  if (s.includes('progress')) return 'status-progress'
  if (s.includes('fail') || s.includes('stalled')) return 'status-error'
  return 'status-default'
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
}

.modal-container {
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  width: 100%;
  max-width: 550px;
  max-height: 85vh;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: modal-pop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.close-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: var(--vp-c-text-3);
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--vp-c-text-1);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.empty-state {
  text-align: center;
  color: var(--vp-c-text-3);
  padding: 2rem 0;
  font-style: italic;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-left: 0.5rem;
}

.timeline-item {
  position: relative;
  display: flex;
  gap: 1.25rem;
}

.timeline-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vp-c-brand-1);
  margin-top: 6px;
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

/* Line connecting dots */
.timeline-item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 14px;
  left: 3.5px; /* (8px / 2) - (1px / 2) */
  bottom: -24px; /* gap + next item top offset approximately */
  width: 1px;
  background: var(--vp-c-divider);
  z-index: 1;
}

.timeline-content {
  flex: 1;
}

.record-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.4rem;
}

.record-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-family: var(--vp-font-family-mono);
}

.record-status {
  font-size: 0.75rem;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
}

.status-default { background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }
.status-progress { background: rgba(var(--vp-c-brand-1), 0.1); color: var(--vp-c-brand-1); }
.status-success { background: rgba(16, 185, 129, 0.1); color: #10b981; }
.status-error { background: rgba(239, 68, 68, 0.1); color: #ef4444; }

.record-text {
  font-size: 0.95rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes modal-pop {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (max-width: 480px) {
  .modal-container {
    max-height: 90vh;
  }
}
</style>
