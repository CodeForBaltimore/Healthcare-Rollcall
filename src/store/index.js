import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: '',
    authenticated: false
  },
  mutations: {
    AUTHENTICATE: (state, token) =>{
      state.auth = token;
      state.authenticated = true;
    },
    UNSETAUTH: (state) => {
      state.auth = '';
      state.authenticated = false;
    }
  },
  actions: {
    authenticate: (context, token) => {
      context.commit("AUTHENTICATE", token);
    },
    unsetAuth: (context) => {
      context.commit("UNSETAUTH");
    }
  },
  modules: {
  }
})
