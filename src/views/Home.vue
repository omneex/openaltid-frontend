<template>
	<div class="flex grow flex-col items-center justify-center gap-2">
		<h1 class="text-6xl font-bold">{{ store.state.BRANDING_LONG }}</h1>
		<h2 class="max-w-6xl text-center text-2xl">
			This website is dedicated for verifying users in the
			{{ store.state.BRANDING_SHORT }} Discord server. You can't do
			anything here without the link from the verification bot.
		</h2>

		<a
			class="mt-4 rounded-lg bg-primary px-4 py-2 text-2xl text-white hover:bg-secondary"
			:href="store.state.BRANDING_LINK"
		>
			Join the server
		</a>
	</div>
</template>

<script>
import store from '@/store';

export default {
	name: 'Home',
	setup() {
		return { store };
	},
};
</script>
