<template>
  <div class="timeseries-view">
    <div class="input-group mb-3">
      <span class="input-group-text">Start Date</span>
      <input class="form-control" type="date" v-model="startDate" />
      <span class="input-group-text">End Date</span>
      <input class="form-control" type="date" v-model="endDate" />
    </div>
    <div class="input-group mb-3">
      <select class="form-select" v-model="base">
        <option
          v-for="(fromSymbol, index) in Object.keys(symbols)"
          :key="index"
          :value="fromSymbol"
        >
          {{ fromSymbol }}
        </option>
      </select>
      <select class="form-select" size="4" multiple v-model="symbolsString">
        <option
          v-for="(fromSymbol, index) in Object.keys(symbols)"
          :key="index"
          :value="fromSymbol"
        >
          {{ fromSymbol }}
        </option>
      </select>
      <span class="input-group-text">Use cmd for multiple selection.</span>
      <button
        class="btn btn-secondary"
        @click="list"
        :disabled="isFetchingSymbols || isFetchingTimeseries"
      >
        List
      </button>
    </div>
    <div class="feedback">
      <SpinnerComponent message="Fetching Symbols" v-if="isFetchingSymbols" />
      <SpinnerComponent message="Fetching Conversion" v-if="isFetchingTimeseries" />
      <TimeseriesGraph
        :chartData="{
          labels: Object.keys(rates),
          datasets: formatRatesForGraph(rates)
        }"
        :chartOptions="{ responsive: true }"
      />
      <TimeseriesTable
        v-if="Object.keys(rates).length"
        :tableData="mapRates(rates, { from: base })"
      />
      <FeedbackComponent :shouldShow="isFetchingSymbolsFailed" message="Fetching Symbols Failed" />
      <FeedbackComponent
        :shouldShow="isFetchingTimeseriesFailed"
        message="Fetching Timeseries Failed"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExchangeApiSymbolsStore, useExchangeApiTimeSeriesStore } from '@/stores/exchangeStore'
import {
  FeedbackComponent,
  TimeseriesGraph,
  TimeseriesTable,
  SpinnerComponent
} from '../components'
import { checkIfInDateLimits, formatRatesForGraph, mapRates } from '../functions'

const timeSeriesStore = useExchangeApiTimeSeriesStore()

const { symbols, isFetchingSymbols, isFetchingSymbolsFailed } = storeToRefs(
  useExchangeApiSymbolsStore()
)
const { rates, isFetchingTimeseries, isFetchingTimeseriesFailed } = storeToRefs(timeSeriesStore)

const startDate = ref(new Date().toISOString().slice(0, 10))
const endDate = ref(new Date().toISOString().slice(0, 10))
const base = ref('TRY')
const symbolsString = ref(['USD'])

const list = () => {
  if (!checkIfInDateLimits(startDate.value, endDate.value, 30)) {
    alert('Maximum 30 days long date selections are accepted.')
    return
  }

  if (startDate.value && endDate.value && base.value && symbols.value) {
    timeSeriesStore.fetchExchangeApiTimeSeries(
      startDate.value,
      endDate.value,
      base.value,
      symbolsString.value.join(',')
    )
  }
}
</script>
