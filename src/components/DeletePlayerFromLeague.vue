<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  data() {
    return {
      visible: false,
      disabled: true,
    }
  },
  props: {
    current: null,
    currentLeague: null,
  },
  components: {
    Button,
    Dialog,
  },
  methods: {
    deletePlayer() {
      this.visible = false;
      let payload = {'l_id': this.currentLeague.league_id, 'player_id': this.current.player_id};
      console.log(payload)
      this.$store.dispatch("deletePlayer", payload)
    }
  },
  computed: {
    currentLeague() {
      return this.$store.getters['GET_CURRENT_LEAGUE'];
    },
  },
  watch: {
    current(value) {
      console.log(this.currentLeague);
      if (value !== null) {
        if (this.currentLeague.draw_completed === true) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      } else {
        this.disabled = true;
      }
    },
  }
}
</script>

<template> <Button @click="visible = true" class="border-round-lg" v-bind:disabled="disabled">
  <p class="font-normal">Удалить</p>
</Button>

<Dialog v-model:visible="visible" modal header="Удалить лигу"
        class="border-round-lg bg-gray-200" :style="{ width: '25rem' }">
  <span class="text-surface-500 dark:text-surface-400 block mb-4">Подтвердите действие</span>
  <div class="flex justify-end gap-2">
    <Button type="button" severity="secondary" class="border-round-lg" @click="visible = false">
      <p class="font-normal">Отмена</p>
    </Button>
    <Button type="button" severity="danger" class="border-round-lg" @click="deletePlayer">
      <p class="font-normal">Удалить</p>
    </Button>
  </div>
</Dialog>

</template>

<style scoped>

</style>