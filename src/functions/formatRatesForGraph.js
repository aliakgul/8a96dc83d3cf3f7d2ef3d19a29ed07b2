function formatRatesForGraph(rates) {
  if (!Object.keys(rates).length) {
    return []
  }

  const currencies = Object.keys(rates[Object.keys(rates)[0]])
  return currencies
    .map((currency) => ({
      label: currency,
      data: Object.values(rates).map((value) => value[currency] || 0)
    }))
    .map((rate) => {
      return {
        label: rate.label,
        data: rate.data,
        fill: false,
        tension: 0.1,
        borderColor: '#555'
      }
    })
}

export default formatRatesForGraph
