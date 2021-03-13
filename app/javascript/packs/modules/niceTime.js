function niceTime(dateStart, dateFinish) {
  const hourStart = Math.floor(dateStart.getHours() / 10) + '' + dateStart.getHours() % 10
  const hourFinish = Math.floor(dateFinish.getHours() / 10) + '' + dateFinish.getHours() % 10
  const minStart = Math.floor(dateStart.getMinutes() / 10) + '' + dateStart.getMinutes() % 10
  const minFinish = Math.floor(dateFinish.getMinutes() / 10) + '' + dateFinish.getMinutes() % 10
  const dayDiff = Math.floor(Math.round((dateFinish-dateStart)/1000)/86400)
  let time = 'Depart ' + hourStart + ':' + minStart + '\n' +
             'Arrive ' + hourFinish + ':' + minFinish
  let extra = (hourStart*60 + minStart > hourFinish*60 + minFinish) ? 1 : 0
  extra += dayDiff
  if (extra > 0) {
    time += ` (+${extra})`
  }
  return time
}

export default niceTime