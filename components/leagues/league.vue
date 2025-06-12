<script setup lang="ts">
import {ref, type Ref} from 'vue'
import useSeasonsApi from '../../composables/use-seasons-api'

defineProps({
  name: {type: String, required: true},
  sport: {type: String, required: true},
  alternate: {type: String, required: true},
  id: {type: String, required: true}
})

const imageLoaded = ref(false);
const imageSrc: Ref<string | null | undefined> = ref(null);

async function loadLogo(leagueId: string) {
  if (!imageLoaded.value) {
    const data = await useSeasonsApi(leagueId);
    imageSrc.value = data?.seasons?.pop()?.strBadge;
    imageLoaded.value = true;
  }
}

</script>

<template>
  <div @click.prevent="loadLogo(id)">
    <div><span>Title: </span> {{ name }}</div>
    <div><span>Sport: </span> {{ sport }}</div>
    <div><span>Alternate: </span> {{ alternate }}</div>

    <span class="logo" v-if="!imageSrc && imageLoaded">No Logo</span>
    <img class="logo" :src="imageSrc" v-if="imageSrc" :alt="`${name} logo`"/>
  </div>
</template>

<style scoped>
.logo {
  width: 100px;
  aspect-ratio: auto;
}
</style>
