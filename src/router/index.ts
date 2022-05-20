import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import axios from "axios";
import HomeView from "../views/HomeView.vue";
import store from "../store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/privacy",
    name: "privacy",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/Privacy.vue"),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "../views/DashboardView.vue"),
    beforeEnter: (to, from, next) => {
      // console.log('route guard');
      store.dispatch("checkLoggedIn").then(() => {
        if (store.getters.getLoggedIn === true) {
          next();
        } else {
          next({ name: "home" });
        }
      });
    },
  },
  {
    path: "/login/discord/callback",
    name: "discordcallback",
    component: () => import("../views/DiscordCallbackView.vue"),
  },
  {
    path: "/verify",
    name: "verifylanding",
    component: () => import("../views/VerifyLandingView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
