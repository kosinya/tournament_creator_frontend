<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

export default {
  data() {
    return {
      visible: false,
      newDepartment: {
        name: ''
      }
    }
  },
  components: {
    Button,
    Dialog,
    InputText,
  },
  methods: {
    cancel() {
      this.visible = false;
      this.newDepartment.name = ''
    },
    create() {
      this.$store.dispatch('addNewDepartment', this.newDepartment);
      this.cancel()
    }
  }
}
</script>

<template>
  <Button @click="visible = true" class="border-round-lg">
    <p class="font-normal">Добавить подразделение</p>
  </Button>

  <Dialog v-model:visible="visible" modal header="Добавить подразделение" :style="{ width: '30rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Заполните поля.</span>
    <div class="flex flex-column items-center gap-2 mb-4">
      <label class="font-semibold w-24">Наименование подразделения</label>
      <InputText v-model="newDepartment.name" id="name" class="flex-auto" autocomplete="off" />
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" class="border-round-lg" @click="cancel">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" class="border-round-lg" @click="create">
        <p class="font-normal">Добавить</p>
      </Button>
    </div>

  </Dialog>
</template>

<style scoped>

</style>