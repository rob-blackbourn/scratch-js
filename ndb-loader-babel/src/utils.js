function arrayToObject(array, keySelector, projector) {
    return array.reduce((accumulator, currentValue, currentIndex, array) => {
        const key = keySelector(currentValue, currentIndex, array)
        accumulator[key] = projector(currentValue, currentIndex, array)
        return accumulator
    }, {})
}

function arrayToObjectList(array, keySelector, projector) {
    return array.reduce((accumulator, currentValue, currentIndex, array) => {
        const key = keySelector(currentValue, currentIndex, array)
        const value = projector(currentValue, currentIndex, array)
        if (!accumulator[key]) {
            accumulator[key] = [value]
        } else {
            accumulator[key].push(value)
        }
        return accumulator
    }, {})
}

export {
    arrayToObject,
    arrayToObjectList
}