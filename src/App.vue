<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Button from "primevue/button";
import NewTournament from "./components/Create_tournament_form.vue";
import confirmPopup from "./components/ConfirmPopup.vue";
import EditTournament from "./components/edit_tournament.vue";
import {tournamentApi} from "./api/api_routes/tournament_list.js";


export default {
  data() {
    return {
      selectedTournament: null,
      current_id: 0,
      tournament: {
        name: "",
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
    NewTournament,
    confirmPopup,
    EditTournament
  },

  methods: {
    deleteTournament() {
      this.$store.dispatch("tournamentList/deleteTournament", this.current_id);
      this.current_id = 0;
      this.tournament.name="";
    },
    onRowSelected(event) {
      //console.log(event.data.id);
      this.current_id = event.data.id;
      this.tournament.name = event.data.name;
      this.tournament.date = event.data.date;
      this.tournament.is_completed = event.data.is_completed;
      console.log(this.tournament);
    },
    onRowUnselected(event) {
      this.current_id = null;
      this.tournament.name="";
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
                 @rowSelect="onRowSelected" @rowUnselect="onRowUnselected" scrollable scrolHeight="400px" tableStyle="min-width: 50rem">
        <Column field="name" header="Имя турнира"></Column>
        <Column field="date" header="Дата"></Column>
        <Column field="is_completed" header="Статус"></Column>
      </DataTable>

      <div class="button-container">
        <NewTournament/>
        <confirmPopup v-bind:current_id="current_id" @Delete="deleteTournament()"></confirmPopup>
        <EditTournament v-bind:tournament="tournament" :current_id="current_id"/>
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


