import {leagueApi} from "../../api/api_routes/league.js";

export const league = {
    state: () => ({
        leagues: null
    }),
    getters: {
        GET_LEAGUES: state => {
            return state.leagues;
        }
    },
    mutations: {
        SET_LEAGUES(state, values) {
            state.leagues = values;
        }
    },
    actions: {
        getAllLeagues:(context, t_id) => {
            leagueApi.getAllLeagues(t_id).then(value => {
                context.commit('SET_LEAGUES', value.data);
            })
        }
    }
}