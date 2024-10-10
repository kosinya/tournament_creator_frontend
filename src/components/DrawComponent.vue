<script>
import Listbox from 'primevue/listbox';
import CreateNewLeague from "./CreateNewLaegue.vue";
import LeagueDelete from "./LeagueDelete.vue";
import DeletePlayerFromLeague from "./DeletePlayerFromLeague.vue";
import AddPlayerToLeague from "./AddPlayerToLeague.vue";

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from 'primevue/toast';
import {leagueApi} from "../api/api_routes/league.js";
import {useToast} from "primevue/usetoast";
import {league} from "../store/modules/laegues.js";

export default {
  data() {
    return {
        selectedPlayer: null,
        visible: false,
        disabled: false,
        drawAnimationVisible: false,
    }
  },
  setup() {
    const toast = useToast();
    const drawError = () => {
      toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Список игроков пуст либо не кратен 4', life: 3000 });
    }
    return {drawError}
  },
  components: {
    LeagueDelete, CreateNewLeague,
    Listbox,
    DeletePlayerFromLeague,
    AddPlayerToLeague,
    Button,
    Dialog,
    Toast
  },
  computed: {
    currentLeague() {
      let league = this.$store.getters["GET_CURRENT_LEAGUE"];
      this.disabled = !(league !== null && league.draw_completed === false);
      return league;
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
      leagueApi.draw(this.currentLeague.league_id)
      this.drawAnimationVisible = true;
      setTimeout(() => this.drawAnimationVisible=false, 3200);
      this.disabled = true;
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
        {{slotProps.option.surname + ' ' + slotProps.option.name + ' / Рейтинг: ' + slotProps.option.rating }}
      </template>
    </Listbox>

    <div class="flex flex-row flex-wrap mt-3">
      <div class="flex align-items-center justify-content-center mr-2">
        <DeletePlayerFromLeague v-bind:current="selectedPlayer"></DeletePlayerFromLeague>
      </div>
      <div class="flex align-items-center justify-content-center mr-2">
        <AddPlayerToLeague v-bind:disabled="disabled"/>
      </div>
      <div class="flex align-items-center justify-content-center mr-2">
        <Button severity="success" outlined class="border-round-lg" @click="visible = true" v-bind:disabled="disabled">
          <p class="font-normal">Провести жеребьевку</p>
        </Button>

        <Toast class="bg-blue-200 border-round-lg"/>
        <Dialog v-model:visible="visible" modal header="Жеребьевка"
                class="border-round-lg bg-gray-200" :style="{ width: '25rem' }">
          <span class="text-surface-500 dark:text-surface-400 block mb-4">Вы точно хотите провести жеребьевку?
          Вы больше не сможете удалить или добавить участника.</span>
          <div class="flex justify-end gap-2">
            <Button type="button" severity="secondary" class="border-round-lg" @click="visible = false">
              <p class="font-normal">Отмена</p>
            </Button>
            <Button type="button" severity="danger" class="border-round-lg" @click="draw">
              <p class="font-normal">Подтвердить</p>
            </Button>
          </div>
        </Dialog>
        <Dialog v-model:visible="drawAnimationVisible" class="bg-black-alpha-70 w-full align-items-center" unstyled>
          <img alt="" src="../assets/Confetti.gif">
        </Dialog>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>