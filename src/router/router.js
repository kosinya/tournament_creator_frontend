import { createMemoryHistory, createRouter } from 'vue-router'
import MainView from "./views/MainView.vue";
import DepartmentView from "./views/DepartmentView.vue";
import ParticipantsComponent from "../components/ParticipantsComponent.vue"

const routes = [
    { path: '/main', component: MainView },
    { path: '/players', component: ParticipantsComponent },
    { path: '/department', component: DepartmentView }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router