import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { functions, spotify } from "./axiosInstances";
import store from "./store";
import browserDetect from "vue-browser-detect-plugin";

// console.log(process.env.NODE_ENV, process.env.SPOTIFY_CLIENT_ID, process.env, process.env.VUE_APP_COLOR);

Vue.prototype.$spotify = {
  http: spotify,
  client_id: process.env.SPOTIFY_CLIENT_ID || process.env.VUE_APP_SPOTIFY_CLIENT_ID,
  redirect_uri: document.location.origin,
  scopes: "user-read-currently-playing user-modify-playback-state",
};

Vue.prototype.$functions = functions;

// For rate limiting
const RATE = 800;
const SECONDS = 5;
Vue.prototype.$POLL_RATE = RATE;
Vue.prototype.$TIMEOUT = (1000 / RATE) * SECONDS;

Vue.config.productionTip = false;

// For browser detection
Vue.use(browserDetect);

// Check for stored localstorage token
const accessToken = localStorage.getItem("@accessToken");
console.log("cached token:", accessToken);
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
