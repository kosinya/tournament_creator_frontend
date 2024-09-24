<script>
import GroupsComponent from "./GroupsComponent.vue";
import ScrollPanel from 'primevue/scrollpanel';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import Stepper from 'primevue/stepper';
import StepList from 'primevue/steplist';
import StepPanels from 'primevue/steppanels';
import StepItem from 'primevue/stepitem';
import Step from 'primevue/step';
import StepPanel from 'primevue/steppanel';
import Button  from "primevue/button";
import DrawComponent from "./DrawComponent.vue";


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
    SplitterPanel,
    Stepper,
    StepList,
    StepPanel,
    StepItem,
    Step,
    StepPanels,
    Button,
    DrawComponent
  },
  computed: {
    currentLeague() {
      return this.$store.getters['GET_CURRENT_LEAGUE']
    },
    groups() {
      return !!this.$store.getters["GET_GROUPS"].length
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

      <div class="text-xl font-semibold mb-2">{{label}}</div>

      <Stepper value="1" class="flex flex-column h-full overflow-y-scroll">
        <StepList>
          <Step value="1">Жеребьевка</Step>
          <Step value="2">Групоовой этап</Step>
          <Step value="3">Плей-офф</Step>
        </StepList>
        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="flex h-48">
              <div class="border-0 dark:border-surface-700 rounded bg-gray-200 flex-auto flex justify-center items-center font-medium">
                <DrawComponent v-if="currentLeague"/>
              </div>
            </div>
            <div class="flex pt-6 justify-end bg-gray-200">
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="flex flex-col min-h-0 h-full w-full bg-gray-200">

                <Splitter class="bg-transparent flex p-2 min-h-full min-h-0 border-transparent">
                  <SplitterPanel class="flex items-center justify-center">
                    <ScrollPanel>
                      <GroupsComponent v-if="groups" />
                    </ScrollPanel>
                  </SplitterPanel>
                  <SplitterPanel class="flex items-center justify-center">   Матчи ехуууу</SplitterPanel>
                </Splitter>

            </div>
            <div class="flex pt-3 justify-between bg-gray-200">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
              <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="3">
            <div class="flex flex-col h-48">
              <div class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">Content III</div>
            </div>
            <div class="pt-6">
              <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>

    </div>
  </div>
</template>

<style scoped>

</style>