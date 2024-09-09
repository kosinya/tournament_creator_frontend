<script>
import Header from './components/header.vue'
import InputNumber from "primevue/inputnumber";
import Button from 'primevue/button'
import Listbox from "primevue/listbox";

export default {
  data() {
    return {
      selectedLeague: null,
      t_id: null,
    }
  },
  components: {
    Header,
    InputNumber,
    Button,
    Listbox,
  },
  methods: {
    getLeagues() {
      this.$store.dispatch('getAllLeagues', this.t_id)
    }
  },
  computed: {
    leagues() {
      return this.$store.getters.GET_LEAGUES;
    }
  }
}

</script>

<template>
  <Header></Header>
  <div class="flex w-full h-screen justify-content-center align-items-center bg-transparent bg-gray-300">
    <div class="flex flex-column px-5">
      <InputNumber v-model="t_id" class="my-2"></InputNumber>
      <Button class="my-2" @click="getLeagues">Получить спиоск лиг</Button>
    </div>

    <Listbox v-model="selectedLeague" :options="leagues" optionLabel="name" class="w-full md:w-56 mx-5" listStyle="max-height:250px">
    </Listbox>

    <div class="flex flex-column flex-wrap bg-white border-round-lg justify-content-center py-5" style="max-width: 500px">
      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>
      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>
      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>
      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>
      <div class="flex align-items-center justify-content-center bg-gray-200 font-bold m-2 border-round" style="min-width: 200px; min-height: 100px">1</div>
    </div>
  </div>

</template>

<style scoped>

  .container {
    display: flex;
    height: 100vh;
    width: 100vh;
  }

</style>


