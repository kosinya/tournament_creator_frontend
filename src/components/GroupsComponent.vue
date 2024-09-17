<script>
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
export default {
  components: {
    DataTable,
    Column,
    ColumnGroup,
    Row,
  },
  props: {
    n_group: Number,
    players: [],
  },
  data() {
    return{
      list: {},
    }
  },
  methods: {
    parse() {
      let dictionary = {};
      let liters = ['A', "B", "C", "D", "E", "F", "G", "H"];
      for(let i = 0; i < this.n_group; i++){
        dictionary[liters[i]] = []
        this.players.forEach(function(player) {
          if (player.group_name === liters[i]){
            dictionary[liters[i]].push(player);
          }
        });

      }
      return dictionary;
    }
  },
  beforeMount() {
    this.list = this.parse()
  }
}
</script>

<template>
  <div class="flex justify-content-between flex-wrap border-transparent bg-gray-100" style="display: flex; flex-wrap: wrap;">
    <DataTable v-for="i in list" :value="i" showGridlines sortField="quantity" :sortOrder="-1" style="border: 2px solid transparent;  border-radius: 10px; padding: 3%; margin: 0; width: 50%">
      <template #header>
        <div class="flex justify-between">
          Группа {{i[0].group_name}}
        </div>
      </template>
      <Column header="№">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column field="name" header="Участник"></Column>
      <Column field="quantity" header="Набранные очки"></Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>