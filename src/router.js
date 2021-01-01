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

router.beforeEach((to, from, next) => {
  // If not auth
  if (!store.state.authenticated) {
    // If we were redirected after spotify login and we successfully authenticated
    if (fromSpotify(to.hash)) {
      let data = querystring.decode(to.hash.substring(1));
      store.commit('setTokens', data);
      next({ name: 'Home' });
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

// TODO: store on server the right way even though it's impossible lmao
function fromSpotify(hash) {
  console.log(hash);
  return hash.length > 50;
}

export default router;
