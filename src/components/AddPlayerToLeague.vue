<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Listbox from 'primevue/listbox';


export default {
  data() {
    return {
      visible: false,
      selectedPlayers: []
    }
  },
  components: {
    Button,
    Dialog,
    Listbox
  },
  methods: {
    cancel() {
      this.visible = false;
      this.selectedPlayers = [];
    },
    add() {
      let players = []
      for(let i = 0; i < this.selectedPlayers.length; i++) {
        players.push(this.selectedPlayers[i].player_id)
      }
      console.log(222, players)
      let payload = {'l_id': this.currentLeague.league_id, 'players': players}
      this.$store.dispatch("addPlayers", payload)
      this.cancel()
    },
  },
  computed: {
    allPlayers() {
      return this.$store.getters['player/GET_PLAYERS']
    },
    currentLeague() {
      return this.$store.getters["GET_CURRENT_LEAGUE"];
    },
    non_participants() {
      let league_players = this.currentLeague.players.split(',').map(Number);
      let players = this.allPlayers;
      let result = [];

      for(let i = 0; i < players.length; i++) {
        let flag = false;
        for(let j = 0; j < league_players.length; j++) {
          if (players[i].player_id === league_players[j]) {
            flag = true;
            break;
          }
        }
        if (flag === false) {
          result.push(players[i]);
        }
      }
      console.log("11", result);
      return result;
    },
  },
}
</script>

<template>
  <Button @click="visible = true" class="border-round-lg">
    <p class="font-normal">Добавить игроков</p>
  </Button>

  <Dialog v-model:visible="visible" modal header="Добавить игроков"
          class="border-round-lg bg-gray-200" :style="{ width: '30rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Выберите игроков.</span>
    <div class="flex flex-column items-center gap-2 mb-4">
      <Listbox v-model="selectedPlayers" :options="non_participants" optionLabel="name" checkmark multiple
               filter :highlightOnSelect="false" class="w-full md:w-56" empty-filter-message="Совпадений не найдено"
               listStyle="max-height: 100%; height: 350px; min-width: 350px; max-width: 350;">
        <template #option="slotProps">
          {{slotProps.option.surname + ' ' + slotProps.option.name }}
        </template>
      </Listbox>
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" class="border-round-lg" @click="cancel">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" class="border-round-lg" @click="add">
        <p class="font-normal">Добавить</p>
      </Button>
    </div>

  </Dialog>
</template>

<style scoped>

</style>