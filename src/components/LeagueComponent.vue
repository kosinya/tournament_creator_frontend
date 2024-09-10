<script>
import Listbox from "primevue/listbox";
import Button from "primevue/button";

export default {
  data() {
    return {
      selectedLeague: null,
    }
  },
  components: {
    Listbox,
    Button
  },
  computed: {
    leagues() {
      return this.$store.getters.GET_LEAGUES;
    }
  }
}
</script>

<template>
  <div class="flex flex-column justify-content-start align-items-start p-1">
    <Listbox v-model="selectedLeague" :options="leagues" optionLabel="name" class="w-full md:w-fit"
             listStyle="max-height:250px; min-width: 250px; max-width: 250px;">
    </Listbox>

    <div class="flex flex-row flex-wrap pt-2 w-">
      <div class="flex align-items-center justify-content-center mr-2">
        <Button>
          <p class="font-normal">Создать лигу</p>
        </Button>
      </div>
      <div class="flex align-items-center justify-content-center mr-2">
        <Button>
          <p class="font-normal">Удалить</p>
        </Button>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>