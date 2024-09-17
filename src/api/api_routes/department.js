import instance from "../instance.js";

export const departmentApi = {
    getDepartments() {
        return instance.get('/departments/all');
    }
}