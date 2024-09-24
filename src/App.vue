<script>
import Header from "./components/Header.vue"
import TournamentComponent from "./components/TournamentComponent.vue";
import LeagueList from "./components/LeagueList.vue";
import LeagueInfo from "./components/LeagueInfo.vue";
export default {
  data() {
    return {
      selectedLeague: null,
    }
  },
  components: {
    Header,
    LeagueList,
    TournamentComponent,
    LeagueInfo,
  },
  methods: {},
  mounted() {
    this.$store.dispatch("player/getAllPlayers");
    this.$store.dispatch("getAllDepartments");
  }
}
</script>

<template>
  <div class="bg-gray-900 max-w-screen max-h-screen overflow-auto">
    <Header></Header>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
