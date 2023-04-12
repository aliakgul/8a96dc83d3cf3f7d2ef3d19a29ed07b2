<template>
  <div class="conversion-view">
    <div class="input-group mb-3">
      <div class="input-group mb-3">
        <span class="input-group-text">Date</span>
        <input class="form-control" type="date" v-model="date" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">From</span>
        <select class="form-select" v-model="from">
          <option
            v-for="(fromSymbol, index) in Object.keys(symbols)"
            :key="index"
            :value="fromSymbol"
          >
            {{ fromSymbol }}
          </option>
        </select>
        <input class="form-control" type="number" min="1" step="1" v-model="amount" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text">To</span>
        <select class="form-select" v-model="to">
          <option v-for="(toSymbol, index) in Object.keys(symbols)" :key="index" :value="toSymbol">
            {{ toSymbol }}
          </option>
        </select>
        <input class="form-control" type="number" v-model="result" disabled />
      </div>
      <div class="input-group mb-3">
        <button class="btn btn-secondary" @click="swapCurrencies">Swap Currencies</button>
      </div>
    </div>
    <SpinnerComponent message="Fetching Symbols" v-if="isFetchingSymbols" />
    <SpinnerComponent message="Fetching Conversion" v-if="isFetchingConversion" />
    <h3 v-if="rate">
      1 {{ symbols[from] }} equals
      <br />
      {{ rate }} {{ symbols[to] }}
    </h3>
    <FeedbackComponent :shouldShow="isFetchingSymbolsFailed" message="Fetching Symbols Failed" />
    <FeedbackComponent
      :shouldShow="isFetchingConversionFailed"
      message="Fetching Conversion Failed"
    />
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExchangeApiSymbolsStore, useExchangeApiConvertStore } from '@/stores/exchangeStore'
import { FeedbackComponent, SpinnerComponent } from '../components'

const convertStore = useExchangeApiConvertStore()

const { symbols, isFetchingSymbols, isFetchingSymbolsFailed } = storeToRefs(
  useExchangeApiSymbolsStore()
)
const { rate, result, isFetchingConversion, isFetchingConversionFailed } = storeToRefs(convertStore)

const date = ref(new Date().toISOString().slice(0, 10))
const from = ref('TRY')
const to = ref('USD')
const amount = ref(1)

const swapCurrencies = () => {
  const fromInitial = from.value
  from.value = to.value
  to.value = fromInitial
}

watch([date, amount, from, to], () => {
  if (date.value && amount.value && from.value && to.value) {
    convertStore.fetchExchangeApiConvert(from.value, to.value, amount.value, date.value)
  }
})
</script>
