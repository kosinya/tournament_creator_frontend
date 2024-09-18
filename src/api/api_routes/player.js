import instance from "../instance.js";

export const playerApi = {
    getAllPlayers() {
        return instance.get('players/all')
    },
    createPlayer(player) {
        return instance.post('players/', player);
    },
    deletePlayer(id) {
        return instance.delete(`players/${id}`);
    }
}