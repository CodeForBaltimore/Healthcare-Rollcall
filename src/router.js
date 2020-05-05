import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./templates/Login.vue"
import DashboardComponent from "./templates/Dashboard.vue"
import FacilityComponent from "./templates/Facility.vue"
import PasswordResetComponent from "./templates/PasswordReset.vue"
import ContactComponent from "./templates/Contact.vue"
import ContactListComponent from "./templates/ContactList.vue"
import ContactSingleComponent from "./templates/ContactSingle.vue"

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
            path: "/contacts",
            name: 'get-all-contacts',
            component: ContactListComponent
        },
        {
            path: "/contacts/:contactID",
            name: 'get-single-contact',
            component: ContactSingleComponent
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
