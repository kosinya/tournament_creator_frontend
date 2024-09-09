<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
export default {
  components: {
    Dialog,
    Button
  },

  data() {
    return{
      visible: false,
    }
  },

  methods:{
    Delete() {
      this.visible = false;
      this.$emit('Delete');
    }
  }
}
</script>

<template>
  <Button label="Удалить турнир" @click="visible = true" />
  <Dialog v-model:visible="visible" modal header="Подтвердите действие" :style="{ width: '40rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Вы уверены, что хотите удалить турнир?</span>
    <Button @click="visible=false" label="Отмена" outlined></Button>
    <Button @click="Delete" label="Удалить" severity="danger" outlined></Button>
  </Dialog>
</template>

<style scoped>

</style>