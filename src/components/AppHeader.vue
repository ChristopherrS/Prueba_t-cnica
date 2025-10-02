<script setup lang="ts">
import { useAuthStore } from "../store/auth";
import { RouterLink, useRouter } from "vue-router";
const auth = useAuthStore();
const router = useRouter();
function logout(){
  auth.logout();
  router.replace({ name:"login" });
}
</script>

<template>
  <header class="header">
    <div class="container nav">
      <div class="brand">
        <span class="dot"></span>
        <span>Vue Tech Test</span>
      </div>

      <nav class="row" style="gap:16px">
        <RouterLink class="badge" to="/dashboard">Dashboard</RouterLink>
        <RouterLink class="badge" to="/products">Productos</RouterLink>
        <span v-if="auth.user" class="badge">👤 {{ auth.user.firstName }}</span>
        <button v-if="auth.user" class="btn outline" @click="logout">Cerrar sesión</button>
      </nav>
    </div>
  </header>
</template>
