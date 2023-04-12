<template>
  <div class="timeseries-graph">
    <LineChart :options="chartOptions" :data="chartData" />
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

ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale)

export default {
  components: { LineChart },
  props: {
    chartData: {
      type: Object,
      default() {
        return { labels: [], datasets: [] }
      }
    },
    chartOptions: {
      type: Object,
      default() {
        return { responsive: true }
      }
    }
  }
}
</script>
