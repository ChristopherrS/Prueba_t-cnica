// src/store/products.ts
import { defineStore } from "pinia";
import { getProducts } from "../api/product";
import type { Product } from "../types/product";

export const useProductStore = defineStore("products", {
  state: () => ({
    items: [] as Product[],
    total: 0,
    page: 1,
    pageSize: 10,
    loading: false,
    error: "" as string,
  }),
  getters: {
    totalPages(state): number {
      return Math.max(1, Math.ceil(state.total / state.pageSize));
    },
  },
  actions: {
    async load(page = 1) {
      this.loading = true;
      this.error = "";
      this.page = page;
      try {
        const skip = (page - 1) * this.pageSize;
        const res = await getProducts(this.pageSize, skip);
        this.items = res.products;
        this.total = res.total;
      } catch (e: any) {
        this.error =
          e?.response?.data?.message ||
          e?.message ||
          "Error al cargar productos";
        this.items = [];
      } finally {
        this.loading = false;
      }
    },
  },
});
