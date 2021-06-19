import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { functions, spotify } from "./axiosInstances";
import store from "./store";
import browserDetect from "vue-browser-detect-plugin";

Vue.prototype.$spotify = {
  http: spotify,
  client_id: process.env.SPOTIFY_CLIENT_ID,
  redirect_uri:
    process.env.NODE_ENV === "production"
      ? "https://spotify-lyrical.netlify.app/"
      : "http://localhost:8888",
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

new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
