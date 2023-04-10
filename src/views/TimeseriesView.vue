<template>
  <div class="timeseries-view">
    <input type="date" v-model="startDate" />
    <input type="date" v-model="endDate" />
    <select v-model="base">
      <option v-for="(fromSymbol, index) in Object.keys(symbols)" :key="index" :value="fromSymbol">
        {{ fromSymbol }}
      </option>
    </select>
    <select multiple v-model="symbolsString">
      <option v-for="(fromSymbol, index) in Object.keys(symbols)" :key="index" :value="fromSymbol">
        {{ fromSymbol }}
      </option>
    </select>
    <button @click="list">List</button>
    <TimeseriesTable :rates="rates" :base="base" />
    <TimeseriesGraph :rates="rates" :base="base" />

    <FeedbackComponent v-if="isFetching" feedback="Fetching" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExchangeApiSymbolsStore, useExchangeApiTimeSeriesStore } from '@/stores/exchangeStore'
import { FeedbackComponent, TimeseriesGraph, TimeseriesTable } from '../components'

const timeSeriesStore = useExchangeApiTimeSeriesStore()

const { symbols } = storeToRefs(useExchangeApiSymbolsStore())
const { rates } = storeToRefs(timeSeriesStore)

const startDate = ref(new Date().toISOString().slice(0, 10))
const endDate = ref(new Date().toISOString().slice(0, 10))
const base = ref('TRY')
const symbolsString = ref(['USD'])

const isFetching = ref(false)

const list = () => {
  if (startDate.value && endDate.value && base.value && symbols.value) {
    timeSeriesStore.fetchExchangeApiTimeSeries(startDate.value, endDate.value, base, symbolsString)
  }
}
</script>
