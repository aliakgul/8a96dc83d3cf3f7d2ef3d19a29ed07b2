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
  name: 'TimeseriesGraph',
  components: { LineChart },
  props: {
    chartData: Object,
    chartOptions: Object
  }
}
</script>
