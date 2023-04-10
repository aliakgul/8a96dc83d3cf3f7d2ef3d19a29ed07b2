<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="app">
    <header>
      <nav>
        <RouterLink to="/">Home Page</RouterLink> | <RouterLink to="/about">About Page</RouterLink>
      </nav>
    </header>

    <RouterView />
  </div>
</template>

<style>
.app {
  text-align: center;
  font-size: 30px;
}
</style>
