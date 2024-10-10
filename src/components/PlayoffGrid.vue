<script>
import OrganizationChart from 'primevue/organizationchart';
import Select from 'primevue/select';

export default {
  data() {
    return {
      selectedPlayoff: null,
      selection: null,
    }
  },
  components: {
    OrganizationChart,
    Select
  },
  computed: {
    playoffs() {
      return this.$store.getters["playoff/GET_PLAYOFF"];
    },
    grid() {
      return this.$store.getters["playoff/GET_GRID"];
    }
  },
  watch: {
    selectedPlayoff(value) {
      if (value !== null) {
        this.$store.dispatch("playoff/getGrid", this.selectedPlayoff.playoff_id)
      }
    }
  }

}
</script>

<template>
  <Select v-model="selectedPlayoff" :options="playoffs" optionLabel="name" placeholder="Выберите плей-офф"
          class="w-full md:w-56" />

  <OrganizationChart v-model:selectionKeys="selection" :value="this.grid" v-if="selectedPlayoff"
                     selectionMode="single" class="bg-gray-200 pt-3">
    <template #default="slotProps">
      <div class="flex">
        <div v-if="slotProps.node.player1_id !== -1" class="flex flex-column">
          <span class="flex justify-content-start border-1 border-gray-900 px-2 py-1 border-bottom-none">
            {{slotProps.node.player1_surname + ' ' + slotProps.node.player1_name}}</span>
          <span class="flex justify-content-start border-1 border-gray-900 px-2 py-1">
            {{slotProps.node.player2_surname + ' ' + slotProps.node.player2_name}}</span>
        </div>
        <div class="flex flex-column " v-if="slotProps.node.player1_id !== -1">
          <span class="flex justify-content-start align-items-center border-1 border-gray-900 px-2 py-1 border-left-none h-full">
            {{slotProps.node.score}}
          </span>
        </div>
      </div>
    </template>
  </OrganizationChart>

</template>

<style scoped>

</style>