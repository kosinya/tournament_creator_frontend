import {leagueApi} from "../../api/api_routes/league.js";

export const league = {
    state: () => ({
        leagues: null,
        current_league: null,
    }),
    getters: {
        GET_LEAGUES: state => {
            return state.leagues;
        },
        GET_CURRENT_LEAGUE: state => {
            return state.current_league;
        }
    },
    mutations: {
        SET_LEAGUES(state, values) {
            state.leagues = values;
        },
        SET_CURRENT_LEAGUE(state, value) {
            state.current_league = value;
        },
        ADD_LEAGUE(state, value) {
            state.leagues.push(value);
        },
        DELETE_LEAGUE(state, id) {
            let index = state.leagues.findIndex(league => league.league_id === id);
            state.leagues.splice(index, 1);
        },
        DELETE_PLAYER(state, payload) {
            let index = state.leagues.findIndex(league => league.league_id === payload.l_id)
            // console.log('index: ', index, " league: ", state.leagues[index]);
            let players = state.leagues[index].players.split(',').map(Number)
            // console.log(players);
            let filteredPlayers = players.filter(player => player !== payload.player_id)
            // console.log(filteredPlayers);
            state.leagues[index].players = filteredPlayers.join(',');
            // console.log(state.leagues[index].players);
        }
    },
    actions: {
        getAllLeagues:(context, t_id) => {
            leagueApi.getAllLeagues(t_id).then(value => {
                context.commit('SET_LEAGUES', value.data);
            })
        },
        set_current_league: (context, value) => {
            context.commit('SET_CURRENT_LEAGUE', value);
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
        },
        deletePlayer(context, payload) {
            leagueApi.deletePlayer(payload.l_id, payload.player_id).then(() => {
                context.commit('DELETE_PLAYER', payload);
            })
        }
    }
}