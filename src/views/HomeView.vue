<template>
  <div class="hero flex-col py-1 sm:py-12">
    <div class="hero-content text-center text-base">
      <div class="max-w-xs md:max-w-md">
        <h1 class="text-3xl font-bold md:text-5xl">Hi there!</h1>
        <p class="py-1 font-bold">
          This is the home page for the open source project Open/Alt.ID. You can not do anything
          here without first following a link sent to you by the bot.
        </p>
        <p class="py-10 text-center">
          If you would like to know more about this project and possibly use it on your own server,
          join the support server below.
        </p>
        <button class="btn btn-accent py-4 text-stone-700">Open/Alt.ID Support Server</button>
        <stats />
      </div>
    </div>
  </div>
</template>

<script>
import stats from "@/components/Stats-Banner.vue";

export default {
  created() {
    console.log("view");
    console.log();
  },
  components: {
    stats,
  },
};
</script>
