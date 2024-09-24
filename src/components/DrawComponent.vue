<script>
import Listbox from 'primevue/listbox';
import CreateNewLeague from "./CreateNewLaegue.vue";
import LeagueDelete from "./LeagueDelete.vue";
import DeletePlayerFromLeague from "./DeletePlayerFromLeague.vue";

export default {
  data() {
    return {
        selectedPlayer: null
    }
  },
  components: {
    LeagueDelete, CreateNewLeague,
    Listbox,
    DeletePlayerFromLeague
  },
  computed: {
    currentLeague() {
      return this.$store.getters["GET_CURRENT_LEAGUE"];
    },
    allPlayers() {
      return this.$store.getters['player/GET_PLAYERS']
    },
    addedPlayers() {
      console.log(this.currentLeague)
      if (this.currentLeague === null) {
        return []
      }
      let league_players = this.currentLeague.players.split(',').map(Number);
      let players = this.allPlayers;
      let result = []

      for(let i = 0; i < players.length; i++) {
        for(let j = 0; j < league_players.length; j++) {
          if (players[i].player_id === league_players[j]) {
            result.push(players[i]);
            break;
          }
        }
      }
      return result;
    }

  }
}
</script>

<template>

  <div class="flex flex-column">
    <p class="text-xl font-semibold mb-2">Игроки лиги</p>
    <Listbox v-model="selectedPlayer" :options="addedPlayers" filter optionLabel="name"
             listStyle="max-height: 100%; height: 400px; min-width: 500px; max-width: 500;">
      <template #option="slotProps">
        {{slotProps.option.surname + ' ' + slotProps.option.name }}
      </template>
    </Listbox>

    <div class="flex flex-row flex-wrap mt-3">
      <div class="flex align-items-center justify-content-center mr-2">
        <DeletePlayerFromLeague v-bind:current="selectedPlayer"></DeletePlayerFromLeague>
      </div>
      <div class="flex align-items-center justify-content-center mr-2">
        аа
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>