import instance from "../instance.js";

export const leagueApi = {
    getAllLeagues(t_id) {
        return instance.get('/leagues/all', { params: { t_id: t_id }});
    },
    createNewLeague(newLeague, id) {
        return instance.post('/leagues/', newLeague, { params: {t_id: id}});
    },
    deleteLeague(l_id) {
        return instance.delete(`leagues/${l_id}`);
    },
    deletePlayer(l_id, player_id) {
        return instance.put(`/leagues/${l_id}/`, null,{params: {player_id: player_id}});
    },
    addPlayers(l_id, players) {
        players = players.join(',')
        return instance.put(`/leagues/${l_id}/players`, null, {params: {player_ids: players}});
    },
}