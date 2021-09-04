import Vue from 'vue';
import Vuex from 'vuex';

import { addUser } from '~scripts/leaderboard';
import { spotify } from './axiosInstances';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        accessToken: null,
        authenticated: false,
        spotifyID: null,
        autoScroll: true,
        poller: null
    },
    mutations: {
        async setTokens(state, accessToken) {
            try {
                state.accessToken = accessToken;
                state.authenticated = true;

                // Save tokens to localstorage
                localStorage.setItem("@accessToken", accessToken);

                // Now create user if doesn't exist on db
                let { data } = await spotify.get();
                // Save spotify ID
                state.spotifyID = data.id;
                addUser(data.id, data.display_name);
            } catch (error) {
                console.error(error);
            }
        },
        unauthenticate(state) {
            state.authenticated = false;
            state.accessToken = null;
            state.spotifyID = null;
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
            // Remove localstorage token because either expired or user requested
            localStorage.removeItem("@accessToken");
        }
    },
    modules: {
    }
});