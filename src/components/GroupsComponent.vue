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
  <div class="flex flex-wrap gap-2 bg-gray-200">
    <DataTable v-for="i in list" :value="i" showGridlines sortField="score" :sortOrder="-1"
               style="min-width: fit-content; max-width: 50%;"
               class="flex flex-column border-1 bg-white border-white border-round-xl p-2" columnResizeMode="expand">
      <template #header>
        <div class="flex justify-between font-semibold">
          Группа {{i[0].group_name}}
        </div>
      </template>
      <Column header="№">
        <template #body="slotProps">
          {{ slotProps.index + 1 }}
        </template>
      </Column>
      <Column field="name" header="Участник"></Column>
      <Column field="score" header="Очки"></Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>