<script>
export default {
  data() {
    return {

    }
  },
  computed: {
    currentLeague() {
      return this.$store.getters['GET_CURRENT_LEAGUE']
    }
  }
}
</script>

<template>
  <div class="flex justify-content-start align-items-start h-full w-full pb-3">
    <div class="flex flex-column mx-3 p-3 bg-gray-100 border-gray-100 border-round-xl h-full w-full">
      <label v-if="currentLeague != null" class="text-xl font-semibold mb-2">{{currentLeague.name}}</label>
    </div>
  </div>
</template>

<style scoped>

</style>