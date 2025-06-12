<script setup lang="ts">

defineProps({
  'caption': {type: String, default: ''},
  'placeholder': {type: String, default: null},
});

const emit = defineEmits(['filtered']);

</script>

<template>
  <div class="input-area">
    <span v-if="caption && caption.length > 0">{{ caption }}:</span>
    <input @keyup="event => emit('filtered', (event?.target as HTMLInputElement)?.value)"
           type="text"
           :placeholder="placeholder"/>
  </div>
</template>

<style scoped>
.input-area {
  display: grid;
  grid-template-rows: 1fr 1fr;
}
</style>
