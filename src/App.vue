<script>
import Header from "./components/Header.vue"
import TournamentComponent from "./components/TournamentComponent.vue";
import LeagueComponent from "./components/LeagueComponent.vue";

export default {
  data() {
    return {
      selectedLeague: null,
    }
  },
  components: {
    Header,
    LeagueComponent,
    TournamentComponent,
  },
  methods: {

  },
}
</script>

<template>
  <div class="bg-gray-900">
    <Header></Header>
    <div class="flex w-full h-screen justify-content-start align-items-start">
      <TournamentComponent/>
      <LeagueComponent/>
    </div>
  </div>
</template>

<style scoped>
</style>
