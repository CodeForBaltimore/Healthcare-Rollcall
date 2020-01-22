import Vue from 'vue'
import Router from 'vue-router'
import LoginComponent from "./components/Login.vue"
import SecureComponent from "./components/Secure.vue"
import HelloWorldComponent from "./components/HelloWorld.vue"

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
        },
        {
            path: "/hello",
            name: "hello",
            component: HelloWorldComponent,
            props: {msg:"Welcome to HealthCare RollCall\nMore to come soon!"}
        }
    ]
})
