<template>
  <div class="timeseries-graph">
    <div v-if="Object.keys(rates).length">Timeseries Graph</div>
  </div>
</template>

<script>
export default {
  name: 'TimeseriesGraph',
  props: {
    rates: Object,
    base: String
  }
}
</script>
