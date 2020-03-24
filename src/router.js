import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import SecureComponent from "./components/Secure.vue"
import FacilityComponent from "./components/Facility.vue"
import HelloWorldComponent from "./components/HelloWorld.vue"

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
            path: "/secure",
            name: "secure",
            component: SecureComponent
        },
        {
            path: '/facility/:entityID',
            name: 'facility',
            component: FacilityComponent
        },
        {
            path: "/hello",
            name: "hello",
            component: HelloWorldComponent,
            props: {msg:"Welcome to HealthCare RollCall\nMore to come soon!"}
        }
    ]
})
