function toTextValue (value, column) {
  if (!column) {
    return null
  }

  if (value === null || value === undefined || !column.numeric) {
    return value
  }

  return column.formatter ? column.formatter(value) : value.toString()
}

function toObject (array, keyField) {
  return Object.assign({}, ...array.map(item => ({ [item[keyField]]: item })))
}

export function stableFilter (rows, columns, filterText) {
  if (!filterText) {
    return rows
  }

  const fields = toObject(columns, 'field')

  const matchString = filterText.toLowerCase()

  function isInText (value) {
    if (value === null || value === undefined) {
      return false
    } else if (typeof value === 'string') {
      return value.toLowerCase().includes(matchString)
    } else if (typeof value[Symbol.iterator] === 'function') {
      for (const item of value) {
        if (isInText(item)) {
          return true
        }
      }
    } else if (typeof value === 'object') {
      for (const field in value) {
        const item = toTextValue(value[field], fields[field])
        if (isInText(item)) {
          return true
        }
      }
    } else {
      return false
    }
  }

  return rows.filter(isInText)
}
