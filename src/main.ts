import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import { useAuthStore } from "./store/auth";
import App from "./App.vue";
import "./assets/styles.css";

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

router.beforeEach((to) => {
  const auth = useAuthStore(pinia);
  const token = auth.token || localStorage.getItem("auth.token") || "";
  if (to.name !== "login" && !token) return { name: "login" };
  if (to.name === "login" && token) return { name: "dashboard" };
});

app.use(router);
app.mount("#app");
