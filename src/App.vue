<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from "primevue/button";
import Checkbox from 'primevue/checkbox';

import {tournamentApi} from "./api/api_routes/tournament_list.js";

export default {
  data() {
    return {
      tournaments: null,
      newTournament: {
        name: 'УРааааааа',
        date: new Date(),
        is_completed: false
      },
    }
  },
  components: {
    DataTable,
    Column,
    Button,
    Checkbox,
  },
  methods: {
    getTournaments() {
      tournamentApi.getAllTournaments().then((res)=>{
        this.tournaments = res.data;
      })

      tournamentApi.createTournament(this.newTournament).then((res)=>{
        console.log(res);
      })
    },
    deleteTournament(id) {
      tournamentApi.deleteTournament(id).then((res)=>{})
    }
  }
};
</script>


<template>
  <div class="container">
    <div class="tournament-container">
      <DataTable :value=tournaments tableStyle="min-width: 50 rem">
        <Column field="name" header="Имя турнира"></Column>
        <Column field="date" header="Дата"></Column>
        <Column field="is_completed" header="Статус"></Column>
      </DataTable>
      <Button class="margin-5" v-on:click="getTournaments">Получить список</Button>
      <Button class="margin-5" v-on:click="deleteTournament(1)">Удалить</Button>
    </div>
  </div>
</template>

<style scoped>

.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100vh;
  width: 25%;
}

.container {
  display: block;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
}

.margin-5 {
  margin: 5px;
}

</style>


