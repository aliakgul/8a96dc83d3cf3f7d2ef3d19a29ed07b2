<template>
  <div class="conversion-view">
    <fieldset
      :disabled="symbolsStoreState.isFetchingSymbols || convertStoreState.isFetchingConversion"
    >
      <div class="input-group mb-3">
        <div class="input-group mb-3">
          <span class="input-group-text">Date</span>
          <input class="form-control" type="date" v-model="formState.date" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">From</span>
          <select class="form-select" v-model="formState.from">
            <option
              v-for="(fromSymbol, index) in Object.keys(symbolsStoreState.symbols)"
              :key="index"
              :value="fromSymbol"
            >
              {{ fromSymbol }}
            </option>
          </select>
          <input class="form-control" type="number" min="1" step="1" v-model="formState.amount" />
        </div>
        <div class="input-group mb-3">
          <span class="input-group-text">To</span>
          <select class="form-select" v-model="formState.to">
            <option
              v-for="(toSymbol, index) in Object.keys(symbolsStoreState.symbols)"
              :key="index"
              :value="toSymbol"
            >
              {{ toSymbol }}
            </option>
          </select>
          <input class="form-control" type="number" v-model="convertStoreState.result" disabled />
        </div>
        <div class="input-group mb-3">
          <button class="btn btn-secondary" @click="swapCurrencies">Swap Currencies</button>
        </div>
      </div>
    </fieldset>
    <SpinnerComponent v-if="symbolsStoreState.isFetchingSymbols" message="Fetching Symbols" />
    <SpinnerComponent v-if="convertStoreState.isFetchingConversion" message="Fetching Conversion" />
    <h3 v-if="convertStoreState.rate">
      1 {{ symbolsStoreState.symbols[formState.from] }} equals
      <br />
      {{ convertStoreState.rate }} {{ symbolsStoreState.symbols[formState.to] }}
    </h3>
    <FeedbackComponent
      :shouldShow="symbolsStoreState.isFetchingSymbolsFailed"
      message="Fetching Symbols Failed"
    />
    <FeedbackComponent
      :shouldShow="convertStoreState.isFetchingConversionFailed"
      message="Fetching Conversion Failed"
    />
  </div>
</template>

<script>
import { watch, reactive, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useExchangeApiSymbolsStore, useExchangeApiConvertStore } from '@/stores/exchangeStore'
import { FeedbackComponent, SpinnerComponent } from '../components'

export default {
  components: { FeedbackComponent, SpinnerComponent },
  setup() {
    const symbolsStore = useExchangeApiSymbolsStore()
    const convertStore = useExchangeApiConvertStore()

    const symbolsStoreState = ref(storeToRefs(symbolsStore))
    const convertStoreState = ref(storeToRefs(convertStore))
    const formState = reactive({
      date: new Date().toISOString().slice(0, 10),
      from: 'TRY',
      to: 'USD',
      amount: 1
    })

    const swapCurrencies = () => {
      const fromInitial = formState.from
      formState.from = formState.to
      formState.to = fromInitial
    }

    const checkFormAndSubmit = () => {
      if (!formState.date || !formState.amount || !formState.from || !formState.to) {
        alert('Please fill the form.')
        return
      }

      convertStore.fetchExchangeApiConvert(
        formState.from,
        formState.to,
        formState.amount,
        formState.date
      )
    }

    watch([formState], checkFormAndSubmit)

    return { symbolsStoreState, convertStoreState, formState, swapCurrencies }
  }
}
</script>
