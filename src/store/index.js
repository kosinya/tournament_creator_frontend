import Vuex from "vuex";
import {tournamentList} from "./modules/tournament.js";


export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        tournamentList: tournamentList,
    }
})
