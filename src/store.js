import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_token: null,
    refresh_token: null,
    authenticated: false,
  },
  mutations: {
    setTokens(state, tokens) {
      state.access_token = tokens.access_token;
      state.refresh_token = tokens.refresh_token;
      state.authenticated = true;
    }
  },
  actions: {
  },
  modules: {
  }
});
