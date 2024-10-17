import instance from "../instance.js";

export const departmentApi = {
    getDepartments() {
        return instance.get('/departments/all');
    },
    createDepartment(department) {
        return instance.post('/departments', department);
    },
    deleteDepartment(id) {
        return instance.delete(`departments/${id}`);
    }
}