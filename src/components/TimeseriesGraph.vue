<template>
  <div class="timeseries-graph">
    <LineChart v-if="Object.keys(rates).length" :options="chartOptions" :data="chartData" />
    <div>If the chart is not visible, please visit another page than come back. (implementation bug)</div>
  </div>
</template>

<script>
import { Line as LineChart } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
} from 'chart.js'
import { formatRatesForGraph } from '../functions'

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default {
  name: 'TimeseriesGraph',
  components: { LineChart },
  props: {
    rates: Object
  },
  data() {
    return {
      chartData: {
        labels: Object.keys(this.rates),
        datasets: formatRatesForGraph(this.rates)
      },
      chartOptions: { responsive: true }
    }
  }
}
</script>
