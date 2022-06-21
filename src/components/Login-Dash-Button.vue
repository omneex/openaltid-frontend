<template>
  <a v-if="getLoggedIn" class="btn btn-accent my-auto"
    ><router-link to="/dashboard">DAHSBOARD</router-link></a
  >
  <a v-else class="btn btn-accent my-aut" :href="getLoginURL">Login with Discord</a>
</template>

<script>
export default {
  async created() {
    await this.$store.dispatch("checkLoggedIn");
  },
  computed: {
    getLoggedIn() {
      return this.$store.getters.getLoggedIn;
    },
    getLoginURL() {
      return `${this.$store.state.BACKEND_API_BASEURI}/login/discord`;
    },
  },
};
</script>
