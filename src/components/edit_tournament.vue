<script>
  import Dialog from 'primevue/dialog';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import DatePicker from 'primevue/datepicker';
  import RadioButton from 'primevue/radiobutton';
  export default {
    props: {
      current_id: Number,
      tournament: {
        name: String,
        date: Date,
        is_completed: Boolean
      },
    },
    components: {
      Dialog,
      InputText,
      Button,
      DatePicker,
      RadioButton,
    },
    data() {
      return {
        visible: false,
        payload:{
          id: Number,
          tournament: {
            name: String,
            date: Date,
            is_completed: Boolean
          },
        }
      }
    },
    methods: {
      cancel() {
        this.visible=false;
      },
      createNewTournament() {
        this.$store.dispatch("tournamentList/updateTournament", {id: this.current_id, data: this.tournament});
        this.cancel();
      },
    },

  }
</script>

<template>
  <Button v-if="current_id != 0" label="Редактировать турнир" class="mx-3 w-full" @click="visible = true" />
  <Button disabled v-else label="Редактировать турнир" class="mx-3 w-full"/>
  <Dialog v-model:visible="visible" modal header="Редактирование турнира" :style="{ width: '40rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Введите нужную информацию</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Название турнира</label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="tournament.name" />
    </div>


    <div class="flex flex-wrap gap-4">
      <div>
        <label for="ingredient1" class="ml-2">Статус турнира</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="tournament.is_completed"  name="st" v-bind:value="true" />
        <label class="ml-2">Идет</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="tournament.is_completed"  name="st" v-bind:value="false" />
        <label class="ml-2">Завершен</label>
      </div>
    </div>



    <div>
      <label for="username" class="font-semibold w-24">Дата турнира</label>
      <DatePicker v-model="tournament.date" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Отмена" severity="secondary" @click="cancel"></Button>
      <Button type="button" v-if="tournament.name != ''" label="Сохранить" @click="createNewTournament"></Button>
      <Button type="button" disabled v-else label="Сохранить"></Button>
    </div>
  </Dialog>

</template>

<style scoped>
Dialog {
  padding: 20px;
}
</style>