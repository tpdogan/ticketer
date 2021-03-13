import getUTC from './getUTC'
import nextTime from "./nextTime"
import niceDate from "./niceDate"
import niceDuration from './niceDuration'
import niceTime from "./niceTime"

function dataToTable(data, cities, table, body) {
  const values = Object.values(data)
  const ids = (values.length+7)/8

  const icons = document.createElement('table')
  icons.innerHTML = table.innerHTML
  icons.classList = table.classList
  icons.classList.add('new_table')
  icons.classList.remove('hidden')
  icons.tBodies[0].innerHTML = body.innerHTML
  icons.tBodies[0].classList = body.classList
  icons.tBodies[0].classList.remove('hidden')

  let arrive = new Date()

  for (let i = 0; i < ids-1; i++) {
    const start = cities.find(data => data.id == values[i])
    const finish = cities.find(data => data.id == values[i+1])

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
  icons.id = arrive
  return icons
}

export default dataToTable