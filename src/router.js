import Vue from 'vue'
import Router from 'vue-router'
import CheckInRedirect from "./templates/CheckInRedirect.vue"
import LoginComponent from "./templates/Login.vue"
import DashboardComponent from "./templates/Dashboard.vue"
import FacilityComponent from "./templates/Facility.vue"
import PasswordResetComponent from "./templates/PasswordReset.vue"
import ContactComponent from "./templates/Contact.vue"
import ContactListComponent from "./templates/ContactList.vue"

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
            path: "/contact/link/new/:entityID",
            name: 'create-contact',
            component: ContactComponent
        },
        {
            path: "/contact/link/update/:entityID/:contactID",
            name: 'update-contact',
            component: ContactComponent
        },
        {
            path: "/contact/all",
            name: 'get-all-contacts',
            component: ContactListComponent
        },
        {
            path: "/contact/single/:contactID",
            name: 'get-single-contact',
            component: ContactComponent
        },
        {
            path: "/checkin/:entityId",
            name: 'checkin',
            component: CheckInRedirect
        },
        {
            path: '*',
            redirect: '/login'
        }
    ],
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
})
