<script>
import Listbox from 'primevue/listbox';
import Dialog from 'primevue/dialog';
import Button from "primevue/button";
import InputMask from 'primevue/inputmask';
import InputText from "primevue/inputtext";

export default {
  data() {
    return {
      selectedMatches: null,
      winner_id: 0,
      score: "",
      score_by_batch: ["0-0", "0-0", "0-0"],
      visible: false
    }
  },
  components: {
    Listbox,
    Dialog,
    Button,
    InputMask,
    InputText
  },
  methods: {
    parse(data, n_groups) {
      if (data === null || data === undefined) {
        return {}
      }
      let dictionary = {};
      let liters = ['A', "B", "C", "D", "E", "F", "G", "H"];
      for(let i = 0; i < n_groups; i++) {
        dictionary[liters[i]] = [];
        for(let j = 0; j < data.length; j++) {
          if (data[j].group_name === liters[i]) {
            dictionary[liters[i]].push(data[j])
          }
        }
      }
      return dictionary;
    },
    cancel() {
      this.visible = false;
      this.score = "";
      this.score_by_batch = ["0-0", "0-0", "0-0"]
      this.winner_id = "0"
    },
    save() {
      let payload = {};
      payload['id'] = this.selectedMatches.match_id;
      payload['score'] = this.score;
      payload['score_by_batch'] = this.score_by_batch.join(' ')
      payload['league_id'] = this.selectedMatches.league_id;
      let score_array = this.score.split('-').map(Number)
      if (score_array[0] > score_array[1]) {
        payload['winner_id'] = this.selectedMatches.player1_id;
      } else {
        payload['winner_id'] = this.selectedMatches.player2_id;
      }
      console.log(payload);
      this.$store.dispatch("updateResult", payload);
      this.$store.dispatch("updateGroup", payload);
      this.cancel()
    }
  },
  computed: {
    currentLeague() {
      return this.$store.getters["GET_CURRENT_LEAGUE"];
    },
    allGroupMatches() {
      if (this.currentLeague === null) {
        return []
      }
      let data = this.$store.getters["GET_GROUP_MATCHES"];
      return this.parse(data, this.currentLeague.n_groups);
    }
  }
}
</script>

<template>
  <div class="fle flex-column w-full px-3">
    <Listbox v-model="selectedMatches" v-for="i in allGroupMatches" :options="i" optionLabel="name"
             v-show="allGroupMatches['A'].length !== 0"
             class="w-full mb-2 md:w-56 border-round-lg border-gray-900 animate__animated animate__backInDown"
             metaKeySelection listStyle="" @dblclick="visible = true">
      <template #option="slotProps">
        <div class="flex w-full h-fit">
          <div class="flex flex-1 w-0 justify-content-center align-items-center">{{ slotProps.option.player1_surname + ' ' +  slotProps.option.player1_name}}</div>
          <div class="flex flex-column flex-0 w-0 justify-content-center align-items-center bg-green-600 text-white text-xl" style="min-width: 150px;">
            <div class="flex w-full justify-content-center">{{slotProps.option.score}}</div>
            <div class="flex bg-green-100 text-gray-900 w-full justify-content-center px-2">{{slotProps.option.invoice_by_batch}}</div>
          </div>
          <div class="flex flex-1 w-0 justify-content-center align-items-center">{{ slotProps.option.player2_surname + ' ' +  slotProps.option.player2_name}}</div>
        </div>
      </template>
    </Listbox>
  </div>

  <Dialog v-model:visible="visible" modal header="Результат матча" :style="{ width: '20%' }"
          class="border-round-xl bg-gray-200">

    <div class="flex flex-column justify-content-start gap-2 mb-4">
      <div class="flex align-items-center font-semibold w-24">Итоговый счет</div>
      <InputMask id="score" v-model="score" mask="9-9" placeholder="0-0" class="flex text-xl text-center w-3"/>
      <div class="flex flex-column gap-2 justify-content-start">
        <div class="flex align-items-center font-semibold w-24">Счет по партиям</div>
        <div class="flex flex-row gap-2">
          <InputText v-model="score_by_batch[0]" placeholder="0-0" class="flex text-xl text-center w-3"/>
          <InputText v-model="score_by_batch[1]" placeholder="0-0" class="flex text-xl text-center w-3"/>
          <InputText v-model="score_by_batch[2]" placeholder="0-0" class="flex text-xl text-center w-3"/>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-5">
      <Button type="button" severity="secondary" @click="cancel" class="border-round-lg">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" @click="save" class="border-round-lg">
        <p class="font-normal">Сохранить результат</p>
      </Button>
    </div>
  </Dialog>

</template>

<style scoped>

.animate__animated.animate__backInDown {
  --animate-duration:3s;
}

</style>