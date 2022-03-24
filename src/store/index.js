import { createStore } from 'vuex';
import Cookies from 'js-cookie';
import axios from 'axios';

const BACKEND_API_BASEURI = process.env.VUE_APP_API_HOST;
const BRANDING_LONG = process.env.VUE_APP_BRANDING_LONG;
const BRANDING_SHORT = process.env.VUE_APP_BRANDING_SHORT;
const BRANDING_LINK = process.env.VUE_APP_BRANDING_LINK;
const BRANDING_HOME_LINK = process.env.VUE_APP_BRANDING_HOME_LINK;
const BRANDING_TITLE = process.env.VUE_APP_BRANDING_HOST;
const BRANDING_LOGO = process.env.VUE_APP_BRANDING_LOGO;
const SUPPORT_EMAIL = process.env.VUE_APP_SUPPORT_EMAIL;

const store = createStore({
	state: {
		BACKEND_API_BASEURI,
		BRANDING_LONG,
		BRANDING_SHORT,
		BRANDING_LINK,
		BRANDING_HOME_LINK,
		SUPPORT_EMAIL,
		BRANDING_LOGO: BRANDING_LOGO ?? '',
		logged_in: false,
		token: Cookies.get('token') || '',
		siteTitle: BRANDING_TITLE,
	},
	mutations: {
		/* eslint-disable no-param-reassign */
		setToken: (state, token) => {
			Cookies.set('token', token, { secure: true, sameSite: 'lax' });
			state.token = token;
		},
		setLoggedin: (state, status) => {
			state.logged_in = status;
		},
		/* eslint-enable */
	},
	actions: {
		login({ commit }, urlQuery) {
			return new Promise((resolve, reject) => {
				let token;
				axios
					.post(
						`${BACKEND_API_BASEURI}/auth/discord/callback?code=${urlQuery.code}`,
						{
							body: JSON.stringify({
								urlQuery,
							}),
						},
						{
							withCredentials: true,
						},
					)
					.then((response) => {
						if (response.status === 200) {
							commit('setToken', token, true);
							commit('setLoggedin', true);
							resolve(true);
						} else {
							commit('setToken', '', false);
							resolve(false);
						}
					})
					.catch((error) => {
						// eslint-disable-next-line no-console
						console.error(error);
						reject(error);
					});
			});
		},
		verifyLogin({ commit }) {
			return new Promise((resolve, reject) => {
				if (!this.state.logged_in) {
					axios
						.get(`${BACKEND_API_BASEURI}/user/is-logged-in`, {
							withCredentials: true,
						})
						.then((response) => {
							if (response.status === 200) {
								if (response.data.logged_in) {
									commit('setLoggedin', true);
									resolve(true);
								} else {
									commit('setLoggedin', false);
									resolve(false);
								}
							} else {
								commit('setLoggedin', false);
								resolve(false);
							}
						})
						.catch((error) => {
							// eslint-disable-next-line no-console
							console.error(error);
							reject(error);
						});
				}
			});
		},
	},
	modules: {},
	getters: {
		getLoggedIn: (state) => state.logged_in,
	},
});

export default store;
