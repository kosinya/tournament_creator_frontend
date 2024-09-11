<script>
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
export default {
  props: {
    current_id: Number,
  },
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
  <Button v-if="current_id != 0" @click="visible = true">
    <p class="font-normal">Удалить турнир</p>
  </Button>
  <Button disabled v-else>
    <p class="font-normal">Удалить турнир</p>
  </Button>
  <Dialog v-model:visible="visible" modal header="Подтвердите действие" :style="{ width: '40rem' }">
    <span class="text-surface-500 dark:text-surface-400 block mb-4">Вы уверены, что хотите удалить турнир?</span>
    <div class="flex justify-end gap-2">
      <Button @click="visible=false">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button @click="Delete" severity="danger">
        <p class="font-normal">Удалить</p>
      </Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>