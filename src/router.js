import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import SecureComponent from "./components/Secure.vue"

Vue.use(Router);

export default new Router({
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
        }
    ]
})
