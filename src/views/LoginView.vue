<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../store/auth";
const router = useRouter();
const auth = useAuthStore();

const form = reactive({ username:"", password:"" });
const canSubmit = computed(() =>
  form.username.trim() && form.password.trim() && !auth.loading
);
async function onSubmit(){
  const { ok } = await auth.login({ username: form.username, password: form.password });
  if (ok) await router.replace({ name:"dashboard" });
}
</script>

<template>
  <div class="card section" style="max-width:520px;margin:60px auto">
    <h1 class="h1">Iniciar sesión</h1>
    <p class="muted" style="margin:-6px 0 18px">Ingresa tus credenciales.</p>

    <form @submit.prevent="onSubmit" style="display:grid;gap:14px">
      <label>
        <div class="muted" style="margin-bottom:6px">Username</div>
        <input class="input" v-model="form.username" placeholder="emilys" :disabled="auth.loading" />
      </label>

      <label>
        <div class="muted" style="margin-bottom:6px">Password</div>
        <input class="input" type="password" v-model="form.password" placeholder="••••••••" :disabled="auth.loading" />
      </label>

      <button class="btn" type="submit" :disabled="!canSubmit">
        <span v-if="auth.loading">Autenticando…</span>
        <span v-else>Entrar</span>
      </button>

      <p v-if="auth.error" style="color:var(--danger);margin:6px 2px 0">{{ auth.error }}</p>
    </form>
  </div>
</template>
