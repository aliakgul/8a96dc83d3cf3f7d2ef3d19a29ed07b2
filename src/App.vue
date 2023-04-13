<template>
  <div class="app container text-center">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink class="nav-link" to="/"
          >Conversion Page <i class="bi bi-currency-exchange"></i
        ></RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/timeseries"
          >Timeseries Page <i class="bi bi-graph-up-arrow"></i
        ></RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink class="nav-link" to="/history"
          >History Page <i class="bi bi-calendar2-day"></i
        ></RouterLink>
      </li>
    </ul>
    <RouterView />
  </div>
</template>

<script>
import { RouterLink, RouterView } from 'vue-router'
import { useExchangeApiSymbolsStore } from '@/stores/exchangeStore'
import { onMounted } from 'vue'

export default {
  setup() {
    const exchangeStore = useExchangeApiSymbolsStore()

    onMounted(() => {
      exchangeStore.fetchExchangeApiSymbols()
    })

    return { RouterLink, RouterView }
  }
}
</script>
