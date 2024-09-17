<script>
import GroupsComponent from "./GroupsComponent.vue";
import ScrollPanel from 'primevue/scrollpanel';
export default {
  data() {
    return {
      players: [
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          quantity: 7,
          group_name: 'B',
        },
        {
          code:'dffbf',
          name:'better',
          category:'Fitness',
          quantity: 10,
          group_name: 'A',
        },
        {
          code:'dffbf',
          name:'cool',
          category:'Fitness',
          quantity: 8,
          group_name: 'E',
        },
        {
          code:'dffbf',
          name:'hey',
          category:'Fitness',
          quantity: 4,
          group_name: 'F',
        },
        {
          code:'dffbf',
          name:'hey',
          category:'Fitness',
          quantity: 4,
          group_name: 'G',
        },
        {
          code:'dffbf',
          name:'hey',
          category:'Fitness',
          quantity: 4,
          group_name: 'C',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          quantity: 7,
          group_name: 'D',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          quantity: 7,
          group_name: 'D',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          quantity: 7,
          group_name: 'D',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          quantity: 7,
          group_name: 'D',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          quantity: 7,
          group_name: 'H',
        },
        {
          code:'dffbf',
          name:'dfbdb',
          category:'Fitness',
          quantity: 7,
          group_name: 'B',
        },
      ],
    }
  },
  components: {
    GroupsComponent,
    ScrollPanel
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
      <ScrollPanel class="max-h-full p-3">
        <GroupsComponent v-bind:players="this.players" v-bind:n_group=8 />
      </ScrollPanel>
    </div>
  </div>
</template>

<style scoped>

</style>