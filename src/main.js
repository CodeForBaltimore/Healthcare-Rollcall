import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import BootstrapVue from 'bootstrap-vue';
import VueCookies from 'vue-cookies';
import VueJWT from 'vuejs-jwt';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(BootstrapVue);
Vue.use(VueCookies);
Vue.use(VueJWT,{storage:'cookie'});


Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
  data(){
    return {
      apiEndpoint: process.env.VUE_APP_BASE_API_URL
    }
  },
  router,
}).$mount('#app');
