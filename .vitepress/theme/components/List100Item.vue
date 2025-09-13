<template>
  <div class="list100-item">
    <div class="item-content">
      <span class="item-id">{{ itemId }}</span>
      <span class="item-text">{{ itemText }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  itemId: {
    type: [String, Number],
    required: true
  },
  itemText: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.list100-item {
  margin-bottom: 0.3rem;
}

.item-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-id {
  font-weight: bold;
  color: var(--vp-c-brand-1);
  min-width: 2rem;
}

.item-text {
  flex: 1;
}
</style>