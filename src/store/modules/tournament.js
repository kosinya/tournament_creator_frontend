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
        SET_TOURNAMENTS(state, value) {
            state.tournaments = value;
        },
        ADD_TOURNAMENT(state, value) {
            state.tournaments.push(value);
        },
        DELETE_TOURNAMENT(state, id) {
            let index = state.tournaments.findIndex(tournament => tournament.id === id);
            state.tournaments.splice(index, 1);
        },
        UPDATE_TOURNAMENT(state, payload) {
          state.tournaments = state.tournaments.map(tournament => {
              if (tournament.id === payload.id) {
                  return Object.assign({}, tournament, payload.data)
              }
              return tournament;
          })
        }
    },
    actions: {
        getAllTournaments: (context) => {
            tournamentApi.getAllTournaments().then(value => {
                context.commit('SET_TOURNAMENTS', value.data);
            })
        },
        addNewTournament: (context, newTournament) => {
            tournamentApi.createTournament(newTournament).then(value => {
                context.commit('ADD_TOURNAMENT', value.data);
            })
        },
        deleteTournament: (context, id) => {
            tournamentApi.deleteTournament(id).then(() => {
                context.commit('DELETE_TOURNAMENT', id);
            })
        },
        updateTournament: (context, payload) => {
            tournamentApi.updateTournament(payload.id, payload.data).then(() => {
                context.commit('UPDATE_TOURNAMENT', payload.data);
            })
        }
    }
}