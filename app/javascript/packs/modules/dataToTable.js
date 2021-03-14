import getUTC from './getUTC'
import nextTime from "./nextTime"
import niceDate from "./niceDate"
import niceDuration from './niceDuration'
import niceTime from "./niceTime"

function dataToTable(data, cities, table, body) {
  const count = data.vehicle_3 ? 3 : data.vehicle_2 ? 2 : 1

  const icons = document.createElement('table')
  icons.innerHTML = table.innerHTML
  icons.classList = table.classList
  icons.classList.add('new_table')
  icons.classList.remove('hidden')
  icons.tBodies[0].innerHTML = body.innerHTML
  icons.tBodies[0].classList = body.classList
  icons.tBodies[0].classList.remove('hidden')

  let arrive = new Date()

  for (let i = 0; i < count; i++) {
    const startKey = 
      i == 0 ? 'start_id' : 
      i == 1 ? count == 2 ? 'middle_id' : 'middle_1_id' :
      i == 2 ? 'middle_2_id' : 'start_id'

    const finishKey = 
      i == 2 ? 'finish_id' :
      i == 1 ? count == 3 ? 'middle_2_id' : 'middle_id' :
      i == 0 ? count == 3 ? 'middle_1_id' : count == 2 ? 'middle_id' : 'finish_id' : 'finish_id'

      console.log(data[startKey])
      console.log(data[finishKey])
      console.log(startKey)
      console.log(finishKey)

    const start = cities.find(item => item.id == data[startKey])
    const finish = cities.find(item => item.id == data[finishKey])

    const tr = document.createElement('tr')
    const th0 = document.createElement('th')
    const th1 = document.createElement('th')
    const th2 = document.createElement('th')
    const th3 = document.createElement('th')
    const th4 = document.createElement('th')
    const th5 = document.createElement('th')
    const th6 = document.createElement('th')

    const vehicle = data[`vehicle_${i+1}`]
    const dur = data[`duration_${i+1}`]
    const hour = data[`hour_${i+1}`]
    const min = data[`minute_${i+1}`]
    const per = data[`periodicity_${i+1}`]
    const price = data[`price_${i+1}`]

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