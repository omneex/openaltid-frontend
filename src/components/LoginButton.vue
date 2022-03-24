<template>
    <b-button size="lg" v-if="!loggedIn" @click="login" class="mx-auto">
        LOGIN
    </b-button>
    <b-button v-else size="lg" @click="logout" class="mx-auto">
        LOGOUT
    </b-button>
</template>

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
				window.location.replace(`${store.state.BACKEND_API_BASEURI}/user/login`);
			}
		},
		async logout() {
			const status = await fetch(`${store.state.BACKEND_API_BASEURI}/user/logout`, {
				credentials: 'include',
			});

			// eslint-disable-next-line no-console
			console.log(status.json());
			await router.push('Home', () => { router.go(); });
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

<style scoped>

</style>
