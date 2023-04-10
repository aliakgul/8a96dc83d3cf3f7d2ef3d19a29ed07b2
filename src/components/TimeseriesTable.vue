<template>
  <div class="timeseries-table">
    <table v-if="Object.keys(rates).length">
      <tr>
        <th>Date</th>
        <th>From Currency</th>
        <th>To Currency</th>
        <th>Rate</th>
      </tr>
      <tr v-for="rate in mappedRates" :key="rate.date">
        <th>{{ rate.date }}</th>
        <th>{{ rate.from }}</th>
        <th>{{ rate.to }}</th>
        <th>{{ rate.rate }}</th>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapRates } from '../functions'

export default {
  name: 'TimeseriesTable',
  props: {
    rates: Object,
    base: String
  },
  computed: {
    mappedRates() {
      return mapRates(this.rates, { from: this.base })
    }
  }
}
</script>
