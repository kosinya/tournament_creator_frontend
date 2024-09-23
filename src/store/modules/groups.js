import {groupApi} from "../../api/api_routes/group.js";

export const group = {
    state: () => ({
        groups: null
    }),
    getters: {
        GET_GROUPS: state => {
            return state.groups;
        }
    },
    mutations: {
        SET_GROUPS: (state, value) => {
            state.groups = value;
        }
    },
    actions: {
        getAllGroups: (context, l_id) => {
            groupApi.getAllGroups(l_id).then(response => {
                context.commit('SET_GROUPS', response.data);
                console.log(response.data);
            })
        }
    }
}