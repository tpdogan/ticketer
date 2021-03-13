import autocomplete from './modules/autocomplete'
import fetchPaths from './modules/fetchPaths'
import getUTC from './modules/getUTC'
import niceDuration from './modules/niceDuration'
import transferCheck from './modules/transfer'

const cities = JSON.parse(document.getElementById('city_list').value)
const cityArray = cities.map(item => item.name)
let selectedDate = document.getElementById('date').valueAsDate
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
    const body = document.getElementById(`transfer${num}__body`)
    const iconTable = document.getElementById('transfer__icons')
    const control = document.getElementById(`transfer${num}__control`)

    if (!transfer || transfer.length == 0) {
      none.classList.remove('hidden')
      table.classList.add('hidden')
    } else {
      none.classList.add('hidden')
      table.classList.remove('hidden')

      transfer.forEach((item) => {
        const values = Object.values(item)
        const ids = (values.length+7)/8

        const icons = document.createElement('table')
        icons.innerHTML = iconTable.innerHTML
        icons.classList = iconTable.classList
        icons.classList.add('new_table')
        icons.classList.remove('hidden')
        icons.tBodies[0].innerHTML = body.innerHTML
        icons.tBodies[0].classList = body.classList
        icons.tBodies[0].classList.remove('hidden')

        let arrive = new Date()

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

          const vehicle = values[ids + i*7]
          const dur = values[ids + i*7 + 1]
          const hour = values[ids + i*7 + 2]
          const min = values[ids + i*7 + 3]
          const per = values[ids + i*7 + 4]
          const price = values[ids + i*7 + 5]

          const nextTravelTime = nextTime(arrive, hour, min, per)
          const nextTemp = new Date(nextTravelTime.getTime())
          const nextMin = nextTemp.getMinutes()
          arrive = nextTemp.setMinutes(nextMin + dur - getUTC(start.country) + getUTC(finish.country))

          th0.innerHTML = start.name
          th1.innerHTML = finish.name
          th2.innerHTML = niceDate(nextTravelTime)
          th3.innerHTML = niceTime(nextTravelTime, new Date(arrive))
          th4.innerHTML = niceDuration(dur)
          th5.innerHTML = vehicle
          th6.innerHTML = price

          tr.innerHTML += th0.outerHTML + th1.outerHTML + th2.outerHTML + th3.outerHTML + th4.outerHTML + th5.outerHTML + th6.outerHTML

          icons.tBodies[0].appendChild(tr)
        }
        addBuyButton(icons, item)
        icons.id = arrive
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
    location.href += 'passengers/new?' + Object.entries(data).map(e => e.join('=')).join('&');
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

function niceDate(date) {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getYear() + 1900
  return Math.floor(day/10) + '' + (day%10) + '/' + Math.floor(month/10) + '' + (month%10) + '/' + Math.floor(year/10) + '' + (year%10)
}

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

function nextTime(startDate, hour, minute, periodicity) {
  const afterZero = (hour*60 + minute) % (24*60 / periodicity)
  const zeroHour = Math.floor(afterZero / 60)
  const zeroMin = afterZero % 60

  let date = new Date()
  date.setHours(zeroHour)
  date.setMinutes(zeroMin)
  date.setSeconds(0)

  while (date < startDate) {
    const oldMinutes = date.getMinutes()
    date.setMinutes(oldMinutes + (24*60 / periodicity))
  }

  return date
}