import {matchApi} from "../../api/api_routes/match.js";

export const match = {
    state: () => ({
        group_matches: null
    }),
    getters: {
        GET_GROUP_MATCHES: state => {
            return state.group_matches;
        }
    },
    mutations: {
        SET_GROUP_MATCHES: (state, value) => {
            state.group_matches = value;
        },
        UPDATE_RESULTS: (state, payload) => {
            let index = state.group_matches.findIndex(match => match.match_id === payload.id);
            state.group_matches[index].winner_id = payload.winner_id;
            state.group_matches[index].score = payload.score;
        }
    },
    actions: {
        getGroupMatches: (context, l_id) => {
            matchApi.getAllGroupMatches(l_id).then(response => {
                context.commit('SET_GROUP_MATCHES', response.data);
            })
        },
        updateResult(context, payload) {
            matchApi.updateMatchScore(payload.id, payload.winner_id, payload.score).then(response => {
                context.commit('UPDATE_RESULTS', payload);
            })
        }
    }
}