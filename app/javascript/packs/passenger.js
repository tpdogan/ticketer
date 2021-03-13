import dataToTable from "./modules/dataToTable"

const total = document.getElementById('count')
const nextPass = document.getElementsByClassName('passenger__next')
const prevPass = document.getElementsByClassName('passenger__prev')

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