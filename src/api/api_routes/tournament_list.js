import instance from "../instance.js";

export const tournamentApi = {
    // Получить список всех турниров
    getAllTournaments() {
        return instance.get('tournaments/all');
    },
    // Создать турнир
    createTournament(tournament) {
        return instance.post('tournaments/', tournament);
    },
    // Удалить турнир
    deleteTournament(id) {
        return instance.delete(`tournaments/${id}`);
    },
    // Обновить турнир
    updateTournament(id, tournament) {
        return instance.put(`tournaments/${id}`, tournament);
    }
}