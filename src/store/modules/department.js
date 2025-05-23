import {departmentApi} from "../../api/api_routes/department.js";

export const department = {
    state: () => ({
        departments: null
    }),
    getters: {
        GET_DEPARTMENTS: state => {
            return state.departments;
        }
    },
    mutations: {
        SET_DEPARTMENTS(state, values) {
            console.log(values)
            state.departments = values;
        },
        ADD_DEPARTMENT(state, value) {
            state.departments.push(value);
        },
        DELETE_DEPARTMENT(state, id) {
          let index = state.departments.findIndex(department => department.id === id);
          state.departments.splice(index, 1);
        }
    },
    actions: {
        getAllDepartments:(context) => {
            departmentApi.getDepartments().then(value => {
                context.commit('SET_DEPARTMENTS', value.data);
            })
        },
        addNewDepartment:(context, newDepartment) => {
            departmentApi.createDepartment(newDepartment).then(value => {
                context.commit('ADD_DEPARTMENT', value.data);
            })
        },
        deleteDepartment:(context, id) => {
            departmentApi.deleteDepartment(id).then(value => {
                context.commit('DELETE_DEPARTMENT', id);
            })
        }
    }

}