<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Button from "primevue/button";
import NewTournament from "./components/Create_tournament_form.vue";
import confirmPopup from "./components/ConfirmPopup.vue";
import {tournamentApi} from "./api/api_routes/tournament_list.js";


export default {
  data() {
    return {
      selectedTournament: null,
      current_id: 0,
      newTournament: {
        name: "test",
        date: new Date(),
        is_completed: true
      },
    }
  },

  components: {
    DataTable,
    Column,
    Button,
    Row,
    ColumnGroup,
    NewTournament,
    confirmPopup
  },

  methods: {
    createNewTournament() {
      this.$store.dispatch("tournamentList/addNewTournament", this.newTournament);
    },
    deleteTournament() {
      this.$store.dispatch("tournamentList/deleteTournament", this.current_id);
    },
    onRowSelected(event) {
      console.log(event.data.id);
      this.current_id = event.data.id;
    },
    onRowUnselected(event) {
      this.current_id = null;
    },
  },

  mounted() {
    this.$store.dispatch("tournamentList/getAllTournaments");
  },

  computed: {
    tournamentList() {
      return this.$store.getters['tournamentList/tournamentList'];
    }
  }
};
</script>


<template>
  <div class="container">

    <div class="tournament-container">

      <DataTable v-model:selection="selectedTournament" :value="tournamentList" selectionMode="single" datakey="id" :metaKeySelection="true"
                 @rowSelect="onRowSelected" @rowUnselect="onRowUnselected" tableStyle="min-width: 50rem">
        <Column field="name" header="Имя турнира"></Column>
        <Column field="date" header="Дата"></Column>
        <Column field="is_completed" header="Статус"></Column>
      </DataTable>

      <div class="button-container">
        <NewTournament/>
        <confirmPopup @Delete="deleteTournament()"></confirmPopup>
        <Button class="btn" v-on:click="createNewTournament">Создать</Button>
      </div>

    </div>
  </div>
</template>

<style scoped>

.tournament-container {
  display: flex;
  flex-direction: column;
  justify-content: normal;
  align-items: flex-start;
  height: 100vh;
  width: 25%;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
}

.button-container {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: flex-start;
  padding-bottom: 5px;
  padding-top: 5px;
}

.btn {
  margin-left: 5px;
}
</style>


