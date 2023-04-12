<template>
  <div class="timeseries-view">
    <fieldset
      :disabled="symbolsStoreState.isFetchingSymbols || timeseriesStoreState.isFetchingTimeseries"
    >
      <div class="input-group mb-3">
        <span class="input-group-text">Start Date</span>
        <input class="form-control" type="date" v-model="formState.startDate" />
        <span class="input-group-text">End Date</span>
        <input class="form-control" type="date" v-model="formState.endDate" />
      </div>
      <div class="input-group mb-3">
        <select class="form-select" v-model="formState.base">
          <option
            v-for="(fromSymbol, index) in Object.keys(symbolsStoreState.symbols)"
            :key="index"
            :value="fromSymbol"
          >
            {{ fromSymbol }}
          </option>
        </select>
        <select class="form-select" size="4" multiple v-model="formState.toSymbols">
          <option
            v-for="(fromSymbol, index) in Object.keys(symbolsStoreState.symbols)"
            :key="index"
            :value="fromSymbol"
          >
            {{ fromSymbol }}
          </option>
        </select>
        <span class="input-group-text">Use cmd for multiple selection.</span>
        <button class="btn btn-secondary" @click="checkFormAndSubmit">List</button>
      </div>
    </fieldset>
    <div class="feedback">
      <SpinnerComponent v-if="symbolsStoreState.isFetchingSymbols" message="Fetching Symbols" />
      <SpinnerComponent
        v-if="timeseriesStoreState.isFetchingTimeseries"
        message="Fetching Timeseries"
      />
      <TimeseriesGraph
        :chartData="{
          labels: Object.keys(timeseriesStoreState.rates),
          datasets: timeseriesStoreState.getRatesForGraph
        }"
      />
      <TimeseriesTable
        v-if="Object.keys(timeseriesStoreState.rates).length"
        :tableData="timeseriesStoreState.getRatesForTable"
      />
      <FeedbackComponent
        :shouldShow="symbolsStoreState.isFetchingSymbolsFailed"
        message="Fetching Symbols Failed"
      />
      <FeedbackComponent
        :shouldShow="timeseriesStoreState.isFetchingTimeseriesFailed"
        message="Fetching Timeseries Failed"
      />
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExchangeApiSymbolsStore, useExchangeApiTimeSeriesStore } from '@/stores/exchangeStore'
import {
  FeedbackComponent,
  TimeseriesGraph,
  TimeseriesTable,
  SpinnerComponent
} from '../components'
import { checkIfInDateLimits } from '../functions'

export default {
  components: {
    FeedbackComponent,
    TimeseriesGraph,
    TimeseriesTable,
    SpinnerComponent
  },
  setup() {
    const symbolsStore = useExchangeApiSymbolsStore()
    const timeseriesStore = useExchangeApiTimeSeriesStore()

    const symbolsStoreState = ref(storeToRefs(symbolsStore))
    const timeseriesStoreState = ref(storeToRefs(timeseriesStore))
    const formState = reactive({
      startDate: new Date().toISOString().slice(0, 10),
      endDate: new Date().toISOString().slice(0, 10),
      base: 'TRY',
      toSymbols: ['USD']
    })

    const checkFormAndSubmit = () => {
      if (!formState.startDate || !formState.endDate || !formState.base || !formState.toSymbols) {
        alert('Please fill the form.')
        return
      }

      if (!checkIfInDateLimits(formState.startDate, formState.endDate, 30)) {
        alert('Maximum 30 days long date selections are accepted.')
        return
      }

      timeseriesStore.fetchExchangeApiTimeSeries(
        formState.startDate,
        formState.endDate,
        formState.base,
        formState.toSymbols.join(',')
      )
    }

    return {
      symbolsStoreState,
      timeseriesStoreState,
      formState,
      checkFormAndSubmit
    }
  }
}
</script>
