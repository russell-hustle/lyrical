import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    access_token: null,
    refresh_token: null,
    authenticated: false,
    autoScroll: true,
    poller: null
  },
  mutations: {
    setTokens(state, tokens) {
      state.access_token = tokens.access_token;
      state.refresh_token = tokens.refresh_token;
      state.authenticated = true;
    },
    unauthenticate(state) {
      state.authenticated = false;
    },
    toggleAutoScroll(state) {
      state.autoScroll = !state.autoScroll;
    },
    startPolling(state, intervalId) {
      state.poller = intervalId;
    },
    stopPolling(state) {
      clearInterval(state.poller);
      state.poller = null;
    }
  },
  actions: {
    expire(context) {
      context.commit('unauthenticate');
      context.commit('stopPolling');
    }
  },
  modules: {
  }
});
