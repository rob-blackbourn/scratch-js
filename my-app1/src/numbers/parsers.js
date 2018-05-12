import Fraction from './Fraction';

export default function parseNumber(text) {
    
    let result = Fraction.parse(text);
    if (!result.isNaN()) {
        return result;
    }

    result = Number.parseFloat(text);
    if (Number.isInteger(result)) {
        return new Fraction(result, 1);
    }

    return result;
}