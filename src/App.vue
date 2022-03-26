<template>

    <div class="flex-fill">
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand href="/">{{this.$store.state.BRANDING_HOME_LINK}}</b-navbar-brand>
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

<style lang="scss">
@import "assets/custom-vars.scss";

$enable-shadows: true;
$body-bg: #2c3e50;

@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
root {
    color: #2c3e50;
}
</style>
<script>
import LoginButton from "@/components/LoginButton.vue";
export default {
    components: {LoginButton},
    data() {
        return {
            navBarBrand: this.$store.state.BRANDING_SHORT_BANNER,
        }
    },
}
</script>