import Vuex from "vuex";
import {tournamentList} from "./modules/tournament.js";
import {league} from "./modules/laegues.js";
import {department} from "./modules/department.js";
import {player} from "./modules/player.js";
import {group} from "./modules/group.js";
import {match} from "./modules/match.js";

export const store = new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        tournamentList: tournamentList,
        league: league,
        department: department,
        player: player,
        group: group,
        match: match,
    }
})
