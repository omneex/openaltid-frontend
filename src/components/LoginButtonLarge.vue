<template>
	<div
		v-if="!loggedIn"
		class="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-2xl text-white hover:bg-secondary"
	>
		<LoginIcon class="h-6 w-6" />
		<button @click="login">Login</button>
	</div>
	<div
		v-else
		class="flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-2xl text-white hover:bg-secondary"
	>
		<LogoutIcon class="h-6 w-6" />
		<button @click="logout">Logout</button>
	</div>
</template>

<script setup>
import { LoginIcon, LogoutIcon } from '@heroicons/vue/solid';
</script>

<script>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import store from '@/store';

const router = useRouter();

export default {
	name: 'LoginButtonLarge',
	methods: {
		async login() {
			if (!store.getters.getLoggedIn) {
				window.location.replace(
					`${store.state.BACKEND_API_BASEURI}/user/login`,
				);
			}
		},
		async logout() {
			const status = await fetch(
				`${store.state.BACKEND_API_BASEURI}/user/logout`,
				{
					credentials: 'include',
				},
			);

			// eslint-disable-next-line no-console
			console.log(status.json());
			await router.push('/');
		},
	},
	setup() {
		const loggedIn = computed(() => store.getters.getLoggedIn);

		return {
			loggedIn,
		};
	},
};
</script>
