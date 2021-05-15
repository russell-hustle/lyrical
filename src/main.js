import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { spotify } from "./axios";
import store from "./store";
import browserDetect from "vue-browser-detect-plugin";

Vue.prototype.$spotify = {
  http: spotify,
  client_id: "8bcb169f90554b209a351f9016ec7b04",
  redirect_uri:
    process.env.NODE_ENV === "production"
      ? "https://spotify-lyrical.netlify.app/"
      : process.env.NODE_ENV === "staging"
      ? "https://spotify-lyrical.netlify.app/"
      : "http://localhost:8080",
  scopes: "user-read-currently-playing user-modify-playback-state",
};

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
