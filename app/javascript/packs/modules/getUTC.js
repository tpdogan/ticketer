function getUTC(country) {
  let hour
  switch (country) {
    case 'US':
      hour = -6
      break;
    case 'CO' :
      hour = -5
      break;
    case 'NL':
      hour = 1
      break;
    case 'JP':
      hour = 9
      break;
    case 'AU':
      hour = 10
      break;
    default:
      hour = 0
      break;
  }
  return hour*60
}

export default getUTC