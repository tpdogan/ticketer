function getUTC(country) {
  switch (country) {
    case 'US':
      return -6
    case 'CO' :
      return -5
    case 'NL':
      return 1
    case 'JP':
      return 9
    case 'AU':
      return 10
    default:
      return 0
  }
}

export default getUTC