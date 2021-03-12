import autocomplete from './modules/autocomplete'
import transferCheck from './modules/transfer'

const cities = JSON.parse(document.getElementById('city_list').value)
const cityArray = cities.map(item => item.name)
transferCheck()

autocomplete('start', 'autocompleted__start', cities, 'name', ['name'])
autocomplete('finish', 'autocompleted__finish', cities, 'name', ['name'])

document.addEventListener('click', (e) => {
  if (e.target.className == 'autocompleted__toggle') {
    fillSelect(e.target)
  }
  if (e.target.id != 'start') {
    document.getElementById('autocompleted__start').innerHTML = ''
  }
  if (e.target.id != 'finish') {
    document.getElementById('autocompleted__finish').innerHTML = ''
  }
})

function fillSelect(target) {
  const id = target.id
  const parentId = target.parentElement.parentElement.id.substr(15)
  document.getElementById(parentId).value = id
  fetchSelect()
}

function fetchSelect() {
  const from = document.getElementById('start').value
  const to = document.getElementById('finish').value
  if (cityArray.includes(from) && cityArray.includes(to)) {
    console.log(`Travel from ${from} to ${to}!`)

    const url ='http://localhost:3000/travels'
    const adults = document.getElementById('passenger_count').value
    const children = document.getElementById('child_count').value
    const transfer = document.getElementById('transfer').value
    const requestURL = url + `?request=path&from=${from}&to=${to}&passengers=${adults + children}&transfer=${transfer}`

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
          console.log(data)
        })
  }
}