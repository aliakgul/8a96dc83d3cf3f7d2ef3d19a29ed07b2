import { defineStore } from 'pinia'
import { mapRates, dummyRequest } from '../functions'

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
      /* const response = await fetch(`${endpoint}/symbols`, requestOptions)
      const { success, symbols } = await response.json() */

      this.isFetchingSymbols = true
      this.isFetchingSymbolsFailed = false
      const { success, symbols } = await dummyRequest('exchangeApiSymbols', {})
      this.isFetchingSymbols = false

      if (success) {
        this.symbols = symbols
      } else {
        this.isFetchingSymbolsFailed = true
      }
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
      /* const response = await fetch(
        `${endpoint}/convert?from=${from}&to=${to}&amount=${amount}&date=${exchangeDate}`,
        requestOptions
      )
      const { success, date, info, query, result } = await response.json() */

      this.isFetchingConversion = true
      this.isFetchingConversionFailed = false
      const { success, date, info, query, result } = await dummyRequest('exchangeApiConvert', {
        exchangeDate,
        amount,
        from,
        to
      })
      this.isFetchingConversion = false

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
      /* const response = await fetch(
        `${endpoint}/timeseries?start_date=${startDate}&end_date=${endDate}&base=${currencyBase}&symbols=${symbolsString}`,
        requestOptions
      )
      const { success, timeseries, start_date, end_date, base, rates } = await response.json() */

      this.isFetchingTimeseries = true
      this.isFetchingTimeseriesFailed = false
      const { success, timeseries, start_date, end_date, base, rates } = await dummyRequest(
        'exchangeApiTimeSeries',
        {
          currencyBase,
          startDate,
          endDate
        }
      )
      this.isFetchingTimeseries = false

      if (success) {
        this.isTimeSeries = timeseries
        this.startDate = start_date
        this.endDate = end_date
        this.base = base
        this.rates = rates

        mapRates(rates, { from: base }).forEach((mappedRate) => {
          useTransactionHistoryStore().saveTransaction(mappedRate)
        })
      } else {
        this.isFetchingTimeseriesFailed = true
      }
    }
  },
  debounce: {
    fetchExchangeApiTimeSeries: 2000
  }
})
