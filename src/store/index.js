import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // token: '',
    // username: '',
    user: {
      token: '',
      username: '',
    }
  },
  mutations: {
    // setToken(state, token) {
    //   state.token = token;
    //   sessionStorage.setItem("token", token);
    // },
    // setUsername(state, username) {
    //   state.username = username;
    //   sessionStorage.setItem("username", username);
    // },
    login(state, user) {
      state.user = user;
      sessionStorage.setItem("userInfo", JSON.stringify(state));
    },
    logout(state) {
      state.user.token = '';
      state.user.username = '';
      sessionStorage.removeItem("userInfo");
    }
  },
  actions: {
  },
  modules: {
  }
})
