import {playoffApi} from "../../api/api_routes/playoff.js"

export const playoff = {
    namespaced: true,
    state: () => ({
        playoffs: null,
        grid: []
    }),
    getters: {
        GET_PLAYOFF: state => {
            return state.playoffs
        },
        GET_GRID: state => {
            return state.grid
        }
    },
    mutations: {
        SET_PLAYOFF(state, values) {
            state.playoffs = values;
        },
        SET_GRID(state, value) {
            state.grid = value;
        }
    },
    actions: {
        getPlayoffs: (context, l_id) => {
            playoffApi.getAllPlayoff(l_id).then(response => {
                context.commit('SET_PLAYOFF', response.data);
            })
        },
        getGrid: (context, p_id) => {
            playoffApi.get_grid(p_id).then(response => {
                context.commit('SET_GRID', response.data);
            })
        }
    }
}