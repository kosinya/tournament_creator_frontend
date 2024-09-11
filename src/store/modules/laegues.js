import {leagueApi} from "../../api/api_routes/league.js";

export const league = {
    state: () => ({
        leagues: null,
        current_league_id: null,
    }),
    getters: {
        GET_LEAGUES: state => {
            return state.leagues;
        },
        GET_CURRENT_LEAGUE_ID: state => {
            return state.current_league_id;
        }
    },
    mutations: {
        SET_LEAGUES(state, values) {
            state.leagues = values;
        },
        SET_CURRENT_LEAGUE_ID(state, id) {
            state.current_league_id = id;
        },
        ADD_LEAGUE(state, value) {
            state.leagues.push(value);
        },
        DELETE_LEAGUE(state, id) {
          let index = state.leagues.findIndex(league => league.id === id);
          state.leagues.splice(index, 1);
        }
    },
    actions: {
        getAllLeagues:(context, t_id) => {
            leagueApi.getAllLeagues(t_id).then(value => {
                context.commit('SET_LEAGUES', value.data);
            })
        },
        set_current_league_id: (context, id) => {
            context.commit('SET_CURRENT_LEAGUE_ID', id);
        },
        addNewLeague(context, payload) {
            leagueApi.createNewLeague(payload.data, payload.t_id).then(value => {
                context.commit('ADD_LEAGUE', value.data);
            })
        },
        deleteLeague(context, id) {
            leagueApi.deleteLeague(id).then(() => {
                context.commit('DELETE_LEAGUE', id);
            })
        }
    }
}