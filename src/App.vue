<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <nav>
      <RouterLink to="/">Conversion Page</RouterLink> |
      <RouterLink to="/timeseries">Timeseries Page</RouterLink> |
      <RouterLink to="/history">History Page</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>

<style>
.app {
  text-align: center;
  font-size: 1.3rem;
}
</style>
