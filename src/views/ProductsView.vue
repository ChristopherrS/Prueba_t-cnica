<script setup lang="ts">
import ProductTable from "../components/ProductTable.vue";
</script>

<template>
  <div class="container">
    <h1>Tabla de Productos</h1>
    <ProductTable />
  </div>
</template>

<style scoped>
.container { max-width: 1024px; margin: 2rem auto; padding: 0 1rem; }
</style>
