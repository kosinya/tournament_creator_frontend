<script>
import Header from './components/header.vue'
import InputNumber from "primevue/inputnumber";
import Button from 'primevue/button'

export default {
  data() {
    return {}
  },
  components: {
    Header,
    InputNumber,
    Button
  }
}

</script>

<template>
  <Header></Header>

  <div class="container">
    <div class="flex flex-row align-items-center justify-content-center bg-transparent">
      <div class="flex flex-column justify-content-center bg-transparent">
        <InputNumber class="" placeholder="Введите id"></InputNumber>
        <Button>Поулить список лиг</Button>
      </div>
    </div>
  </div>

</template>

<style scoped>
  .container {
    display: flex;
    height: 100vh;
    width: 100%;
  }
</style>


