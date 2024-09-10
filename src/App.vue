<script>
import Header from "./components/Header.vue"
import TournamentComponent from "./components/TournamentComponent.vue";
import LeagueComponent from "./components/LeagueComponent.vue";

export default {
  data() {
    return {
      selectedLeague: null,
      t_id: null,
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
  <Header></Header>
  <div class="flex w-full h-screen justify-content-start align-items-start bg-transparent bg-gray-300">
    <TournamentComponent/>
    <LeagueComponent/>


<!--    <div class="flex flex-column flex-wrap bg-white border-round-lg justify-content-center py-5" style="max-width: 500px">-->
<!--      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>-->
<!--      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>-->
<!--      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>-->
<!--      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>-->
<!--      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>-->
<!--    </div>-->
  </div>

</template>

<style scoped>

  .container {
    display: flex;
    height: 100vh;
    width: 100vh;
  }
  
</style>
