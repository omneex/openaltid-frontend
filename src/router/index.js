import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import Home from '../views/Home.vue';
import Dashboard from '@/views/Dashboard';
import Verify from '@/views/Verify';
import DiscordRedirect from '@/views/DiscordRedirect';
import Privacy from '@/views/Privacy';

const routes = [
	{
		path: '/home',
		name: 'Home',
		props: true,
		component: Home,
	},
	{
		path: '/',
		name: 'root',
		props: true,
		component: Home,
	},
	{
		path: '/verify/:identifier',
		name: 'Verify',
		props: true,
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: Verify,
	},
	{
		path: '/discordredirect',
		name: 'DiscordRedirect',
		props: true,
		component: DiscordRedirect,
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		meta: {
			requiresAuth: true,
		},
		component: Dashboard,
	},
	{
		path: '/privacy',
		name: 'Privacy',
		meta: {
			title: 'Open/Alt.ID - Privacy Policy',
			requiresAuth: false,
		},
		component: Privacy,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to) => {
	document.title = to.meta.title ?? 'Open/Alt.ID';
});

router.beforeEach(async (to) => {
	if (to.meta.requiresAuth) {
		const loggedin = await store.dispatch('verifyLogin').catch((error) => {
			// eslint-disable-next-line no-console
			console.error(error);
		});

		if (!loggedin) {
			return { name: 'Verify', params: { identifier: 'none' } };
		}
		return true;
	}
	return true;
});

export default router;
