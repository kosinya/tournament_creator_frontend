import { createMemoryHistory, createRouter } from 'vue-router'
import MainView from "./views/MainView.vue";
import DepartmentView from "./views/DepartmentView.vue";
import ParticipantsViews from "./views/ParticipantsViews.vue"

const routes = [
    { path: '', component: MainView },
    { path: '/main', component: MainView },
    { path: '/players', component: ParticipantsViews },
    { path: '/departments', component: DepartmentView }
]

const router = createRouter({
    history: createMemoryHistory(),
    routes
})

export default router