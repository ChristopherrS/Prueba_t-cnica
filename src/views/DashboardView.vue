<!-- src/views/DashboardView.vue -->
<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { useRouter, RouterLink } from "vue-router";

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  router.replace({ name: "login" });
}
</script>

<template>
 <section class="card section">
    <h2 class="h1">¡Bienvenida, {{ auth.user?.firstName }}! 🎉</h2>
    <p class="muted">Explora el catálogo de productos y prueba la paginación.</p>
    <div class="row" style="gap:12px;margin-top:16px">
      <RouterLink class="btn" to="/products">Ver productos</RouterLink>
      <button class="btn outline" @click="logout">Cerrar sesión</button>
    </div>
  </section>
</template>

<style scoped>
.wrap { max-width: 720px; margin: 2rem auto; padding: 1rem; }
.actions { margin-top: 1rem; display: flex; gap: 12px; }
.btn { padding: 10px 14px; border-radius: 10px; border: none; cursor: pointer; background: #111; color: #fff; }
.btn.outline { background: #fff; color: #111; border: 1px solid #111; }
</style>
