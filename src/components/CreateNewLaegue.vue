<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

export default {
  data() {
    return {
      visible: false,
    }
  },
  components: {
    Button,
    Dialog,
    InputText,
  }
}
</script>

<template>
  <Button @click="visible = true">
    <p class="font-normal">Создать лигу</p>
  </Button>

  <Dialog v-model:visible="visible" modal header="Добавить лигу" :style="{ width: '30rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Заполните поля.</span>
    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="username" class="font-semibold w-24">Название лиги</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex flex-column items-center gap-2 mb-3">
      <label for="email" class="font-semibold w-24">Количество групп</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" @click="visible = false">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" @click="visible = false">
        <p class="font-normal">Добавить</p>
      </Button>
    </div>
  </Dialog>

</template>

<style scoped>

</style>