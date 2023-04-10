const mapRates = (rates, specs) => {
  const mappedRates = []

  Object.keys(rates).forEach((dateKey) => {
    Object.keys(rates[dateKey]).forEach((fromSymbol) => {
      mappedRates.push({
        from: specs.from,
        to: fromSymbol,
        date: dateKey,
        amount: specs.amount || 1,
        timestamp: specs.timestamp || 0,
        rate: rates[dateKey][fromSymbol]
      })
    })
  })

  return mappedRates
}

export default mapRates
