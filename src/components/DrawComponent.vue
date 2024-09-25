<script>
import Listbox from 'primevue/listbox';
import CreateNewLeague from "./CreateNewLaegue.vue";
import LeagueDelete from "./LeagueDelete.vue";
import DeletePlayerFromLeague from "./DeletePlayerFromLeague.vue";
import AddPlayerToLeague from "./AddPlayerToLeague.vue";

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import {leagueApi} from "../api/api_routes/league.js";

export default {
  data() {
    return {
        selectedPlayer: null,
        visible: false
    }
  },
  components: {
    LeagueDelete, CreateNewLeague,
    Listbox,
    DeletePlayerFromLeague,
    AddPlayerToLeague,
    Button,
    Dialog
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
    },
  },
  methods: {
    draw() {
      this.visible = false;
      leagueApi.draw(this.currentLeague.league_id);
    }
  }
}
</script>

<template>

  <div class="flex flex-column">
    <p class="text-xl font-semibold mb-2">Игроки лиги</p>
    <Listbox v-model="selectedPlayer" :options="addedPlayers" filter optionLabel="name"
             empty-filter-message="Совпадений не найдено"
             empty-message="Ни один игрок не добавлен"
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
        <AddPlayerToLeague />
      </div>
      <div class="flex align-items-center justify-content-center mr-2">
        <Button severity="warn" class="border-round-lg" @click="visible = true">
          <p class="font-normal">Провести жеребьевку</p>
        </Button>

        <Dialog v-model:visible="visible" modal header="Жеребьевка"
                class="border-round-lg bg-gray-200" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-4">Вы точно хотите провести жеребьевку?</span>
          <div class="flex justify-end gap-2">
            <Button type="button" severity="secondary" class="border-round-lg" @click="visible = false">
              <p class="font-normal">Отмена</p>
            </Button>
            <Button type="button" severity="danger" class="border-round-lg" @click="draw">
              <p class="font-normal">Подтвердить</p>
            </Button>
          </div>
        </Dialog>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>