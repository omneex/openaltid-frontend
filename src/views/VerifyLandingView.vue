<template>
  <div class="hero">
    <div class="hero-content flex-col py-14">
      <div v-if="hasCode">
        <p class="text-4xl sm:text-5xl lg:text-8xl">Welcome!</p>
        <p class="max-w-lg text-ls sm:text-1xl lg:text-4xl">
          Click the login button at the top right of your screen to login with Discord to continue.
        </p>
        <p class="max-w-lg text-ls sm:text-1xl lg:text-lg">
          If you got here without following a link from a bot, turn back now.
        </p>
      </div>
      <div v-else>
        <p class="text-4xl sm:text-5xl lg:text-8xl">Welcome!</p>
        <p class="max-w-lg text-ls sm:text-1xl lg:text-4xl">
          Looks like you got here without following a link from the bot so you won't be able to do
          anything.
        </p>
        <p class="max-w-lg text-ls sm:text-1xl lg:text-lg">
          Turn back now and follow a link from the bot to continue.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hasCode: false,
    };
  },
  created() {
    if (this.$route.query.code) {
      this.hasCode = true;
      this.$cookies.set("identifier", this.$route.query.code);
    }
  },
};
</script>

<style scoped></style>
