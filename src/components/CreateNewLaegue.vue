<script>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Select from 'primevue/select';

export default {
  data() {
    return {
      visible: false,
      nums: [
          4, 8
      ],
      newLeague: {
        name: '',
        n_groups: 4
      }
    }
  },
  components: {
    Button,
    Dialog,
    InputText,
    Select,
  },
  methods: {
    cancel() {
      this.visible = false;
      this.newLeague.name = ''
      this.newLeague.n_groups = 4
    },
    create() {
      let id = this.$store.getters["tournamentList/currentTournamentId"];
      console.log(id);
      this.$store.dispatch('addNewLeague', {data: this.newLeague, t_id: id});
      this.cancel()
    }
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
      <InputText v-model="newLeague.name" id="name" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex flex-column items-center gap-2 mb-3">
      <label for="email" class="font-semibold w-24">Количество групп</label>
      <Select v-model="newLeague.n_groups" :options="nums" placeholder="Выберите количество групп"
              class="w-full md:w-56"/>
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" @click="cancel">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" @click="create">
        <p class="font-normal">Добавить</p>
      </Button>
    </div>
  </Dialog>

</template>

<style scoped>

</style>