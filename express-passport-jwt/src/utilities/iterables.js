export function some (iterable, predicate) {
  for (const item of iterable) {
    if (predicate(item)) {
      return true
    }
  }
  return false
}

export function find (iterable, predicate) {
  let i = 0
  for (const item of iterable) {
    if (predicate(item, ++i)) {
      return item
    }
  }
  return undefined
}

export function * filter (iterable, predicate) {
  let i = 0
  for (const item of iterable) {
    if (predicate(item, i++)) {
      yield item
    }
  }
}
