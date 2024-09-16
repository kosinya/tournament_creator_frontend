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
  components: {
    Button,
    Dialog,
  },
  methods: {
    deleteLeague() {
      this.visible = false;
      this.$store.dispatch('deleteLeague', this.$store.getters['GET_CURRENT_LEAGUE'].league_id)
    }
  },
  computed: {
    currentLeague() {
      return this.$store.getters['GET_CURRENT_LEAGUE'];
    }
  },
  watch: {
    currentLeague(value) {
      if (value === null) {
        this.disabled = true
      } else {
        this.disabled = false
      }
    }
  }
}
</script>

<template>
  <Button @click="visible = true" class="border-round-lg" v-bind:disabled="disabled">
    <p class="font-normal">Удалить</p>
  </Button>
  <Dialog v-model:visible="visible" modal header="Удалить лигу" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Подтвердите действие</span>
      <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" class="border-round-lg" @click="visible = false">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" severity="danger" class="border-round-lg" @click="deleteLeague">
        <p class="font-normal">Удалить</p>
      </Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>