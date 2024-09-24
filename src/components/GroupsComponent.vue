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
  data() {
    return{
      list: {},
    }
  },
  methods: {
    parse(data, n_groups) {
      console.log(n_groups)
      let dictionary = {};
      let liters = ['A', "B", "C", "D", "E", "F", "G", "H"];
      for(let i = 0; i < n_groups; i++) {
        dictionary[liters[i]] = []
        for(let j = 0; j < 12; j++) {
          if (data[j].group_name === liters[i]) {
            let player = data[j];
            player["FIO"] = data[j].surname + ' ' + data[j].name[0] + '.';
            dictionary[liters[i]].push(player)
          }
        }
      }
      return dictionary;
    }
  },
  computed: {
    currentLeague() {
      return this.$store.getters["GET_CURRENT_LEAGUE"];
    },
    allGroups() {
      if (this.currentLeague === null) {
        return {}
      }
      let data = this.$store.getters["GET_GROUPS"];
      return this.parse(data, this.currentLeague.n_groups);
    }
  },
}
</script>

<template>
  <div class="flex flex-wrap gap-2 bg-gray-200">
    <DataTable v-for="i in allGroups" :value="i" showGridlines sortField="score" :sortOrder="-1"
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
      <Column field="FIO" header="Участник"></Column>
      <Column field="score" header="Очки"></Column>
    </DataTable>
  </div>
</template>

<style scoped>

</style>