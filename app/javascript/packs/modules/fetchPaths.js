function fetchPaths(cityArray, callback) {
  const from = document.getElementById('start').value
  const to = document.getElementById('finish').value
  if (cityArray.includes(from) && cityArray.includes(to)) {
    console.log(`Travel from ${from} to ${to}!`)

    const url ='/travels'
    const adults = document.getElementById('passenger_count').value
    const children = document.getElementById('child_count').value
    const transfer = document.getElementById('transfer').value
    const requestURL = url + `?request=path&from=${from}&to=${to}&passengers=${Number(adults) + Number(children)}&transfer=${transfer}`

    fetch(requestURL, {
      cache: 'no-cache',
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((response) => {
        return response.text()
      })
        .then((data) => {
          callback(JSON.parse(JSON.parse(data).paths))
        })
  }

}

export default fetchPaths