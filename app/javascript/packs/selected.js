import dataToTable from "./modules/dataToTable"

const data = JSON.parse(document.getElementById('selected_travel').value)
fillTravelInfo()

function fillTravelInfo() {
  const cities = JSON.parse(document.getElementById('city_list').value)
  const body = document.getElementById(`transfer-1__body`)
  const table = document.getElementById('transfer__icons')
  const dataTable = dataToTable(data, cities, table, body)

  const control = document.getElementById(`transfer-1__control`)
  control.appendChild(dataTable)

  const headings = document.getElementById(`transfer-1__table`)
  headings.classList.remove('hidden')
}