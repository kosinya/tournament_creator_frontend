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
      icon: "pi pi-angle-double-left",
      visible: true
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
      this.$store.dispatch("tournamentList/deleteTournament", this.selectedTournament.tournament_id);
      this.selectedTournament = null;
    },
    onRowSelected(event) {
      this.$store.dispatch('getAllLeagues', event.data.tournament_id)
    },
    folding() {
      this.visible = !this.visible;

      if (this.visible === false) {
        this.icon = "pi pi-angle-double-right"
      } else {
        this.icon = "pi pi-angle-double-left"
      }
      //console.log(this.icon)
    }
  },
  mounted() {
    this.$store.dispatch("tournamentList/getAllTournaments");
  },
  computed: {
    tournamentList() {
      return this.$store.getters['tournamentList/tournamentList'];
    }
  },
  watch: {
    selectedTournament(value) {
      if (value != null) {
        this.$store.dispatch("tournamentList/setCurrentTournamentId", value.tournament_id);
      } else {
        this.$store.dispatch("tournamentList/setCurrentTournamentId", null);
      }
    }
  }
};

</script>


<template>
  <div class="flex justify-content-start align-items-start">
    <div class="flex flex-column ml-3 p-3 bg-gray-200 border-gray-200 border-round-xl">
      <Button class="mb-1 border-transparent text-gray-900 bg-transparent" @click="folding" v-bind:icon="this.icon" outlined aria-label="Filter" />
      <DataTable v-model:selection="selectedTournament" :value="tournamentList" selectionMode="single" datakey="id"
                 v-show="visible" :metaKeySelection="true" @rowSelect="onRowSelected" scrollable scrollHeight="flex"
                 columnResizeMode="expand" tableStyle="min-width:30rem;">
        <Column field="name" header="Название турнира"></Column>
        <Column field="date" header="Дата"></Column>
        <Column field="is_completed" header="Статус"></Column>
      </DataTable>

      <div class="flex flex-row flex-wrap mt-3" v-if="visible">
        <div class="flex align-items-center justify-content-center mr-2">
          <NewTournament/>
        </div>
        <div class="flex align-items-center justify-content-center mr-2">
          <ConfirmDelete v-bind:selected="selectedTournament" @Delete="deleteTournament()"></ConfirmDelete>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>
