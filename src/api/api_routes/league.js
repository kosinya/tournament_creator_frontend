import instance from "../instance.js";

export const leagueApi = {
    // Получить список всех групп
    getAllLeagues(t_id) {
        return instance.get('/leagues',  { params: { t_id: t_id }} );
    },
}