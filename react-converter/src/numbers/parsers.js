import Fraction from './Fraction'

export function parseNumber(text) {
    
    let result = Fraction.parse(text)
    if (!result.isNaN()) {
        return result
    }

    result = Number.parseFloat(text)
    if (Number.isInteger(result)) {
        return new Fraction(result, 1)
    }

    return result
}

export function numberToString(value, precision=2, denominators=[1, 2, 3, 4, 8]) {
    if (value instanceof Fraction) {
        return value.roundTo(denominators).toString()
    } else if (typeof value === 'number') {
        return value.toFixed(precision)
    }
}