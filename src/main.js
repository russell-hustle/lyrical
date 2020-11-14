import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import { spotify, lyrics } from './axios';
import store from './store';

Vue.prototype.$spotify = spotify;
Vue.prototype.$lyrics = lyrics;

// For rate limiting
const RATE = 800;
const SECONDS = 5;
Vue.prototype.$POLL_RATE = RATE;
Vue.prototype.$TIMEOUT = (1000 / RATE) * SECONDS;

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app');
