<template>
  <div class="container">
    <LeaguesList/>
  </div>

</template>
<script setup lang="ts">
import LeaguesList from "~/components/leagues/list.vue"
</script>
<style lang="css">
* {
  margin: 0;
  padding: 0;
}
</style>
<style scoped>
.container {
  padding: 20px;

  width: 100%;

  @media screen and (min-width: 601px) {
    width: 600px;
  }
}
</style>
