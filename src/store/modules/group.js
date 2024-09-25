import {groupApi} from "../../api/api_routes/group.js";

export const group = {
    state: () => ({
        groups: []
    }),
    getters: {
        GET_GROUPS: state => {
            return state.groups;
        }
    },
    mutations: {
        SET_GROUPS: (state, value) => {
            state.groups = value;
        },
        UPDATE_GROUP: (state, payload) => {
            let index = state.groups.findIndex(group => group.player_id === payload.winner_id &&
            group.league_id === payload.league_id);
            console.log(index);
            state.groups[index].score += 2;
        }
    },
    actions: {
        setGroups: (context, l_id) => {
            groupApi.getAllGroups(l_id).then(response => {
                context.commit('SET_GROUPS', response.data);
            })
        },
        updateGroup: (context, payload) => {
            context.commit('UPDATE_GROUP', payload)
        }
    }
}