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

Vue.filter('timestamp', function(input) {
  let now = new Date();
  let date = new Date(input);
  let ampm = date.getHours() >= 12 ? 'pm' : 'am';
  let hours = date.getHours() % 12;
  let formattedHours = hours ? hours : 12;
  let isToday = (now.getDate() === date.getDate() &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear());
  let isYesterday = (now.getDate() === date.getDate()-1 &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear());
  let dateOutput = (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + ' ';
  if(isToday) {
    dateOutput = "Today at "
  } else if(isYesterday) {
    dateOutput = "Yesterday at "
  }
  return dateOutput + formattedHours + ':' +
      (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ampm;
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
