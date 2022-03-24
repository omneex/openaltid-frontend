<template>

    <div class="flex-fill">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">{{ store.state.BRANDING_HOME_LINK }}</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                  <b-nav-item-dropdown right>
                        <template #button-content>
                            OPTIONS
                        </template>

                        <b-dropdown-item href="/dashboard">DASHBOARD</b-dropdown-item>
                    <b-dropdown-item href="/privacy">PRIVACY NOTICE</b-dropdown-item>

                    <b-dropdown-item class="mx-auto">
                            <LoginButton></LoginButton>
                        </b-dropdown-item>
                        <b-dropdown-item class="mx-auto">
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div class="vh-100">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import LoginButton from '@/components/LoginButton.vue';
import store from '@/store';

export default {
	components: { LoginButton },
	setup() {
		return { store };
	},
};
</script>
