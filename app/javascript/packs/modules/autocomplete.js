function autocomplete(inputID = '', outputID = '', matchList = [], matchKey = '', showKeys = []) {
  const input = document.getElementById(inputID)
  const output = document.getElementById(outputID)

  input.addEventListener('input', () => {
    // Set the current value
    const current = input.value

    // Clear the previous elements
    output.innerHTML = ''

    // For empty input don't try to match
    if (!current) { return false }

    // Check every item for matches
    matchList.forEach((jsonItem) => {
      if (jsonItem[matchKey].includes(current)) {
        createItem(jsonItem)
      }
    })

    function createItem(jsonItem) {
      // Create item and set classes
      const item = document.createElement('a')
      item.classList.add('autocompleted-item')
      item.href = jsonItem['url']
      // Depending on the showKeys insert innerHTML
      showKeys.forEach(key => {
        const nodeType = key == 'image' ? 'img' : 'p'
        const innerItem = document.createElement(nodeType)
        key == 'image' ? innerItem.src = jsonItem[key] : innerItem.innerHTML = jsonItem[key]
        item.appendChild(innerItem)
      })
      output.appendChild(item)
    }
  })
}
