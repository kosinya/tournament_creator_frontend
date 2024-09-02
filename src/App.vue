<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import Button from "primevue/button";// optional

import {tournamentListApi} from "./api/api_routes/tournament_list.js";

export default {
  data() {
    return {
      tournaments: 'fsf',
    }
  },
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
    Button,
  },
  methods: {
    getTournaments() {
      tournamentListApi.getAllTournaments().then((res)=>{
        console.log(res)
      }).catch((err)=>{

      })
      // console.log("yes")
      // this.tournaments = tournamentListApi.getAllTournaments();
      // let z = tournamentListApi.getAllTournaments();
      // console.log(z)
    }
  }
};
</script>


<template>
  <div class="container">
    <Button v-on:click="getTournaments">Получить список</Button>
    <h1>{{ tournaments }}</h1>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

</style>


