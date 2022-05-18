<template>
  <a v-if='getLoggedIn' class="btn btn-accent my-auto">Dashboard</a>
  <a v-else class="btn btn-accent my-auto">Login with Discord</a>
</template>

<script>
export default {
  computed: {
    getLoggedIn() {
      this.$store.commit('checkLoggedIn');
      return this.$store.getters.getLoggedIn;
    },
  },
};
</script>
