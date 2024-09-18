<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import AddPlayer from "./AddPlayer.vue";
import DeletePlayer from "./DeletePlayer.vue";
export default {
  components: {
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
  <DataTable v-model:selection="selectedPlayer" :value="playersList" selectionMode="single" datakey="player_id"
             :metaKeySelection="true" tableStyle="min-width:30rem;">
    <Column field="surname" header="Фамилия"></Column>
    <Column field="name" header="Имя"></Column>
    <Column field="patronymic" header="Отчество"></Column>
    <Column field="sex" header="Пол"></Column>
    <Column field="rating" header="Рейтинг"></Column>
  </DataTable>
  <AddPlayer />
  <DeletePlayer v-bind:selected="selectedPlayer" @Delete="deletePlayer()"/>
</template>

<style scoped>

</style>