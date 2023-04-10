const dummyRequest = (endpointName, specs, delay = 2000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Dummy response to ${endpointName}`)
      const response = {
        exchangeApiSymbols: {
          success: true,
          symbols: {
            TRY: 'Turkish Liras',
            USD: 'United States Dollars',
            EUR: 'Euro',
            JPY: 'Japanese Yen',
            GBP: 'Great Britain Pound'
          }
        },
        exchangeApiConvert: {
          success: true,
          date: specs.exchangeDate,
          historical: '',
          info: {
            rate: 148.972231,
            timestamp: 1519328414
          },
          query: {
            amount: specs.amount,
            from: specs.from,
            to: specs.to
          },
          result: 3724.305775
        },
        exchangeApiTimeSeries: {
          success: true,
          base: specs.currencyBase,
          start_date: specs.startDate,
          end_date: specs.endDate,
          rates: {
            '2012-05-01': {
              AUD: 1.278047,
              CAD: 1.302303,
              USD: 1.322891
            },
            '2012-05-02': {
              AUD: 1.274202,
              CAD: 1.299083,
              USD: 1.315066
            },
            '2012-05-03': {
              AUD: 1.280135,
              CAD: 1.296868,
              USD: 1.314491
            }
          },
          timeseries: true
        }
      }[endpointName]

      resolve(response)
    }, delay)
  })
}

export default dummyRequest
