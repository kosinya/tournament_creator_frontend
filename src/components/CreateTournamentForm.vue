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

  <Dialog v-model:visible="visible" modal header="Создание турнира" :style="{ width: '30rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Введите нужную информацию.</span>
    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="username" class="font-semibold w-24">Название турнира</label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="newTournament.name" />
    </div>

    <div class="flex flex-row flex-wrap justify-content-between gap-2 mb-4">
      <label><p class="font-semibold">Статус турнира</p></label>
      <div class="flex items-center">
        <RadioButton v-model="newTournament.is_completed"  name="st" v-bind:value="true" />
        <label class="ml-2">Идет</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="newTournament.is_completed"  name="st" v-bind:value="false" />
        <label class="ml-2">Завершен</label>
      </div>
    </div>



    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="username" class="font-semibold w-24">Дата регистрации</label>
      <DatePicker v-model="newTournament.date" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" @click="cancel">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" v-if="newTournament.name != ''" @click="createNewTournament">
        <p class="font-normal">Сохранить</p>
      </Button>
      <Button type="button" disabled v-else>
        <p class="font-normal">Сохранить</p>
      </Button>
    </div>
  </Dialog>
</template>

<style scoped>
Dialog {
  padding: 20px;
}

</style>