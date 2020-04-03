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
Vue.use(VueJWT, { storage: 'cookie' });

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  if (Vue.$cookies.get('Health_Auth')) {
    next();
  } else if (to.name === 'reset' && !store.state.authenticated) {
    next();
  } else if (to.name !== 'login' && !store.state.authenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});

Vue.filter('phone', function (phone) {
  let phoneClean = ('' + phone).replace(/\D/g, '');
  if(phoneClean.charAt(0) === "1") {
    phoneClean = phoneClean.slice(1);
  }
  let output = null;
  if(phoneClean.length === 0){
    output = '';
  } else if(phoneClean.length > 0 && phoneClean.length <= 3) {
    output = '(' + phoneClean.substring(0, 3) + ')';
  } else if(phoneClean.length >= 4 && phoneClean.length <= 6) {
    output = '(' + phoneClean.substring(0, 3) + ') ' + phoneClean.substring(3, 6);
  } else if(phoneClean.length >= 7 && phoneClean.length <= 10) {
    output = '(' + phoneClean.substring(0, 3) + ') ' + phoneClean.substring(3, 6) + '-' + phoneClean.substring(6, 10);
  } else if(phoneClean.length > 10) {
    output = '(' + phoneClean.substring(0, 3) + ') ' + phoneClean.substring(3, 6) + '-' + phoneClean.substring(6, 10) + ' ext: ' + phoneClean.substring(10);
  }

  return '+1 ' + output
});

Vue.filter('numberToLetter', function (number) {
  switch(number) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    case 4:
      return "E";
    case 5:
      return "F";
    case 6:
      return "G";
    case 7:
      return "H";
    case 8:
      return "I";
    case 9:
      return "J";
    case 10:
      return "K";
  }

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
  let isYesterday = (now.getDate() === date.getDate()+1 &&
      now.getMonth() === date.getMonth() &&
      now.getFullYear() === date.getFullYear());
  let dateOutput = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ' at ';
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
  data() {
    return {
      api: process.env.VUE_APP_BASE_API_URL,
      authenticated: false
    }
  },
  created: function () {
    if (!this.authenticated && this.getTokenFromCookie()) {
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
      if (this.getTokenFromCookie() && this.getTokenFromCookie() !== response) {
        // Cookies are different - Replacing cookie
        this.$cookies.remove('Health_Auth');
        this.$cookies.set('Health_Auth', response, '1D', null);
      } else if (!this.getTokenFromCookie()) {
        // No existing cookie - Adding cookie
        this.$cookies.set('Health_Auth', response, '1D', null);
      } else {
        // Cookies are the same - do nothing
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
        .then(function (response) {
          callback(response.data);
        })
        .catch(function (err) {
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
        .then(function (response) {
          callback(response);
        })
        .catch(function (err) {
          console.log(err);
          callback(false);
        });
    },
    apiPOSTRequest(endpoint, payload, callback) {
      let self = this;
      axios
        .post(self.api + endpoint, payload, {
          headers: {
            'token': self.getSavedToken()
          },
        })
        .then(function (response) {
          callback(response);
        })
        .catch(function (err) {
          console.log(err);
          callback(false);
        });
    },
    getStatuses() {
      return [
        "Spoke to owner. No follow-up needed.",
        "Spoke to owner. Follow-up needed.",
        "Spoke to someone besides owner. No follow-up needed.",
        "Spoke to someone besides owner. Follow-up needed.",
        "Called. No Answer. Left a message.",
        "Called. No Answer. Did not leave a message.",
        "Wrong number",
        "No Previous Check-in"
      ];
    }
  },
  router
}).$mount('#app');
