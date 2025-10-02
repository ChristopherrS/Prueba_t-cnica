import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProductsView from "../views/ProductsView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", name: "login", component: LoginView },
    { path: "/dashboard", name: "dashboard", component: DashboardView },
    { path: "/products", name: "products", component: ProductsView },
    { path: "/", redirect: "/login" },
  ],
});

export default router;
