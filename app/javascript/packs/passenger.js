const total = document.getElementById('count')
const nextPass = document.getElementsByClassName('passenger__next')
const prevPass = document.getElementsByClassName('passenger__prev')

for (let i = 0; i < nextPass.length; i++) {
  const element = nextPass[i]
  element.addEventListener('click', (event) => {
    formEvent(event, element.id-1, element.id)
  })
}

for (let i = 0; i < prevPass.length; i++) {
  const element = prevPass[i]
  element.addEventListener('click', (event) => {
    formEvent(event, element.id+1, element.id)
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
  const required = form.querySelectorAll('.input.required')
  for (let i = 0; i < required.length; i++) {
    const input = required[i]
    if (!input.value) {
      alert('Please fill in all of the fields!')
      return false
    }
  }
  return true
}