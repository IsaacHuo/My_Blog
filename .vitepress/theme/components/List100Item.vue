<template>
  <div class="list100-item">
    <ProgressTracker 
      :item-id="itemId"
      :item-text="itemText"
    />
  </div>
</template>

<script setup>
import ProgressTracker from './ProgressTracker.vue'

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
</style>