<template>
    <h1>SUCCESS, YOU SHOULD BE REDIRECTED!</h1>
</template>

<script>
import { useRoute, useRouter } from 'vue-router';
import store from '@/store';

const router = useRouter();
const route = useRoute();

export default {
	name: 'DiscordRedirect',
	mounted() {
		if (route.query.code && !store.getters.getLoggedIn) {
			store.dispatch('login', route.query).then((success) => {
				if (success) {
					router.push('/dashboard');
				} else {
					router.push('/');
				}
			});
		} else {
			router.push('/');
		}
	},
};
</script>
