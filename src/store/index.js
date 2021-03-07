import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    username: '',
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      sessionStorage.setItem("token", token);
    },
    setUsername(state, username) {
      state.username = username;
      sessionStorage.setItem("username", username);
    }
  },
  actions: {
  },
  modules: {
  }
})
