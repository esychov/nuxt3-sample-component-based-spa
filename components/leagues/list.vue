<script setup lang="ts">

import TextFilter from "~/components/filters/text.vue";
import DropdownFilter from "~/components/filters/dropdown.vue";
import League from "~/components/leagues/league.vue";

const sportType = ref(null);
const leagueName = ref(null);

const leagues = await useLeaguesApi();

const sportTypes = computed(() => {
  const typesList: Record<string, string> = {};
  leagues.data.value.leagues.forEach(league => {
    typesList[league.strSport] = league.strSport;
  });
  return typesList;
});

const filteredLeagues: Array<League> = computed(() => {
  const data: Array<League> = [];
  leagues.data.value.leagues.forEach(league => {
    if (sportType.value && league.strSport !== sportType.value) {
      return;
    }

    if (leagueName.value && !league.strLeague.toLowerCase().includes(leagueName.value.toLowerCase())) {
      return;
    }

    data.push(league);
  });

  return data;
})

</script>

<template>
  <div>
    <h2>Leagues listing:</h2>
    <DropdownFilter caption="Select sport type" :options="sportTypes" @filtered="data => sportType = data"/>
    <TextFilter caption="Filter leagues by name" placeholder="type a name" @filtered="data => leagueName = data"/>
    <div class="leagues-wrapper">
      <League v-for="league in filteredLeagues"
              :key="league.idLeague" class="league"
              :id="league.idLeague"
              :name="league.strLeague"
              :sport="league.strSport"
              :alternate="league.strLeagueAlternate"
      />
    </div>
  </div>
</template>

<style scoped>
.leagues-wrapper {
  margin-top: 20px;
  margin-bottom: 20px;

  .league {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>
