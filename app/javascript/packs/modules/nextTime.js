function nextTime(startDate, hour, minute, periodicity) {
  const afterZero = (hour*60 + minute) % (24*60 / periodicity)
  const zeroHour = Math.floor(afterZero / 60)
  const zeroMin = afterZero % 60

  let date = new Date()
  date.setHours(zeroHour)
  date.setMinutes(zeroMin)
  date.setSeconds(0)

  while (date < startDate) {
    const oldMinutes = date.getMinutes()
    date.setMinutes(oldMinutes + (24*60 / periodicity))
  }

  return date
}

export default nextTime