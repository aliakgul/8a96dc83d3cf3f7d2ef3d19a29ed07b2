import { defineStore } from 'pinia'
import { dummyRequest, formatRatesForGraph, formatRatesForTable } from '../functions'

const endpoint = 'https://api.apilayer.com/exchangerates_data'
const requestHeader = new Headers()
requestHeader.append('apikey', import.meta.env.VITE_API_LAYER_KEY)

const requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: requestHeader
}

export const useTransactionHistoryStore = defineStore({
  id: 'transactionHistory',
  state: () => ({
    transactions: []
  }),
  actions: {
    saveTransaction(transaction) {
      this.transactions.push(transaction)
    }
  },
  persist: true
})

export const useExchangeApiSymbolsStore = defineStore({
  id: 'exchangeApiSymbols',
  state: () => ({
    isFetchingSymbols: false,
    isFetchingSymbolsFailed: false,
    symbols: {}
  }),
  actions: {
    async fetchExchangeApiSymbols() {
      this.isFetchingSymbols = true
      this.isFetchingSymbolsFailed = false

      try {
        const response = await fetch(`${endpoint}/symbols`, requestOptions)
        const { success, symbols } = await response.json()

        if (success) {
          this.symbols = symbols
        } else {
          this.isFetchingSymbolsFailed = true
        }
      } catch (error) {
        this.isFetchingSymbolsFailed = true
      }

      this.isFetchingSymbols = false
    }
  },
  debounce: {
    fetchExchangeApiSymbols: 1000
  },
  persist: true
})

export const useExchangeApiConvertStore = defineStore({
  id: 'exchangeApiConvert',
  state: () => ({
    isFetchingConversion: false,
    isFetchingConversionFailed: false,
    timestamp: 0,
    from: '',
    to: '',
    amount: 0,
    date: '',
    rate: 0,
    result: 0
  }),
  actions: {
    async fetchExchangeApiConvert(from, to, amount, exchangeDate) {
      this.isFetchingConversion = true
      this.isFetchingConversionFailed = false

      try {
        const response = await fetch(
          `${endpoint}/convert?from=${from}&to=${to}&amount=${amount}&date=${exchangeDate}`,
          requestOptions
        )
        const { success, date, info, query, result } = await response.json()

        if (success) {
          this.date = date
          this.rate = info.rate
          this.timestamp = info.timestamp
          this.amount = query.amount
          this.from = query.from
          this.to = query.to
          this.result = result

          useTransactionHistoryStore().saveTransaction({
            from,
            to,
            date,
            amount,
            timestamp: info.timestamp,
            rate: info.rate
          })
        } else {
          this.isFetchingConversionFailed = true
        }
      } catch (error) {
        this.isFetchingConversionFailed = true
      }

      this.isFetchingConversion = false
    }
  },
  debounce: {
    fetchExchangeApiConvert: 2000
  }
})

export const useExchangeApiTimeSeriesStore = defineStore({
  id: 'exchangeApiTimeSeries',
  state: () => ({
    isFetchingTimeseries: false,
    isFetchingTimeseriesFailed: false,
    isTimeSeries: false,
    startDate: '',
    endDate: '',
    base: '',
    rates: {}
  }),
  actions: {
    async fetchExchangeApiTimeSeries(startDate, endDate, currencyBase, symbolsString) {
      this.isFetchingTimeseries = true
      this.isFetchingTimeseriesFailed = false

      try {
        const response = await fetch(
          `${endpoint}/timeseries?start_date=${startDate}&end_date=${endDate}&base=${currencyBase}&symbols=${symbolsString}`,
          requestOptions
        )
        const { success, timeseries, start_date, end_date, base, rates } = await response.json()

        if (success) {
          this.isTimeSeries = timeseries
          this.startDate = start_date
          this.endDate = end_date
          this.base = base
          this.rates = rates

          formatRatesForTable(rates, {
            from: base,
            timestamp: Math.floor(Date.now() / 1000)
          }).forEach((mappedRate) => {
            useTransactionHistoryStore().saveTransaction(mappedRate)
          })
        } else {
          this.isFetchingTimeseriesFailed = true
        }
      } catch (error) {
        this.isFetchingTimeseriesFailed = true
      }

      this.isFetchingTimeseries = false
    }
  },
  getters: {
    getRatesForGraph: (state) => {
      return formatRatesForGraph(state.rates)
    },
    getRatesForTable: (state) => {
      return formatRatesForTable(state.rates, { from: state.base })
    }
  },
  debounce: {
    fetchExchangeApiTimeSeries: 2000
  }
})
