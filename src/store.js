import Vue from 'vue';
import Vuex from 'vuex';

import { addUser } from './leaderboard';
import { spotify } from './axiosInstances';

Vue.use(Vuex);


// Check for stored localstorage token
const accessToken = localStorage.getItem("@accessToken");
console.log("cached token:", accessToken);

export default new Vuex.Store({
    state: {
        access_token: accessToken,
        authenticated: !!accessToken,
        autoScroll: true,
        poller: null
    },
    mutations: {
        setTokens(state, tokens) {
            state.access_token = tokens.access_token;
            state.authenticated = true;
            // Save tokens to localstorage
            localStorage.setItem("@accessToken", tokens.access_token);
            // Now create user if doesn't exist on db
            userLoggedIn();

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

async function userLoggedIn() {
    try {
        let { data } = await spotify.get();
        addUser(data.id, data.display_name);
    } catch (error) {
        console.error(error);
    }
}
