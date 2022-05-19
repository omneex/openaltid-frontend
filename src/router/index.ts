import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import axios from 'axios';
import HomeView from '../views/HomeView.vue';
import store from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DashboardView.vue'),
    beforeEnter: (to, from, next) => {
      // console.log('route guard');
      axios.get(
        `${store.state.BACKEND_API_BASEURI}/user/is-logged-in`,
        {
          withCredentials: true,
        },
      ).then((res) => {
        // console.log(res);
        if (res.status !== 200 && to.name !== 'home') {
          store.commit('setLoggedIn', false);
          next({ name: 'home' });
        }
        store.commit('setLoggedIn', true);
        next();
      }).catch((err) => {
        // console.log('Error Caught 1');
        // console.log(err);
        store.commit('setLoggedIn', false);
        // TODO send to error page or something
        next({ name: 'home' });
      });
    },
  },
  {
    path: '/login/discord/callback',
    name: 'discordcallback',
    component: () => import('../views/DiscordCallbackView.vue'),
  },
  {
    path: '/verify',
    name: 'verifylanding',
    component: () => import('../views/VerifyLandingView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
