<template>
  <div class="timeseries-graph">Timeseries Graph</div>
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
