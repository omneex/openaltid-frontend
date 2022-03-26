<template>
	<div class="flex grow">
		<div
			class="flex grow flex-col items-center justify-center gap-4"
			v-if="!store.getters.getLoggedIn"
		>
			<h1 class="text-6xl font-bold">You must login first!</h1>
			<h2 class="max-w-6xl text-center text-3xl">
				Click the button below to login with your Discord account.
			</h2>
			<LoginButtonLarge />
		</div>
		<div
			class="flex grow flex-col items-center justify-center gap-4"
			v-else
		>
			<h1 class="text-8xl font-bold text-green-500">Success</h1>
			<h1 class="text-6xl">You should be redirected now!</h1>
		</div>
	</div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
import { useRoute } from 'vue-router';
import LoginButtonLarge from '@/components/LoginButtonLarge.vue';
import store from '@/store';

const { cookies } = useCookies();
const route = useRoute();

export default {
	name: 'Verify',
	components: {
		LoginButtonLarge,
	},
	mounted() {
		cookies.set('identifier', route.params.identifier, '1h');
	},
	setup() {
		return { store };
	},
};
</script>

<style>
.iframe-container {
	position: relative;
	overflow: hidden;
	flex: auto;
}
</style>
