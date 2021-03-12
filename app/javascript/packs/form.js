import autocomplete from './modules/autocomplete'
import fetchPaths from './modules/fetchPaths'
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
  if (e.target.id == 'submit') {
    let date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    if (date <= document.getElementById('date').valueAsDate) {
      fetchPaths(cityArray, showPaths)
    } else {
      alert('Date cannot be in the past!')
    }
  }
})

function fillSelect(target) {
  const id = target.id
  const parentId = target.parentElement.parentElement.id.substr(15)
  document.getElementById(parentId).value = id
}

function showPaths(paths) {
  [0, 1, 2].forEach((num) => {
    const transfer = paths[num]
    const none = document.getElementById(`transfer${num}__none`)
    const table = document.getElementById(`transfer${num}__table`)
    const body = document.getElementById(`transfer${num}__body`)
    body.innerHTML = ''

    if (!transfer || transfer.length == 0) {
      none.classList.remove('hidden')
      table.classList.add('hidden')
    } else {
      none.classList.add('hidden')
      table.classList.remove('hidden')

      transfer.forEach((item) => {
        const values = Object.values(item)
        const ids = (values.length+7)/8

        for (let i = 0; i < ids-1; i++) {
          const start = cities.find(item => item.id == values[i])
          const finish = cities.find(item => item.id == values[i+1])

          const tr = document.createElement('tr')
          const th0 = document.createElement('th')
          const th1 = document.createElement('th')
          const th2 = document.createElement('th')
          const th3 = document.createElement('th')
          const th4 = document.createElement('th')
          const th5 = document.createElement('th')
          const th6 = document.createElement('th')

          th0.innerHTML = start.name
          th1.innerHTML = finish.name
          th2.innerHTML = 'date'
          th3.innerHTML = 'time'
          th4.innerHTML = niceTime(values[ids + i*7 + 1])
          th5.innerHTML = values[ids + i*7]
          th6.innerHTML = values[ids + i*7 + 5]

          tr.innerHTML += th0.outerHTML + th1.outerHTML + th2.outerHTML + th3.outerHTML + th4.outerHTML + th5.outerHTML + th6.outerHTML
          body.appendChild(tr)
        }
      })
    }
  })
}

function niceTime(duration) {
  const hour = Math.round(duration/60)
  const minute = duration % 60
  let time = ''
  if (hour == 0) {
    time = minute
  } else {
    time = hour + ':' + minute
  }
  return time
}