const checkIfInDateLimits = (startDate, endDate, dayCount) => {
  const startDateObj = new Date(startDate)
  const endDateObj = new Date(endDate)
  const timeDiff = Math.abs(endDateObj.getTime() - startDateObj.getTime())
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))

  return diffDays <= dayCount
}

export default checkIfInDateLimits
