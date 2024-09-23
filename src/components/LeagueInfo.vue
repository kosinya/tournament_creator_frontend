<script>
import GroupsComponent from "./GroupsComponent.vue";
import ScrollPanel from 'primevue/scrollpanel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

export default {
  data() {
    return {
      label: "Название лиги",
    }
  },
  components: {
    GroupsComponent,
    ScrollPanel,
    Splitter,
    SplitterPanel
  },
  computed: {
    currentLeague() {
      return this.$store.getters['GET_CURRENT_LEAGUE']
    }
  },
  watch: {
    currentLeague(value) {
      if (value === null) {
        this.label = "Название лиги";
      } else {
        this.label = value.name;
      }
    }
  }
}
</script>

<template>
  <div class="flex justify-content-start align-items-start h-full w-full pb-3">
    <div class="flex flex-column mx-3 p-3 bg-gray-200 border-gray-200 border-round-xl h-full w-full">

      <div class="text-xl font-semibold ">{{label}}</div>
      <Splitter class="bg-transparent flex p-3 h-full min-h-0 border-transparent">-->
        <SplitterPanel class="flex items-center justify-center">
          <ScrollPanel>
            <GroupsComponent v-if="currentLeague !== null"/>
          </ScrollPanel>
        </SplitterPanel>
        <SplitterPanel class="flex items-center justify-center">   Что-то</SplitterPanel>
      </Splitter>

    </div>
  </div>
</template>

<style scoped>

</style>