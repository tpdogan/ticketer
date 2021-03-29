import autocomplete from './modules/autocomplete'
import dataToTable from './modules/dataToTable'
import fetchPaths from './modules/fetchPaths'
import transferCheck from './modules/transfer'

const cities = JSON.parse(document.getElementById('city_list').value)
const cityArray = cities.map(item => item.name)
let selectedDate = document.getElementById('date').valueAsDate
let passenger_count = 1
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
    if (date <= selectedDate) {
      passenger_count = Number(document.getElementById('passenger_count').value) + Number(document.getElementById('child_count').value)
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

  const newTables = document.querySelectorAll('.new_table')
  if (newTables) {
    newTables.forEach(item => item.remove())
  }

  [0, 1, 2].forEach((num) => {
    const transfer = paths[num]
    const none = document.getElementById(`transfer${num}__none`)
    const table = document.getElementById(`transfer${num}__table`)
    const control = document.getElementById(`transfer${num}__control`)
    const iconTable = document.getElementById('transfer__icons')
    const body = document.getElementById(`transfer${num}__body`)

    if (!transfer || transfer.length == 0) {
      none.classList.remove('hidden')
      table.classList.add('hidden')
    } else {
      none.classList.add('hidden')
      table.classList.remove('hidden')

      transfer.forEach((item) => {
        //console.log(item)
        const icons = dataToTable(item, cities, iconTable, body)
        addBuyButton(icons, item)
        orderArrivalTime(control, icons)
      })
    }
  })
}

function addBuyButton(table, data) {
  const buytr = document.createElement('tr')

  const buyth = document.createElement('th')
  buyth.colSpan = 7
  buyth.classList.add('p-0')

  const buybtn = document.createElement('button')
  buybtn.className = 'button is-success is-full-width is-radiusless'
  buybtn.innerHTML = 'Buy It NOW'
  buybtn.addEventListener('click', () => {
    location.href += 
    'passengers/new?' +
    `count=${passenger_count}&` +
    //Object.entries(data).map(e => e.join('=')).join('&')
    JSON.stringify(data)
  })

  buyth.appendChild(buybtn)
  buytr.appendChild(buyth)
  table.tBodies[0].appendChild(buytr)
}

function orderArrivalTime(control, table) {
  const allTables = control.querySelectorAll('.new_table')
  let inserted = false

  for (let i = 0; i < allTables.length; i++) {
    const item = allTables[i];
    if (item.id > table.id) {
      control.insertBefore(table, item)
      inserted = true
      break
    }
  }

  if (!inserted) {
    control.appendChild(table)
  }
}