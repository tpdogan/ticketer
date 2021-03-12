function transferCheck() {
  const buttons = document.getElementsByClassName('radio-box')
  for (const element of buttons) {
    element.addEventListener('click', () => {
      emptyChecks()
      element.firstChild.classList.remove('hidden')
      document.getElementById('transfer').value = element.id
    })
  }
  function emptyChecks() {
    for (const element of buttons) {
      element.firstChild.classList.add('hidden')
    }
  }
}

export default transferCheck