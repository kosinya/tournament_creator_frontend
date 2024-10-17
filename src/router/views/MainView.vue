<script setup>

import LeagueInfo from "../../components/LeagueInfo.vue";
import TournamentComponent from "../../components/TournamentComponent.vue";
import LeagueList from "../../components/LeagueList.vue";
</script>

<template>
  <div class="flex w-full h-screen justify-content-start align-items-start">
    <TournamentComponent/>
    <LeagueList/>
    <LeagueInfo/>
  </div>
</template>

<style scoped>

</style>