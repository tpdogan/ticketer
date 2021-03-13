function niceDate(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getYear() + 1900
  return Math.floor(day/10) + '' + (day%10) + '/' + Math.floor(month/10) + '' + (month%10) + '/' + Math.floor(year/10) + '' + (year%10)
}

export default niceDate