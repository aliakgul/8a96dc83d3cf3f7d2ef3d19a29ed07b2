<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useExchangeApiSymbolsStore } from '@/stores/exchangeStore'
import { onMounted } from 'vue'

onMounted(() => {
  useExchangeApiSymbolsStore().fetchExchangeApiSymbols()
})
</script>

<template>
  <div class="app">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link router-link" to="/"
                >Conversion Page <i class="bi bi-currency-exchange"></i
              ></RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link router-link" to="/timeseries"
                >Timeseries Page <i class="bi bi-graph-up-arrow"></i
              ></RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link router-link" to="/history"
                >History Page <i class="bi bi-calendar2-day"></i
              ></RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView />
  </div>
</template>

<style>
.app {
  font-family: 'Maven Pro', sans-serif;
  text-align: center;
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.router-link {
  text-decoration: none;
  color: unset;
}

.router-link:hover {
  color: unset;
}
</style>
