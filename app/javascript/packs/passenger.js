import dataToTable from "./modules/dataToTable"

const nextPass = document.getElementsByClassName('passenger__next')
const prevPass = document.getElementsByClassName('passenger__prev')
const buyAll = document.getElementsByClassName('passenger__buy')
const buy = buyAll[buyAll.length-1]

fillTravelInfo()

for (let i = 0; i < nextPass.length; i++) {
  const element = nextPass[i]
  element.addEventListener('click', (event) => {
    formEvent(event, Number(element.id)-1, element.id)
  })
}

for (let i = 0; i < prevPass.length; i++) {
  const element = prevPass[i]
  element.addEventListener('click', (event) => {
    formEvent(event, Number(element.id)+1, element.id)
  })
}

buy.addEventListener('click', (e) => {
  e.preventDefault()
  const travelData = parameterize('travel',urlToData(location.href))
  const formData = collectFormData()
  let passengerData = ''

  for (const key in formData) {
    passengerData += parameterize(key, formData[key])
  }
  const auth = document.createElement('input')
  auth.name = 'authenticity_token'
  auth.value = document.getElementsByName('authenticity_token')[0].value

  const form = document.createElement('form')
  form.appendChild(auth)
  form.method = 'post'
  form.action = '/passengers?' + travelData + passengerData
  document.body.appendChild(form)
  form.submit()
})

function parameterize(model, object) {
  let param = ''
  for (const key in object) {
    param += `${model}[${key}]=${object[key]}&`
  }
  return param
}

function hideAll() {
  const forms = document.getElementsByClassName('passenger__form')
  for (let i = 0; i < forms.length; i++) {
    const element = forms[i]
    element.style.zIndex = -1
  }
}

function formEvent(event, idNow, idLater) {
  event.preventDefault()
  if (checkFields(idNow)) {
    hideAll()
    const form = document.getElementById(`passenger__form-${idLater}`)
    form.style.zIndex = 20
  }
}

function checkFields(id) {
  const form = document.getElementById(`passenger__form-${id}`)
  const required = form.querySelectorAll('.optional.input')
  for (let i = 0; i < required.length; i++) {
    const input = required[i]
    if (!input.value) {
      alert('Please fill in all of the fields!')
      return false
    }
  }
  return true
}

function fillTravelInfo() {
  const cities = JSON.parse(document.getElementById('city_list').value)
  const body = document.getElementById(`transfer-1__body`)
  const table = document.getElementById('transfer__icons')
  const data = urlToData(location.href)
  const dataTable = dataToTable(data, cities, table, body)

  const control = document.getElementById(`transfer-1__control`)
  control.appendChild(dataTable)

  const headings = document.getElementById(`transfer-1__table`)
  headings.classList.remove('hidden')
}

function urlToData(url) {
  const dataPos = url.indexOf('&') + 1
  const dataStr = url.substr(dataPos).replaceAll('%22', '"')
  return JSON.parse(dataStr)
}

function collectFormData() {
  let data = {}
  const forms = document.getElementsByClassName('passenger__form')
  for (let i = 0; i < forms.length; i++) {
    const element = forms[i]
    if (!checkFields(i+1)) {return false;}
    let passengerData = {}
    const inputs = element.querySelectorAll('.optional.input')

    for (let j = 0; j < inputs.length; j++) {
      const item = inputs[j];
      passengerData[item.id.substr(10)] = item.value
    }

    data[`passenger_${i+1}`] = passengerData
  }
  return data
}