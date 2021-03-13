function niceDuration(duration) {
  const hour = Math.floor(duration/60)
  const minute = duration % 60
  let time = ''
  if (hour == 0) {
    time = Math.floor(minute/10) + '' + (minute%10) + 'm'
  } else {
    time = Math.floor(hour/10) + '' + (hour%10) + 'h ' + Math.floor(minute/10) + '' + (minute%10) + 'm'
  }
  return time
}

export default niceDuration