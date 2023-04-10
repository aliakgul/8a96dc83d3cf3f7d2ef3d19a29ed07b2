<template>
  <div class="conversion-view">
    <input type="date" v-model="date" />
    <div>
      <select v-model="from">
        <option
          v-for="(fromSymbol, index) in Object.keys(symbols)"
          :key="index"
          :value="fromSymbol"
        >
          {{ fromSymbol }}
        </option>
      </select>
      <input type="number" min="1" step="1" v-model="amount" />
    </div>
    <div>
      <select v-model="to">
        <option v-for="(toSymbol, index) in Object.keys(symbols)" :key="index" :value="toSymbol">
          {{ toSymbol }}
        </option>
      </select>
      <input type="number" v-model="result" disabled />
    </div>
    <div>
      1 {{ symbols[from] }} equals
      <br />
      {{ rate }} {{ symbols[to] }}
    </div>
    <FeedbackComponent v-if="isFetchingSymbols" feedback="Fetching Symbols" />
    <FeedbackComponent v-if="isFetchingSymbolsFailed" feedback="Fetching Symbols Failed" />
    <FeedbackComponent v-if="isFetchingConversion" feedback="Fetching Conversion" />
    <FeedbackComponent v-if="isFetchingConversionFailed" feedback="Fetching Conversion Failed" />
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExchangeApiSymbolsStore, useExchangeApiConvertStore } from '@/stores/exchangeStore'
import { FeedbackComponent } from '../components'

const convertStore = useExchangeApiConvertStore()

const { symbols, isFetchingSymbols, isFetchingSymbolsFailed } = storeToRefs(
  useExchangeApiSymbolsStore()
)
const { rate, result, isFetchingConversion, isFetchingConversionFailed } = storeToRefs(convertStore)

const date = ref(new Date().toISOString().slice(0, 10))
const from = ref('TRY')
const to = ref('USD')
const amount = ref(1)

watch([date, amount, from, to], () => {
  if (date.value && amount.value && from.value && to.value && from.value !== to.value) {
    convertStore.fetchExchangeApiConvert(from.value, to.value, amount.value, date.value)
  }
})
</script>
