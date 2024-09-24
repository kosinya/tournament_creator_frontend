<script>
import Listbox from 'primevue/listbox';
import Dialog from 'primevue/dialog';
import Button from "primevue/button";

export default {
  data() {
    return {
      selectedMatches: null,
      winner_id: 0,
      score: "0-0",
      visible: false
    }
  },
  components: {
    Listbox,
    Dialog,
    Button
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
      this.score = "0-0";
      this.winner_id = "0"
    },
    save() {
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
      console.log(data);
      return this.parse(data, this.currentLeague.n_groups);
    }
  }
}
</script>

<template>
  <div class="fle flex-column w-full px-3">
    <Listbox v-model="selectedMatches" v-for="i in allGroupMatches" :options="i" optionLabel="name"
             class="w-full mb-2 md:w-56 border-round-lg border-transparent"
             listStyle="max-height:250px" @dblclick="visible = true">
      <template #option="slotProps">
        <div class="flex w-full">
          <div class="flex flex-1 w-0 justify-content-center align-items-center">{{ slotProps.option.player1_surname + ' ' +  slotProps.option.player1_name}}</div>
          <div class="flex flex-0 w-0 justify-content-center bg-green-600 py-1 px-2 text-white text-xl">{{slotProps.option.score}}</div>
          <div class="flex flex-1 w-0 justify-content-center align-items-center">{{ slotProps.option.player2_surname + ' ' +  slotProps.option.player2_name}}</div>
        </div>
      </template>
    </Listbox>
  </div>

  <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-3">Update your information.</span>

    <div class="flex justify-end gap-2">
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

</style>