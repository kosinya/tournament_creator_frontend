<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Button from "primevue/button";
import NewTournament from "./CreateTournamentForm.vue";
import ConfirmDelete from "./ConfirmDelete.vue";
import EditTournament from "./EditTournament.vue";


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
    ConfirmDelete,
    DataTable,
    Column,
    Button,
    Row,
    ColumnGroup,
    NewTournament,
    EditTournament
  },

  methods: {
    deleteTournament() {
      this.$store.dispatch("tournamentList/deleteTournament", this.current_id);
      this.current_id = 0;
      this.$store.dispatch("tournamentList/setCurrentTournamentId", null);
      this.tournament.name="";
    },
    onRowSelected(event) {
      this.current_id = event.data.id;
      this.$store.dispatch("tournamentList/setCurrentTournamentId", event.data.id);
      this.tournament.name = event.data.name;
      this.tournament.date = event.data.date;
      this.tournament.is_completed = event.data.is_completed;
      this.$store.dispatch('getAllLeagues', event.data.id);
      // console.log(this.tournament);
    },
    onRowUnselected(event) {
      this.current_id = null;
      this.$store.dispatch("tournamentList/setCurrentTournamentId", null);
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
  <div class="flex flex-column justify-content-start align-items-start p-1">

    <DataTable v-model:selection="selectedTournament" :value="tournamentList" selectionMode="single" datakey="id"
               :metaKeySelection="true" @rowSelect="onRowSelected" @rowUnselect="onRowUnselected"
               resizableColumns columnResizeMode="expand" tableStyle="min-width:30rem;">
      <Column field="name" header="Имя турнира"></Column>
      <Column field="date" header="Дата"></Column>
      <Column field="is_completed" header="Статус">
        <template>

        </template>
      </Column>
    </DataTable>

    <div class="flex flex-row flex-wrap pt-2">
      <div class="flex align-items-center justify-content-center mr-2">
        <NewTournament/>
      </div>
      <div class="flex align-items-center justify-content-center mr-2">
        <ConfirmDelete v-bind:current_id="current_id" @Delete="deleteTournament()"></ConfirmDelete>
      </div>
    </div>


<!--<EditTournament v-bind:tournament="tournament" :current_id="current_id"/>-->

  </div>
</template>

<style scoped>
</style>
