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

    const url ='http://localhost:3000'
    const token = document.getElementsByName('authenticity_token')[0].value
    const adults = document.getElementById('passenger_count').value
    const children = document.getElementById('child_count').value
    const transfer = document.getElementById('transfer').value
    const params = {
      authenticity_token: token,
      travel: {
        from: from,
        to: to,
        passengers: adults + children,
        transfer: transfer
      }
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(params),
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
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

/**
 * const params = {
        authenticity_token: token,
        picture: {
          name: name,
          year: year,
          uploaded_by: user,
          image: reader.result
        },
        fetch: true
      }

      const url = 'http://localhost:3000/pictures'
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(params),
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json' 
        }
      })
        .then((response) => {
          console.log(response)
          console.log(response.json())
          /*return response.json()
        })
        .then((data) => {
          alert('Picture creation is ' + data.result)
        })

        const url = 'http://www.wikimedic.ml/diseases'
  iconLoadState(icons[1])
  fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    cache: 'no-cache',
    headers : { 
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then((response) => {
      return response.text()
    })
      .then((data) => {
        const parsed = JSON.parse(data)
        if (parsed.save === 'OK') {
          OKs += 1
          iconGoodState(icons[1])
          startTranlateRequests(parsed)
        } else {
          iconBadState(icons[1])
        }
    })
}
 */