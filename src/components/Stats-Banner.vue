<template>
<div class="my-10 indicator">
    <h1>
      <span class="badge badge-lg indicator-item indicator-center ">Verifications</span>
    </h1>
    <div class="stats my-1 bg-base-200" >
      <div class="stat ">
        <div class="stat-title">Attempted</div>
        <div class="stat-value">{{attempted}}</div>
      </div>

      <div class="stat">
        <div class="stat-title">Successful</div>
        <div class="stat-value">{{successful}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    setAttempted(val) {
      this.attempted = val;
    },
    setSuccessful(val) {
      this.successful = val;
    },
  },
  data() {
    return {
      successful: 0,
      attempted: 0,
    };
  },
  created() {
    this.setAttempted(Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(2500));
    this.setSuccessful(Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(700));
  },
  computed: {
    getDarkModeState() {
      return this.$store.getters.getDarkModeState === 'dark';
    },
  },
};

</script>
<style lang="">

</style>
