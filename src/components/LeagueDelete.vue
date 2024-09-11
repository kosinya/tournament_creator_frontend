<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";


export default {
  data() {
    return {
      visible: false,
    }
  },
  components: {
    Button,
    Dialog,
  },
  methods: {
    deleteLeague() {
      this.visible = false;
      this.$store.dispatch('deleteLeague', this.$store.getters['GET_CURRENT_LEAGUE_ID'])
    }
  }
}
</script>

<template>
  <Button @click="visible = true" >
    <p class="font-normal">Удалить</p>
  </Button>
  <Dialog v-model:visible="visible" modal header="Удалить лигу" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Подтвердите действие</span>
      <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" @click="visible = false">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" severity="danger" @click="deleteLeague">
        <p class="font-normal">Удалить</p>
      </Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>