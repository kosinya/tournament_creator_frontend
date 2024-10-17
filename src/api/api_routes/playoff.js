import instance from "../instance.js";

export const playoffApi = {
    getAllPlayoff(l_id) {
        return instance.get('/playoff/get_playoffs', { params: { l_id: l_id }});
    },
    get_grid(p_id) {
        return instance.get('/playoff/get_grid', { params: { playoff_id: p_id }});
    }
}