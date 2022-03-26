<template>
	<div class="flex grow flex-col items-center justify-center gap-2">
		<h1 class="text-8xl font-bold text-green-500">Success</h1>
		<h1 class="text-6xl">You should be redirected now!</h1>
	</div>
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
