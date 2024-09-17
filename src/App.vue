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
    LeagueInfo
  },
  methods: {},
}
</script>

<template>
  <div class="bg-gray-900 max-w-screen max-h-full">
    <Header></Header>
    <RouterView />
  </div>
</template>

<style scoped>
</style>
