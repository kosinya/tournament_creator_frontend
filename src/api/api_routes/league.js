import instance from "../instance.js";

export const leagueApi = {
    // Получить список всех групп
    getAllLeagues(t_id) {
        return instance.get('/leagues', { params: { t_id: t_id }} );
    },
    createNewLeague(newLeague, id) {
        return instance.post('/leagues/', newLeague, { params: {t_id: id}});
    },
    deleteLeague(id) {
        return instance.delete(`leagues/${id}`);
    }
}