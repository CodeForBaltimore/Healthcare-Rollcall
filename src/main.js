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
  } else if(to.name == 'reset' && !store.state.authenticated){
    next();
  }else if (to.name !== 'login' && !store.state.authenticated) {
    next({name: 'login'});
  } else {
    next();
  }
});

Vue.filter('phone', function (phone) {
  return phone.replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
});

Vue.filter('nullToNone', function (value) {
  if(value == null) {
    return "None";
  } else {
    return value;
  }
});

new Vue({
  store,
  render: h => h(App),
  computed: mapState({
    auth_token: "auth",
    auth_state: "authenticated"
  }),
  data(){
    return {
      api: process.env.VUE_APP_BASE_API_URL,
      authenticated: false
    }
  },
  created: function () {
    if(!this.authenticated && this.getTokenFromCookie()) {
      this.authenticateUser(this.getTokenFromCookie());
    }
  },
  methods: {
    ...mapActions(["unsetAuth", "authenticate"]),
    authenticateUser(response) {
      this.setAuthCookie(response);
      this.authenticate(response);
      this.$emit("authenticated", true);
    },
    setAuthCookie(response) {
      if(this.getTokenFromCookie() && this.getTokenFromCookie() !== response){
        console.log("cookie looks different.");
        this.$cookies.remove('Health_Auth');
        this.$cookies.set('Health_Auth', response, '1D', null);
      } else if(!this.getTokenFromCookie()) {
        console.log("no cookie detected. adding new cookie.");
        this.$cookies.set('Health_Auth', response, '1D', null);
      } else {
        console.log("cookies are the same. doing nothing.");
      }
    },
    getAuthenticationStatus() {
      return this.auth_state;
    },
    getSavedToken() {
      return this.auth_token;
    },
    getTokenFromCookie() {
      return this.$cookies.get('Health_Auth');
    },
    destroySession() {
      this.unsetAuth();
      this.$cookies.remove('Health_Auth');
    },
    apiGETRequest(endpoint, callback) {
      let self = this;
      axios
          .get(self.api + endpoint, {
            headers: {
              'token': self.getSavedToken()
            },
          })
          .then(function(response) {
            callback(response.data);
          })
          .catch(function(err) {
            console.log(err);
            callback(false);
          });
    },
    apiPUTRequest(endpoint, payload, callback) {
      let self = this;
      axios
          .put(self.api + endpoint, payload, {
            headers: {
              'token': self.getSavedToken()
            },
          })
          .then(function(response) {
            callback(response);
          })
          .catch(function(err) {
            console.log(err);
            callback(false);
          });
    },
  },
  router
}).$mount('#app');
