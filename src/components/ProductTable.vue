<script setup lang="ts">
import { onMounted } from "vue";
import { useProductStore } from "../store/products";
const store = useProductStore();

onMounted(() => store.load(1));

function prev(){ if (store.page > 1) store.load(store.page - 1); }
function next(){ if (store.page < store.totalPages) store.load(store.page + 1); }
</script>

<template>
  <div class="card section">
    <div class="space-between" style="margin-bottom:10px">
      <h2 class="h2">Productos</h2>
      <span class="badge">Total: {{ store.total }}</span>
    </div>

    <!-- Loader skeleton -->
    <div v-if="store.loading" class="loader">
      <div class="table-skeleton" style="width:100%">
        <div class="row" v-for="i in 6" :key="i">
          <span class="skeleton" style="width:56px;height:56px;border-radius:12px"></span>
          <span class="skeleton" style="width:60%"></span>
          <span class="skeleton" style="width:30%"></span>
          <span class="skeleton" style="width:20%"></span>
          <span class="skeleton" style="width:15%"></span>
          <span class="skeleton" style="width:15%"></span>
        </div>
      </div>
    </div>

    <!-- Error -->
    <p v-else-if="store.error" style="color:var(--danger)">{{ store.error }}</p>

    <!-- Tabla -->
    <div v-else style="overflow:auto">
      <table class="table">
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Título</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Rating</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in store.items" :key="p.id">
            <td><img :src="p.thumbnail" :alt="p.title" class="thumb" /></td>
            <td style="font-weight:600">{{ p.title }}</td>
            <td class="muted">{{ p.category }}</td>
            <td><span class="badge">💲 {{ p.price }}</span></td>
            <td><span class="badge">⭐ {{ p.rating }}</span></td>
            <td><span class="badge">📦 {{ p.stock }}</span></td>
          </tr>
        </tbody>
      </table>

      <div class="pagination">
        <button class="btn outline" @click="prev" :disabled="store.page === 1">« Anterior</button>
        <span class="badge">Página {{ store.page }} / {{ store.totalPages }}</span>
        <button class="btn" @click="next" :disabled="store.page >= store.totalPages">Siguiente »</button>
      </div>
    </div>
  </div>
</template>
