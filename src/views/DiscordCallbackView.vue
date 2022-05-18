<template>
    <div class="hero">
        <div class="hero-content flex-col py-14">
            <p class="text-4xl sm:text-5xl lg:text-8xl">SUCCESS</p>
            <p class="text-xl sm:text-2xl lg:text-5xl">You should be redirected now.</p>
        </div>
    </div>
</template>

<script>
export default {
  name: 'DiscordRedirect',
  mounted() {
    if (this.$route.query.code && !this.$store.getters.getLoggedIn) {
      this.$store.dispatch('login', this.$route.query).then((success) => {
        if (success) {
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/');
        }
      }).catch(() => {
        this.$router.push('/');
      });
    } else {
      this.$router.push('/');
    }
  },
};
</script>

<style scoped>

</style>
