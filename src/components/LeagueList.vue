<script>
import Listbox from "primevue/listbox";
import Button from "primevue/button";
import CreateNewLeague from "./CreateNewLaegue.vue";
import LeagueDelete from "./LeagueDelete.vue";

export default {
  data() {
    return {
      selectedLeague: null,
    }
  },
  components: {
    Listbox,
    Button,
    CreateNewLeague,
    LeagueDelete,
  },
  computed: {
    allLeagues() {
      return this.$store.getters.GET_LEAGUES;
    },
    currentTournament() {
      return this.$store.getters['tournamentList/currentTournamentId'];
    }
  },
  methods: {
    onRowSelected() {
      this.$store.dispatch('set_current_league', this.selectedLeague);
    }
  },
  watch: {
    currentTournament(value) {
      this.selectedLeague = null;
      console.log(value)
      this.$store.dispatch('set_current_league', null);
    },
    selectedLeague(value) {
      if (value === null) {
        this.$store.dispatch('setGroups', []);
        this.$store.dispatch('getGroup' +
            'Matches', null);
      } else {
        this.$store.dispatch('setGroups', this.selectedLeague.league_id);
        this.$store.dispatch('getGroupMatches', this.selectedLeague.league_id);
        this.$store.dispatch('playoff/getPlayoffs', this.selectedLeague.league_id);
        console.log('league_id', this.selectedLeague.league_id);
      }
    }
  }
}
</script>

<template>
  <div class="flex flex-column justify-content-start align-items-start">
    <div class="flex flex-column ml-3 p-3 border-gray-200 border-round-xl bg-gray-200">
      <label class="text-xl font-semibold mb-2">Лиги</label>
      <Listbox v-model="selectedLeague" :options="allLeagues" optionLabel="name" empty-message="Лиг не найдено"
               @change="onRowSelected" class="w-full md:w-fit border-none"
               metaKeySelection
               listStyle="max-height:100%; min-width: 200px; max-width: 200;">
      </Listbox>

      <div class="flex flex-row flex-wrap mt-3">
        <div class="flex align-items-center justify-content-center mr-2">
          <CreateNewLeague/>
        </div>
        <div class="flex align-items-center justify-content-center mr-2">
          <LeagueDelete/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>