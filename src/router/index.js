import { createRouter, createWebHistory } from 'vue-router';
import { useStore } from 'vuex';
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
			requiresAuth: false,
		},
		component: Dashboard,
	},
	{
		path: '/privacy',
		name: 'Privacy',
		meta: {
			requiresAuth: false,
		},
		component: Privacy,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

const store = useStore();

router.beforeEach((to, from, next) => {
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		store.dispatch('verifyLogin').then((loggedin) => {
			if (!loggedin) {
				next({ name: 'Verify' });
			} else {
				next();
			}
		});
	} else {
		next(); // does not require auth, make sure to always call next()!
	}
});

export default router;
