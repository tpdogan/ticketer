/**
 * 
 * @param {string} inputID (input) id for getElementById
 * @param {string} outputID (div) id for getElementById
 * @param {array} matchList array of objects which involve at least one key-value pair
 * @param {string} matchKey key for which objects value is matched during autocomplete
 * @param {array} showKeys array of keys to show from the objects within matchList
 */
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
      if (jsonItem[matchKey].toLowerCase().substr(0,current.length) == current.toLowerCase()) {
        createItem(jsonItem)
      }
    })

    function createItem(jsonItem) {
      // Create item and set classes
      const item = document.createElement('div')
      item.classList.add('autocompleted__item')
      const toggle = document.createElement('div')
      toggle.className = 'autocompleted__toggle'
      toggle.id = jsonItem[matchKey]
      item.appendChild(toggle)
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

export default autocomplete