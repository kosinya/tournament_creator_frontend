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
import GroupMatches from "./GroupMatches.vue";
import PlayoffGrid from "./PlayoffGrid.vue";
import Toast from 'primevue/toast';
import instance from "../api/instance.js";
import Dialog from "primevue/dialog";
import InputNumber from 'primevue/inputnumber';
import { useToast } from 'primevue/usetoast';

export default {
  data() {
    return {
      label: "Название лиги",
      disabled: false,
      visible: false,
      groups: null,
    }
  },
  setup() {
    const toast = useToast();
    const showError = (err) => {
      toast.add({ severity: 'warn', summary: 'Ошибка', detail: err, life: 3000 });
    };
    return {showError}
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
    DrawComponent,
    GroupMatches,
    PlayoffGrid,
    Toast,
    Dialog,
    InputNumber
  },
  computed: {
    currentLeague() {
      return this.$store.getters['GET_CURRENT_LEAGUE']
    },
    groups() {
      return !!this.$store.getters["GET_GROUPS"].length
    },
  },
  watch: {
    currentLeague(value) {
      if (value === null) {
        this.label = "Название лиги";
        this.disabled = true;
      } else {
        this.label = value.name;
        console.log(value.group_stage_completed)
        this.disabled = value.group_stage_completed !== false;
      }
    }
  },
  methods: {
    parse(data, n_groups) {
      if (data === null || data === undefined) {
        return {}
      }
      let dictionary = {};
      let liters = ['A', "B", "C", "D", "E", "F", "G", "H"];
      for(let i = 0; i < n_groups; i++) {
        dictionary[liters[i]] = [];
        for(let j = 0; j < data.length; j++) {
          if (data[j].group_name === liters[i]) {
            dictionary[liters[i]].push(data[j])
          }
        }
      }
      return dictionary;
    },
    complete_the_group_stage() {
      instance.post(`/leagues/${this.currentLeague.league_id}/create_playoff`).then(res => {
        this.$store.dispatch('playoff/getPlayoffs', this.currentLeague.league_id);
        this.disabled = true;
      }).catch(err => {
        this.showError(err.response.data.detail);
      })
    },
    conflict_resolution() {
      this.visible = true;
      this.groups = this.parse(this.$store.getters["GET_GROUPS"], this.currentLeague.n_groups);
    },
    cancel() {
      this.$store.dispatch("setGroups", this.currentLeague.league_id);
      this.visible = false;
    },
    save() {
      const groups = this.$store.getters["GET_GROUPS"]
      for (const group of groups) {
        let flag = false
        instance.post(`/groups?group_id=${group.id}&place=${group.place}`).then(res => {
        }).catch(err => {
          this.showError(err.response.data.detail);
          flag = true
        });
        this.cancel()
      }
    },
    refresh() {
      this.$store.dispatch("setGroups", this.currentLeague.league_id);
    }
  }
}
</script>

<template>
  <div class="flex justify-content-start align-items-start h-full w-full pb-3">
    <div class="flex flex-column mx-3 p-3 bg-gray-200 border-gray-200 border-round-xl h-full w-full">

      <div class="text-xl font-semibold mb-2">{{label}}</div>

      <Stepper value="1" class="flex flex-column h-full overflow-y-scroll">
        <StepList class="overflow-visible">
          <Step value="1">Жеребьевка</Step>
          <Step value="2">Групоовой этап</Step>
          <Step value="3">Плей-офф</Step>
        </StepList>
        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="flex h-48">
              <div class="border-0 dark:border-surface-700 rounded bg-gray-200 flex-auto flex justify-center items-center font-medium">
                <DrawComponent v-if="currentLeague" v-bind:activateCallback="activateCallback"/>
              </div>
            </div>
            <div class="flex pt-6 justify-end bg-gray-200">
              <Button label="Следующий этап" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="flex flex-col min-h-0 h-full w-full bg-gray-200">

              <Splitter class="bg-transparent flex p-2 min-h-full min-h-0 w-full border-transparent">
                <SplitterPanel class="flex items-center justify-center " :size="60">
                  <ScrollPanel>
                    <GroupsComponent v-if="groups" />
                  </ScrollPanel>
                </SplitterPanel>
                <SplitterPanel class="flex items-center justify-center">
                  <GroupMatches />
                </SplitterPanel>
              </Splitter>

            </div>

            <div class="flex gap-2 bg-gray-200">
              <Button v-bind:disabled="disabled" @click="conflict_resolution">Разрешить конфликтные ситуации</Button>
              <Button v-bind:disabled="disabled" @click="complete_the_group_stage">Завершить групповой этап</Button>
              <Button v-bind:disabled="disabled" @click="refresh" icon="pi pi-refresh" severity="success" aria-label="refresh" />
            </div>

            <Dialog v-model:visible="visible" modal header="Разрешение конфликтных ситуаций" :style="{ width: '20%' }"
                    class="flex border-round-xl bg-gray-200">
              <div v-for="key in Object.keys(this.groups)" class="flex flex-column">
                <div class="font-semibold mt-3">Группа {{key}}</div>

                <div v-for="g in this.groups[key]">
                  <div class="flex flex-row align-items-center gap-1 justify-content-end">
                    <div class="flex" style="min-width: 50%; max-width: 65%">{{g.surname + ' ' + g.name[0] + '.'}}</div>
                    <InputNumber class="flex" v-model="g.place" inputId="minmax" :min="1"
                                 :max="this.groups[key].length" fluid
                                 style="width: 30%"/>
                  </div>
                </div>
              </div>
              <div class="flex justify-end gap-2 mt-5">
                <Button type="button" severity="secondary" @click="cancel" class="border-round-lg">
                  <p class="font-normal">Отмена</p>
                </Button>
                <Button type="button" @click="save" class="border-round-lg">
                  <p class="font-normal">Сохранить результат</p>
                </Button>
              </div>
            </Dialog>

            <div class="flex pt-3 gap-3 justify-between bg-gray-200">
              <div class="flex align-items-center justify-content-center mr-2">
                <Button label="Прошлый этап" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')"/>
              </div>
              <div class="flex align-items-center justify-content-center mr-2">
                <Button label="Следующий этап" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
              </div>
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="3">

            <PlayoffGrid />

            <div class="pt-6 bg-gray-200">
              <Button label="Прошлый этап" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>

    </div>
  </div>
</template>

<style scoped>

</style>