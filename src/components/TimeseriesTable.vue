<template>
  <div class="timeseries-table">
    <table class="table table-secondary table-sm caption-bottom" v-if="Object.keys(rates).length">
      <caption>
        Timeseries Table
      </caption>
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">From</th>
          <th scope="col">To</th>
          <th scope="col">Rate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="rate in mappedRates" :key="rate.date">
          <td>{{ rate.date }}</td>
          <td>{{ rate.from }}</td>
          <td>{{ rate.to }}</td>
          <td>{{ rate.rate }}</td>
        </tr>
      </tbody>
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
