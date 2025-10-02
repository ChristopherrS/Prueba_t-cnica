// src/store/auth.ts
import { defineStore } from "pinia";
import { loginApi } from "../api/auth";
import type { LoginRequest, LoginResponse } from "../types/auth";

const TOKEN_KEY = "auth.token";
const USER_KEY = "auth.user";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: (localStorage.getItem(TOKEN_KEY) || "") as string,
    user: (localStorage.getItem(USER_KEY)
      ? JSON.parse(localStorage.getItem(USER_KEY) as string)
      : null) as LoginResponse | null,
    loading: false as boolean,
    error: "" as string,
  }),
  actions: {
    async login(credentials: LoginRequest): Promise<{ ok: boolean }> {
      this.error = "";
      this.loading = true;
      try {
        const data = await loginApi(credentials);
        // setea estado y persiste
        this.token = data.token;
        this.user = data;
        localStorage.setItem(TOKEN_KEY, data.token);
        localStorage.setItem(USER_KEY, JSON.stringify(data));
        return { ok: true };            // 👈 devolvemos éxito
      } catch (e: any) {
        this.error =
          e?.response?.data?.message ||
          e?.message ||
          "Error al iniciar sesión";
        this.token = "";
        this.user = null;
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        return { ok: false };           
      } finally {
        this.loading = false;
      }
    },
    logout() {
      this.token = "";
      this.user = null;
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },
  },
});
