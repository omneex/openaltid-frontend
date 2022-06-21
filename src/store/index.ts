import axios from "axios";
import vuex from "vuex";
import Cookies from "js-cookie";

const BACKEND_API_BASEURI = process.env.VUE_APP_API_HOST ?? "http://localhost:3000";
const BRANDING_LONG = process.env.VUE_APP_BRANDING_LONG ?? "OPEN/ALT.ID";
const BRANDING_SHORT = process.env.VUE_APP_BRANDING_SHORT ?? "OPEN/ALT.ID";
const BRANDING_LINK = process.env.VUE_APP_BRANDING_LINK ?? "OPEN/ALT.ID";
const BRANDING_HOME_LINK = process.env.VUE_APP_BRANDING_HOME_LINK ?? "OPEN/ALT.ID";
const BRANDING_TITLE = process.env.VUE_APP_BRANDING_HOST ?? "OPEN/ALT.ID";

const store = new vuex.Store({
  state: {
    BACKEND_API_BASEURI,
    BRANDING_LONG,
    BRANDING_SHORT,
    BRANDING_LINK,
    BRANDING_HOME_LINK,
    loggedIn: false,
    token: Cookies.get("token") || "",
    siteTitle: BRANDING_TITLE,
    darkMode: false,
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn;
    },
    getDarkModeState: (state) => {
      if (!state.darkMode) {
        return "dark";
      }
      return "light";
    },
  },
  mutations: {
    setLoggedIn(state, val) {
      // console.log(`Setting state.loggedIn to ${val}`);
      state.loggedIn = val;
    },
    FLIP_DARKMODE_STATE: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  actions: {
    async checkLoggedIn({ commit }) {
      try {
        await axios.get(`${BACKEND_API_BASEURI}/user/is-logged-in`, {
          withCredentials: true,
        });
        commit("setLoggedIn", true);
      } catch {
        commit("setLoggedIn", false);
      }
    },
  },
  modules: {},
});

export default store;
