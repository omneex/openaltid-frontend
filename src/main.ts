import { createApp } from "vue";
import VueCookies from "vue3-cookies";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./index.css";

createApp(App).use(store).use(router).use(VueCookies).mount("#app");
