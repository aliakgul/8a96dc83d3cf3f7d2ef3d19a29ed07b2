<template>
  <div class="timeseries-view">
    <div class="form">
      <input type="date" v-model="startDate" />
      <input type="date" v-model="endDate" />
      <select v-model="base">
        <option
          v-for="(fromSymbol, index) in Object.keys(symbols)"
          :key="index"
          :value="fromSymbol"
        >
          {{ fromSymbol }}
        </option>
      </select>
      <select multiple v-model="symbolsString">
        <option
          v-for="(fromSymbol, index) in Object.keys(symbols)"
          :key="index"
          :value="fromSymbol"
        >
          {{ fromSymbol }}
        </option>
      </select>
      <button @click="list" :disabled="isFetchingSymbols || isFetchingTimeseries">List</button>
    </div>
    <div class="feedback">
      <small>Please use ctrl/cmd for multiple selection</small>
      <TimeseriesTable :rates="rates" :base="base" />
      <TimeseriesGraph :rates="rates" />
      <FeedbackComponent v-if="isFetchingSymbols" feedback="Fetching Symbols" />
      <FeedbackComponent v-if="isFetchingSymbolsFailed" feedback="Fetching Symbols Failed" />
      <FeedbackComponent v-if="isFetchingTimeseries" feedback="Fetching Timeseries" />
      <FeedbackComponent v-if="isFetchingTimeseriesFailed" feedback="Fetching Timeseries Failed" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExchangeApiSymbolsStore, useExchangeApiTimeSeriesStore } from '@/stores/exchangeStore'
import { FeedbackComponent, TimeseriesGraph, TimeseriesTable } from '../components'
import { checkIfInDateLimits } from '../functions'

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
