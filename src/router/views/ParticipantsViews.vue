<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import AddPlayer from "../../components/AddPlayer.vue";
import DeletePlayer from "../../components/DeletePlayer.vue";
import CreateDepartment from "../../components/CreateDepartment.vue";
import DeleteDepartment from "../../components/DeleteDepartment.vue";
export default {
  components: {
    DeleteDepartment, CreateDepartment,
    AddPlayer,
    DataTable,
    Column,
    ColumnGroup,
    Row,
    DeletePlayer
  },
  data(){
    return{
      selectedPlayer: null
    }
  },
  mounted() {
    this.$store.dispatch("player/getAllPlayers");
  },
  computed: {
    playersList() {
      return this.$store.getters['player/GET_PLAYERS'];
    }
  },
  methods: {
    deletePlayer() {
      this.$store.dispatch("player/deletePlayer", this.selectedPlayer.player_id);
      this.selectedPlayer = null;
    },
  }
}
</script>

<template>
  <div class="flex w-full h-screen justify-content-start align-items-start">
    <div class="flex flex-column ml-3 p-3 bg-gray-200 border-gray-200 border-round-xl">
      <DataTable v-model:selection="selectedPlayer" :value="playersList" selectionMode="single" datakey="player_id"
                 :metaKeySelection="true" tableStyle="min-width:60rem; max-width: full">
        <Column field="surname" header="Фамилия"></Column>
        <Column field="name" header="Имя"></Column>
        <Column field="patronymic" header="Отчество"></Column>
        <Column field="sex" header="Пол"></Column>
        <Column field="rating" header="Рейтинг"></Column>
      </DataTable>

      <div class="flex flex-row flex-wrap mt-3">
        <div class="flex align-items-center justify-content-center mr-2">
          <AddPlayer />
        </div>
        <div class="flex align-items-center justify-content-center mr-2">
          <DeletePlayer v-bind:selected="selectedPlayer" @Delete="deletePlayer()"/>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>