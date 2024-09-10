<script>
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DatePicker from 'primevue/datepicker';
import RadioButton from 'primevue/radiobutton';
export default {
  components: {
    Dialog,
    InputText,
    Button,
    DatePicker,
    RadioButton,
  },
  data() {
    return{
      visible: false,
      newTournament: {
        date: new Date(),
        is_completed: true,
        name:'',
      }
    }
  },
  methods: {
    cancel() {
      this.visible=false;
      this.newTournament.date=new Date();
      this.newTournament.is_completed=true;
      this.newTournament.name='';
    },
    createNewTournament() {
      this.$store.dispatch("tournamentList/addNewTournament", this.newTournament);
      this.cancel();
    },
  }
}
</script>

<template>
  <Button class="font-light" @click="visible = true">
    <p class="font-normal">Создать турнир</p>
  </Button>
  <Dialog v-model:visible="visible" modal header="Создание турнира" :style="{ width: '40rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Введите нужную информацию</span>
    <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Название турнира</label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="newTournament.name" />
    </div>


    <div class="flex flex-wrap gap-4">
      <div>
        <label for="ingredient1" class="ml-2">Статус турнира</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="newTournament.is_completed"  name="st" v-bind:value="true" />
        <label class="ml-2">Идет</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="newTournament.is_completed"  name="st" v-bind:value="false" />
        <label class="ml-2">Завершен</label>
      </div>
    </div>



    <div>
      <label for="username" class="font-semibold w-24">Дата турнира</label>
      <DatePicker v-model="newTournament.date" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Отмена" severity="secondary" @click="cancel"></Button>
      <Button type="button" v-if="newTournament.name != ''" label="Сохранить" @click="createNewTournament"></Button>
      <Button type="button" disabled v-else label="Сохранить"></Button>
    </div>
  </Dialog>
</template>

<style scoped>
Dialog {
  padding: 20px;
}

</style>