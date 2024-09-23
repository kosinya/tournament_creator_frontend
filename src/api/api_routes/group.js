import instance from "../instance.js";

export const groupApi = {
    // Получить список всех групп
    getAllGroups(l_id) {
        return instance.get("/groups", { params: { l_id: l_id }});
    }
}