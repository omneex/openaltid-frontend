import axios from 'axios';
import vuex from 'vuex';
import Cookies from 'js-cookie';

const BACKEND_API_BASEURI = process.env.VUE_APP_API_HOST ?? 'localhost:3000';
const BRANDING_LONG = process.env.VUE_APP_BRANDING_LONG ?? 'OPEN/ALT.ID';
const BRANDING_SHORT = process.env.VUE_APP_BRANDING_SHORT ?? 'OPEN/ALT.ID';
const BRANDING_LINK = process.env.VUE_APP_BRANDING_LINK ?? 'OPEN/ALT.ID';
const BRANDING_HOME_LINK = process.env.VUE_APP_BRANDING_HOME_LINK ?? 'OPEN/ALT.ID';
const BRANDING_TITLE = process.env.VUE_APP_BRANDING_HOST ?? 'OPEN/ALT.ID';

const store = new vuex.Store({
  state: {
    BACKEND_API_BASEURI,
    BRANDING_LONG,
    BRANDING_SHORT,
    BRANDING_LINK,
    BRANDING_HOME_LINK,
    loggedIn: true,
    token: Cookies.get('token') || '',
    siteTitle: BRANDING_TITLE,
    darkMode: false,
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn;
    },
    getDarkModeState: (state) => {
      if (!state.darkMode) {
        return 'dark';
      }
      return 'light';
    },
  },
  mutations: {
    checkLoggedIn(state) {
      axios.get(
        `${BACKEND_API_BASEURI}/user/is-logged-in`,
        {
          withCredentials: true,
        },
      ).then((res) => {
        if (res.status === 200) {
          state.loggedIn = true;
        } else {
          state.loggedIn = false;
        }
      }).catch((err) => {
        console.log(err);
        state.loggedIn = false;
      });
    },
    login(state, urlQuery) {
      let token: string;
      axios.post(
        `${BACKEND_API_BASEURI}/auth/discord/callback?code=${urlQuery.code}`,
        {
          body: JSON.stringify({
            urlQuery,
          }),
        },

        {
          withCredentials: true,
        },
      ).then(((response) => {
        if (response.status === 200) {
          Cookies.set('token', token, { secure: true, sameSite: 'lax' });
          state.token = token;
          state.loggedIn = true;
        } else {
          Cookies.remove('token');
          state.token = '';
          state.loggedIn = false;
        }
      })).catch((error) => {
        console.error(error);
      });
    },
    FLIP_DARKMODE_STATE: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  actions: {
  },
  modules: {
  },
});

export default store;
