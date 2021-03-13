const total = document.getElementById('count')
const nextPass = document.getElementsByClassName('passenger__next')
const prevPass = document.getElementsByClassName('passenger__prev')

for (let i = 0; i < nextPass.length; i++) {
  const element = nextPass[i]
  element.addEventListener('click', (e) => {
    e.preventDefault()
    hideAll()
    const form = document.getElementById(`passenger__form-${element.id}`)
    form.style.zIndex = 20
  })
}
for (let i = 0; i < prevPass.length; i++) {
  const element = prevPass[i]
  element.addEventListener('click', (e) => {
    e.preventDefault()
    hideAll()
    const form = document.getElementById(`passenger__form-${element.id}`)
    form.style.zIndex = 20
  })
}


function hideAll() {
  const forms = document.getElementsByClassName('passenger__form')
  for (let i = 0; i < forms.length; i++) {
    const element = forms[i]
    element.style.zIndex = -1
  }
}