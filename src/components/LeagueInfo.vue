<script>
import GroupsComponent from "./GroupsComponent.vue";
import ScrollPanel from 'primevue/scrollpanel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';

export default {
  data() {
    return {
      label: "Название лиги",
      players: [
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          score: 7,
          group_name: 'B',
        },
        {
          code:'dffbf',
          name:'better',
          category:'Fitness',
          score: 10,
          group_name: 'A',
        },
        {
          code:'dffbf',
          name:'cool',
          category:'Fitness',
          score: 8,
          group_name: 'A',
        },
        {
          code:'dffbf',
          name:'hey',
          category:'Fitness',
          score: 4,
          group_name: 'A',
        },
        {
          code:'dffbf',
          name:'hey',
          category:'Fitness',
          score: 4,
          group_name: 'B',
        },
        {
          code:'dffbf',
          name:'hey',
          category:'Fitness',
          score: 4,
          group_name: 'C',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          score: 7,
          group_name: 'B',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          score: 7,
          group_name: 'C',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          score: 7,
          group_name: 'C',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          score: 7,
          group_name: 'D',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          score: 7,
          group_name: 'D',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          score: 7,
          group_name: 'D',
        },
      ],
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
    <div class="flex flex-column mx-3 p-3 bg-gray-100 border-gray-100 border-round-xl h-full w-full">

      <div class="font-semibold pb-2">{{label}}</div>
      <Splitter class="bg-transparent flex p-3 h-full min-h-0">
        <SplitterPanel class="flex items-center justify-center">
          <ScrollPanel>
            <GroupsComponent v-bind:players="this.players" v-bind:n_group=4 />
          </ScrollPanel>
        </SplitterPanel>
        <SplitterPanel class="flex items-center justify-center"></SplitterPanel>
      </Splitter>

    </div>
  </div>
</template>

<style scoped>

</style>