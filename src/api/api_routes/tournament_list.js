import instance from "../instance.js";

export const tournamentListApi = {
    getAllTournaments() {
        return instance.get('tournaments/all');
    }
}