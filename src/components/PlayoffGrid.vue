<script>
import OrganizationChart from 'primevue/organizationchart';
import Select from 'primevue/select';
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputMask from 'primevue/inputmask';
import InputText from "primevue/inputtext";
import {matchApi} from "../api/api_routes/match.js";
import instance from "../api/instance.js";
import Toast from 'primevue/toast';
import {useToast} from "primevue/usetoast";

export default {
  data() {
    return {
      selectedPlayoff: null,
      selection: null,
      selectedMatch: null,
      score: "0-0",
      score_by_batch: ["0-0", "0-0", "0-0"],
      winner_id: -1,
      disabled: true,
      visible: false,
      third_place_match: null,
      selected_third_place_match: false,
    }
  },
  setup() {
    const toast = useToast();
    const drawError = (err) => {
      toast.add({ severity: 'warn', summary: 'Ошибка', detail: err, life: 3000 });
    }
    return {drawError}
  },
  components: {
    OrganizationChart,
    Select,
    Button,
    Dialog,
    InputMask,
    InputText,
    Toast
  },
  computed: {
    playoffs() {
      return this.$store.getters["playoff/GET_PLAYOFF"];
    },
    grid() {
      return this.$store.getters["playoff/GET_GRID"];
    }
  },
  methods: {
    nextStage() {
      instance.post(`/playoff/next_stage?p_id=${this.selectedPlayoff.playoff_id}`).then(res => {
        this.$store.dispatch("playoff/getGrid", this.selectedPlayoff.playoff_id);
        this.getThirdPlaceMatch();
      }).catch(err => {
        this.drawError(err.response.data.detail);
      })
    },
    nodeSelected(value) {
      if (value.player1_id !== -1) {
        this.selectedMatch = value;
        this.selected_third_place_match = false;
      } else {
        this.selectedMatch = null;
      }
    },
    nodeUnselected(value) {
      this.selectedMatch = null;
    },
    playMatch() {
      if (this.selectedMatch.type === this.selectedPlayoff.current_stage) {
        this.visible = true;
      } else if (this.selectedMatch.type === "3 место" && this.selectedPlayoff.current_stage === "Финал") {
        this.visible = true;
      } else {
        this.drawError('Вы можете сыграть матчи только текущего этапа плей-офф')
      }
    },
    addMatchResult() {
      let payload = {};
      payload['id'] = this.selectedMatch.match_id;
      payload['score'] = this.score;
      payload['score_by_batch'] = this.score_by_batch.join(' ')
      let score_array = this.score.split('-').map(Number)
      if (score_array[0] > score_array[1]) {
        payload['winner_id'] = this.selectedMatch.player1_id;
      } else {
        payload['winner_id'] = this.selectedMatch.player2_id;
      }
      matchApi.updateMatchScore(payload.id, payload.winner_id, payload.score, payload.score_by_batch).then(response => {
        this.$store.dispatch("playoff/getGrid", this.selectedPlayoff.playoff_id);
        this.getThirdPlaceMatch();
      })
      this.cancel()
    },
    cancel() {
      this.visible = false;
      this.score = "0-0";
      this.score_by_batch = ["0-0", "0-0", "0-0"];
      this.winner_id = -1;
    },
    getThirdPlaceMatch() {
      instance.get(`/playoff/get_third_place_mathc?p_id=${this.selectedPlayoff.playoff_id}`).then(res => {
        this.third_place_match = res.data;
      }).catch(err => {
        this.third_place_match = null;
      })
    },
    thirdPlaceMatchClick() {
      if (this.selected_third_place_match === false) {
        this.selected_third_place_match = true;
        this.selectedMatch = this.third_place_match;
      } else  {
        this.selected_third_place_match = false;
        this.selectedMatch = null;
      }
    }
  },
  watch: {
    selectedPlayoff(value) {
      if (value !== null) {
        this.$store.dispatch("playoff/getGrid", this.selectedPlayoff.playoff_id)
        this.selection = null;
        this.selectedMatch = null;
        this.getThirdPlaceMatch();
      }
    },
    playoffs(value) {
      this.selectedPlayoff = null;
      this.selectedMatch = null;
      this.third_place_match = null;
      this.selected_third_place_match = false;
    }
  }
}
</script>

<template>
  <Select v-model="selectedPlayoff" :options="playoffs" optionLabel="name" placeholder="Выберите плей-офф"
          class="w-full md:w-56"/>
  <div class="flex flex-row">
    <OrganizationChart v-model:selectionKeys="selection" :value="this.grid" v-if="selectedPlayoff && Object.keys(playoffs).length > 0"
                       selectionMode="single" class="bg-gray-200 pt-3 flex flex-1"
                       @node-select="nodeData => nodeSelected(nodeData)" @node-unselect="nodeUnselected(null)">
      <template #default="slotProps">
        <div class="flex flex-column gap-1">
          <div v-if="slotProps.node.player1_id !== -1 && slotProps.node.type === 'Финал'">
            ФИНАЛ
          </div>
          <div class="flex flex-row">
            <div v-if="slotProps.node.player1_id !== -1" class="flex flex-column">
              <span class="flex justify-content-start border-1 border-gray-900 px-2 py-1 border-bottom-none">
                {{slotProps.node.player1_surname + ' ' + slotProps.node.player1_name}}</span>
              <span class="flex justify-content-start border-1 border-gray-900 px-2 py-1">
                {{slotProps.node.player2_surname + ' ' + slotProps.node.player2_name}}</span>
            </div>
            <div class="flex flex-column" v-if="slotProps.node.player1_id !== -1">
              <span class="flex justify-content-start align-items-center border-1 border-gray-900 px-2 py-1 border-left-none h-full">
                {{slotProps.node.score}}
              </span>
            </div>
          </div>
        </div>
      </template>
    </OrganizationChart>

    <div class="flex bg-gray-200 pt-3"  v-if="this.third_place_match !== null">
      <div class="border-1 border-gray-500 p-3 h-fit" :class="{'bg-teal-600 text-white': this.selected_third_place_match,
                                                                        'bg-white': !this.selected_third_place_match}"
           @click="this.thirdPlaceMatchClick">
        <div class="flex flex-column gap-1 bg-transparent">
          <div class="text-center" v-if="this.third_place_match.player1_id !== -1">
            3 МЕСТО
          </div>
          <div class="flex flex-row">
            <div v-if="this.third_place_match.player1_id !== -1" class="flex flex-column">
                <span class="flex justify-content-start border-1 border-gray-900 px-2 py-1 border-bottom-none">
                  {{this.third_place_match.player1_surname + ' ' + this.third_place_match.player1_name}}</span>
              <span class="flex justify-content-start border-1 border-gray-900 px-2 py-1">
                  {{this.third_place_match.player2_surname + ' ' + this.third_place_match.player2_name}}</span>
            </div>
            <div class="flex flex-column" v-if="this.third_place_match.player1_id !== -1">
                <span class="flex justify-content-start align-items-center border-1 border-gray-900 px-2 py-1 border-left-none h-full">
                  {{this.third_place_match.score}}
                </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="flex pt-2 gap-2 bg-gray-200">
    <Button v-bind:disabled="this.selectedMatch === null" @click="playMatch">Сыграть матч</Button>
    <Button v-bind:disabled="this.selectedPlayoff === null" @click="nextStage">Следующий этап</Button>
  </div>
  <Dialog v-model:visible="visible" modal header="Результат матча" :style="{ width: '20%' }"
          class="border-round-xl bg-gray-200">

    <div class="flex flex-column justify-content-start gap-2 mb-4">
      <div class="flex align-items-center font-semibold w-24">Итоговый счет</div>
      <InputMask id="score" v-model="score" mask="9-9" placeholder="0-0" class="flex text-xl text-center w-3"/>
      <div class="flex flex-column gap-2 justify-content-start">
        <div class="flex align-items-center font-semibold w-24">Счет по партиям</div>
        <div class="flex flex-row gap-2">
          <InputText v-model="score_by_batch[0]" placeholder="0-0" class="flex text-xl text-center w-3"/>
          <InputText v-model="score_by_batch[1]" placeholder="0-0" class="flex text-xl text-center w-3"/>
          <InputText v-model="score_by_batch[2]" placeholder="0-0" class="flex text-xl text-center w-3"/>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-2 mt-5">
      <Button type="button" severity="secondary" @click="cancel" class="border-round-lg">
        <p class="font-normal">Отмена</p>
      </Button>
      <Button type="button" @click="addMatchResult" class="border-round-lg">
        <p class="font-normal">Сохранить результат</p>
      </Button>
    </div>
  </Dialog>
</template>

<style scoped>

</style>