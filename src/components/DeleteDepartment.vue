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
    current: null
  },
  components: {
    Button,
    Dialog,
  },
  methods: {
    deleteDepartment() {
      this.visible = false;
      this.$store.dispatch('deleteDepartment', this.current.id)
    }
  },
  watch: {
    current(value) {
      this.disabled = this.current === null;
    }
  }
}
</script>

<template>
  <Button @click="visible = true" class="border-round-lg" v-bind:disabled="disabled">
    <p class="font-normal">Удалить</p>
  </Button>
  <Dialog v-model:visible="visible" modal header="Удалить подразделение"
          class="border-round-lg bg-gray-200" :style="{ width: '25rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Подтвердите действие</span>
    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" class="border-round-lg" @click="visible = false">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" severity="danger" class="border-round-lg" @click="deleteDepartment">
        <p class="font-normal">Удалить</p>
      </Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>