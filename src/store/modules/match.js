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
        }
    },
    actions: {
        getGroupMatches: (context, l_id) => {
            matchApi.getAllGroupMatches(l_id).then(response => {
                context.commit('SET_GROUP_MATCHES', response.data);
            })
        }
    }
}