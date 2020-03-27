import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import DashboardComponent from "./components/Dashboard.vue"
import FacilityComponent from "./components/Facility.vue"

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/dashboard",
            name: "dashboard",
            component: DashboardComponent
        },
        {
            // Add new route with entity ID
            path: '/facility/:entityID',
            name: 'facility',
            component: FacilityComponent
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})
