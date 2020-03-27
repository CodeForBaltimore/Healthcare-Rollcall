import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store'
import BootstrapVue from 'bootstrap-vue';
import VueCookies from 'vue-cookies';
import VueJWT from 'vuejs-jwt';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { mapState } from "vuex";
import { mapActions } from "vuex";
import axios from "axios";

Vue.use(BootstrapVue);
Vue.use(VueCookies);
Vue.use(VueJWT,{storage:'cookie'});

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if(Vue.$cookies.get('Health_Auth')) {
    next();
  } else if (to.name !== 'login' && !store.state.authenticated) {
    next({name: 'login'});
  } else {
    next();
  }
});

new Vue({
  store,
  render: h => h(App),
  computed: mapState({
    auth_token: "auth"
  }),
  data(){
    return {
      api: process.env.VUE_APP_BASE_API_URL,
      authenticated: false
    }
  },
  methods: {
    ...mapActions(["unsetAuth", "authenticate"]),
    authenticateUser(response) {
      this.authenticated = true;
      this.setAuthCookie(response);
      this.authenticate(response);
      this.$emit("authenticated", true);
    },
    setAuthCookie(response) {
      this.setToken(response);
      this.$cookies.set('Health_Auth', response, '1D', true);
    },
    setToken(token) {
      store.state.auth = token;
    },
    getAuthenticationStatus() {
      return this.authenticated;
    },
    getSavedToken() {
      return store.state.auth;
    },
    getTokenFromCookie() {
      this.setToken(this.$cookies.get('Health_Auth'));
      return this.getSavedToken();
    },
    logout() {
      this.authenticated = false;
      this.unsetAuth();
      this.$cookies.remove('Health_Auth');
      this.setToken(null);
    },
    apiRequest(endpoint) {
      let self = this;
      axios
          .get(self.api + endpoint, {
            headers: {
              'token': self.getSavedToken()
            },
          })
          .then(function(response) {
            // Save API response to component data
            return response.data.results;
          })
          .catch(function(err) {
            console.log(err);
            return false;
          });
    },
  },
  router
}).$mount('#app');
