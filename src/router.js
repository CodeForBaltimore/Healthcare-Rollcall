import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import DashboardComponent from "./components/Dashboard.vue"
import FacilityComponent from "./components/Facility.vue"
import PasswordResetComponent from "./components/PasswordReset.vue"
import ContactComponent from "./components/Contact.vue"

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
            path: "/reset/:token",
            name: 'reset',
            component: PasswordResetComponent
        },
        {
            path: "/contact/:entityID",
            name: 'create-contact',
            component: ContactComponent
        },
        {
            path: "/contact/:entityID/:contactID",
            name: 'update-contact',
            component: ContactComponent
        },
        {
            path: '*',
            redirect: '/login'
        }
    ],
    scrollBehavior () {
        return { x: 0, y: 0};
    }
})
