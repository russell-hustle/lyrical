import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { functions, spotify } from "./axiosInstances";
import store from "./store";
import browserDetect from "vue-browser-detect-plugin";

Vue.prototype.$spotify = {
  http: spotify,
  client_id: process.env.VUE_APP_SPOTIFY_CLIENT_ID,
  scopes: "user-read-currently-playing user-modify-playback-state",
};

Vue.prototype.$functions = functions;

// For rate limiting
const RATE = 1000;
const SECONDS = 5;
Vue.prototype.$POLL_RATE = RATE;
Vue.prototype.$TIMEOUT = (1000 / RATE) * SECONDS;

Vue.config.productionTip = false;

// For browser detection
Vue.use(browserDetect);

// Check for stored localstorage token
const accessToken = localStorage.getItem("@accessToken");
if (accessToken) {
  store.commit("setTokens", accessToken);
  router.push("/home");
}

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
