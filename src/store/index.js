import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: ''
  },
  mutations: {
    AUTHENTICATE: (state, token) =>{
      state.auth = token
    }
  },
  actions: {
    authenticate: (context, token) => {
      context.commit("AUTHENTICATE", token)
    }
  },
  modules: {
  }
})
