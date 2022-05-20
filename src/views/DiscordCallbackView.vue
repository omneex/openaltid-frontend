<template>
  <div class="hero">
    <div v-if="done" class="hero-content flex-col py-14">
      <p class="text-5xl text-green-500 xs:text-5xl lg:text-8xl">SUCCESS</p>
      <button router class="btn btn-lg">
        <router-link to="/dashboard">GO TO DASHBOARD</router-link>
      </button>
    </div>
    <div v-else class="hero-content flex-col py-14">
      <button class="btn btn-lg loading disabled">Please wait...</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DiscordRedirect",
  data() {
    return {
      done: false,
      error: false,
      errorText: "",
    };
  },
  created() {
    const { query } = this.$route;
    if (query.code && !this.$store.getters.getLoggedIn) {
      axios
        .post(
          `${this.$store.state.BACKEND_API_BASEURI}/login/discord/callback?code=${query.code}&state=${query.state}`,
          {
            body: JSON.stringify({
              query,
            }),
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.$store.state.loggedIn = true;
            this.done = true;
          } else {
            this.$store.state.loggedIn = false;
          }
        })
        .catch((error) => {
          console.error(error);
          this.error = true;
          this.errorText = "Failed to log you in...";
        });
    } else {
      this.done = true;
    }
  },
  computed: {
    getDone() {
      return this.done;
    },
  },
};
</script>

<style scoped></style>
