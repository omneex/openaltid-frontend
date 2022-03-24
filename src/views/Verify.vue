<template>
    <div class="h-100 d-flex justify-content-center align-items-center flex-fill">
            <b-card
                    style="max-width: 20rem;"
                    v-if="!store.getters.getLoggedIn"
            >
                <b-card-header>
                    You must login first.
                </b-card-header>
                <h3>Click the button below to login with your Discord account.</h3>
                <LoginButton></LoginButton>
            </b-card>
            <b-jumbotron v-else>
                <template #lead>YOU SHOULD BE REDIRECTED!</template>
            </b-jumbotron>
    </div>
</template>

<script>
import { useCookies } from 'vue3-cookies';
import { useRoute } from 'vue-router';
import LoginButton from '@/components/LoginButton.vue';
import store from '@/store';

const { cookies } = useCookies();
const route = useRoute();

export default {
	name: 'Verify',
	components: {
		LoginButton,
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
