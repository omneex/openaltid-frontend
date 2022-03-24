<template>
	<div v-if="!loggedIn" class="flex items-center gap-1">
		<LoginIcon class="h-4 w-4" />
		<button @click="login">Login</button>
	</div>
	<div v-else class="flex items-center gap-1">
		<LogoutIcon class="h-4 w-4" />
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
	name: 'LoginButton',
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
			await router.push('Home', () => {
				router.go();
			});
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
