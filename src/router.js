import Vue from 'vue';
import VueRouter from 'vue-router';
import querystring from 'querystring';
import store from './store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: require('./components/Landing.vue').default,
    meta: {
      requireAuth: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: require('./components/Home.vue').default,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Mark's shitty access token for testing (and reference) -->
// #access_token=BQCGmoi2_iGWs8dF2elzaZLcBp-UaG9G0SQIlHDG2yZAP9KXs3M2y_SIfNTu92M7kuL-9BxwYoAVBiC4QQc0E7r11JM7kyJ18U1wxeYaPB4pxJjyNsV28OO9lt67lbbMs4n3PT_e7wojhENfM_8rk3a7be-Ve4ViturHe_jY&token_type=Bearer&expires_in=3600

router.beforeEach((to, from, next) => {
  // If not auth
  if (!store.state.authenticated) {
    // If we were redirected after spotify login and we successfully authenticated
    if (fromSpotify(to.hash)) {
      try {
        let data = querystring.decode(to.hash.substring(1));
        console.log(data);
        store.commit('setTokens', data.access_token);
        next({ name: 'Home' });
      } catch (error) {
        console.error(error);
        alert("Invalid access token.");
        next({ name: 'Landing' });
      }
    }
    else {
      // If this route requires auth
      if (to.matched.some(route => route.meta.requireAuth)) {
        next({ name: 'Landing' });
      }
      // This route doesn't need auth so yolo
      else {
        next();
      }
    }
  }
  // We are authorized so do whatever bro
  else {
    next();
  }
});

// TODO: hmmmmm no cap
function fromSpotify(hash) {
  // Advanced security algorithm
  return hash.length > 50;
}

export default router;
