<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Button from "primevue/button";

import {tournamentApi} from "./api/api_routes/tournament_list.js";

export default {
  data() {
    return {
      tournaments: null,
      selectedTournament: null,
      current_id: 0,
      newTournament: {
        name: "test",
        date: new Date(),
        is_completed: false
      },
    }
  },

  components: {
    DataTable,
    Column,
    Button,
    Row,
    ColumnGroup,
  },

  methods: {
    createNewTournament() {
      tournamentApi.createTournament(this.newTournament).then((res)=>{
        console.log(res);
      })
    },
    getTournaments() {
      tournamentApi.getAllTournaments().then((res)=>{
        this.tournaments = res.data;
      })
    },
    deleteTournament() {
      tournamentApi.deleteTournament(this.current_id).then((res)=>{})
    },
    onRowSelected(event) {
      console.log(event.data.id);
      this.current_id = event.data.id;
    }
  },

  mounted() {
    this.$store.dispatch("tournamentList/getAllTournaments");
  },

  computed: {
    tournamentList() {
      return this.$store.getters["tournamentList/tournamentList"];
    }
  }
};
</script>


<template>
  <div class="container">
    <div class="tournament-container">
      <DataTable v-model:selection="selectedTournament" :value="tournamentList" selectionMode="single" datakey="id" :metaKeySelection="true"
                 @rowSelect="onRowSelected" tableStyle="min-width: 50rem">
        <Column field="name" header="Имя турнира"></Column>
        <Column field="date" header="Дата"></Column>
        <Column field="is_completed" header="Статус"></Column>
      </DataTable>
      <Button class="margin-5" v-on:click="deleteTournament">Удалить</Button>
      <Button class="margin-5" v-on:click="createNewTournament">Добавить нового</Button>
    </div>
  </div>
</template>

<style scoped>

.tournament-container {
  display: flex;
  flex-direction: column;
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


