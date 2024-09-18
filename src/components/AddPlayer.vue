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
      newPlayer: {
        surname:'',
        name:'',
        patronymic:'-',
        sex:'Муж.',
        department_id: null,
      }
    }
  },
  methods: {
    cancel() {
      this.visible = false;
      this.newPlayer.surname='';
      this.newPlayer.name='';
      this.newPlayer.patronymic='-';
      this.newPlayer.sex='Муж.';
      this.newPlayer.department_id=null;
    },
    createNewPlayer() {
      this.$store.dispatch("player/addNewPlayer", this.newPlayer);
      this.cancel();
    }
  }
}
</script>

<template>
  <Button class="font-light border-round-lg"  @click="visible = true">
    <p class="font-normal">Добавить участника</p>
  </Button>

  <Dialog v-model:visible="visible" modal header="Создание турнира" :style="{ width: '30rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Введите нужную информацию.</span>
    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="username" class="font-semibold w-24">Фамилия</label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="newPlayer.surname" />
    </div>
    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="username" class="font-semibold w-24">Имя</label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="newPlayer.name" />
    </div>
    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="username" class="font-semibold w-24">Отчество</label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="newPlayer.patronymic" />
    </div>

    <div class="flex flex-column items-center gap-2 mb-4">
      <label for="username" class="font-semibold w-24">Подразделение</label>
      <InputText id="username" class="flex-auto" autocomplete="off" v-model="newPlayer.department_id" />
    </div>

    <div class="flex flex-row flex-wrap justify-content-between gap-2 mb-4">
      <label><p class="font-semibold">Пол участника</p></label>
      <div class="flex items-center">
        <RadioButton v-model="newPlayer.sex"  name="st" value="Муж." />
        <label class="ml-2">муж</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="newPlayer.sex"  name="st" value="Жен." />
        <label class="ml-2">жен</label>
      </div>
    </div>

    <div class="flex justify-end gap-2">
      <Button type="button" severity="secondary" class="border-round-lg" @click="cancel">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" class="border-round-lg" v-if="(newPlayer.name != '')&&(newPlayer.surname != '')&&(newPlayer.department_id != null)" @click="createNewPlayer">
        <p class="font-normal">Сохранить</p>
      </Button>
      <Button type="button" class="border-round-lg" disabled v-else>
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