import instance from "../instance.js";

export const matchApi = {
    getAllGroupMatches(l_id) {
        return instance.get('/matches/all_group_matches', {params: {league_id: l_id}})
    },
    updateMatchScore(match_id, winner_id, score) {
        return instance.put(`/matches/`, null, {params: {match_id: match_id, winner_id: winner_id, score: score}})
    }
}