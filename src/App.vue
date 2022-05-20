/* eslint-disable vue/no-side-effects-in-computed-properties */
<template>
  <div class="flex flex-col h-screen">
    <div class="drawer" :data-theme="getDark">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" aria-label="drawer toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="w-full navbar bg-base-300">
          <div class="flex-none lg:hidden">
            <label for="my-drawer-3" class="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block w-6 h-6 stroke-current"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div class="flex-1 px-2 mx-2">
            <div @click="$router.push('/')" @keydown="$router.push('/')" class="btn btn-ghost">
              Open/Alt.ID
            </div>
          </div>
          <div class="flex-none hidden lg:block">
            <ul class="menu menu-horizontal">
              <div class="menu menu-horizontal">
                <div class="form-control mr-5 place-self-center">
                  <label class="label cursor-pointer" for="darkmode_toggle">
                    <div class="mr-2 text-bold text-base-">DARKMODE</div>
                    <input
                      @click="changeDarkState"
                      type="checkbox"
                      class="toggle toggle-accent"
                      checked
                    />
                  </label>
                </div>
              </div>
              <loginDashButtons />
            </ul>
          </div>
        </div>
        <!-- -->
        <div>
          <!-- Page Content / Router View -->
          <router-view />
        </div>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-3" class="drawer-overlay"></label>
        <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
          <!-- Sidebar content here -->
          <div class="menu menu-horizontal place-self-center">
            <div class="form-control mr-5 place-self-center">
              <label class="label cursor-pointer" for="darkmode_toggle">
                <div class="mr-2 text-bold text-slate-100">DARKMODE</div>
                <input
                  @click="changeDarkState"
                  type="checkbox"
                  class="toggle toggle-accent"
                  checked
                />
              </label>
            </div>
          </div>
          <loginDashButtons />
          <a class="btn mx-auto" href="https://github.com/omneex/openaltid">Proudly Open Source</a>
          <a @click="$router.push('privacy')" @keyup="$router.push('privacy')" class="btn mx-auto"
            >Privacy</a
          >
          <!-- -->
        </ul>
      </div>
    </div>
    <div class="footer mx-auto py-2 bg-neutral footer-center hidden md:flex">
      <a class="btn place-self-start" href="https://github.com/omneex/openaltid"
        >Proudly Open Source</a
      >
      <a class="btn place-self-end" href="/privacy">Privacy</a>
    </div>
    <!-- End of Footer -->
  </div>
</template>

<script>
import loginDashButtons from "@/components/Login-Dash-Button.vue";

export default {
  methods: {
    changeDarkState() {
      this.$store.commit("FLIP_DARKMODE_STATE");
    },
  },
  components: {
    loginDashButtons,
  },
  computed: {
    getDark() {
      return this.$store.getters.getDarkModeState;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
