<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  data() {
    return {
      selectedDepartment: null,
    }
  },
  components: {
    DataTable,
    Column,
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch("getAllDepartments");
  },
  computed: {
    allDepartments() {
      return this.$store.getters['GET_DEPARTMENTS'];
    }
  }
}
</script>

<template>
  <div class="flex w-full h-screen justify-content-start align-items-start">
    <div class="flex flex-column ml-3 p-3 bg-gray-100 border-gray-100 border-round-xl">
      <DataTable v-model:selection="selectedDepartment" :value="allDepartments" selectionMode="single" datakey="id"
                 v-show="true" :metaKeySelection="true" columnResizeMode="expand" tableStyle="min-width:60rem;">
        <Column field="id" header="Код"></Column>
        <Column field="name" header="Подразделение"></Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>

</style>