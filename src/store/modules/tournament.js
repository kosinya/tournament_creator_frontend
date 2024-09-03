import {tournamentApi} from "../../api/api_routes/tournament_list.js";

export const tournamentList = {
    namespaced: true,
    state: () => ({
        tournaments: null,
    }),
    getters: {
      tournamentList: state => {
          return state.tournaments;
      }
    },
    mutations: {
        setTournaments(state, value) {
            state.tournaments = value;
        }
    },
    actions: {
        getAllTournaments: (context) => {
            tournamentApi.getAllTournaments().then(value => {
                context.commit('setTournaments', value.data);
            })
        }
    }
}