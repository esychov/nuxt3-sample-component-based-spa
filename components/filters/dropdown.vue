<script setup lang="ts">

import type { PropType } from 'vue'

defineProps({
  caption: {type: String, default: ''},
  options: {type: Object as PropType<Record<string, string>>}
});

const emit = defineEmits(['filtered']);

</script>

<template>
  <div class="select-area">
    <span v-if="caption && caption.length > 0">{{ caption }}:</span>
    <select @input.prevent="event => emit('filtered', (event?.target as HTMLSelectElement)?.value)">
      <option selected value>All</option>
      <option v-for="(text, option) in options" :key="option" :value="option">{{ text }}</option>
    </select>
  </div>
</template>

<style scoped>
.select-area {
  display: grid;
  grid-template-rows: 1fr 1fr;
}
</style>
