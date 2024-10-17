import {playerApi} from "../../api/api_routes/player.js"

export const player = {
        namespaced: true,
    state: () => ({
        players: null
    }),
    getters: {
        GET_PLAYERS: state => {
            return state.players
        }
    },
    mutations: {
        SET_PLAYERS: (state, values) => {
            state.players = values;
        },
        ADD_PLAYER: (state, value) => {
            state.players.push(value);
        },
        DELETE_PLAYER: (state, id) => {
            let index = state.players.findIndex(player => player.player_id === id);
            state.players.splice(index, 1);
        }
    },
    actions: {
        getAllPlayers: (context) => {
            playerApi.getAllPlayers().then(value => {
                context.commit('SET_PLAYERS', value.data);
            })
        },
        addNewPlayer: (context, newPlayer) => {
            playerApi.createPlayer(newPlayer).then(value => {
                context.commit('ADD_PLAYER', value.data);
            })
        },
        deletePlayer: (context, id) => {
            playerApi.deletePlayer(id).then(value => {
                context.commit('DELETE_PLAYER', id);
            })
        }
    }
}