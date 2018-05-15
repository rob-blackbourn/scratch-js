import Fraction from './Fraction'
import { parseNumber } from './parsers'

describe('parsers', () => {

    it('should parse int as a fraction', () => {
        const text = "42"
        const result = parseNumber(text)
        const expected = new Fraction(42, 1)
        expect(result).toEqual(expected)
    })

    it('should parse a float', () => {
        const text = "3.14159265359"
        const result = parseNumber(text)
        const expected = 3.14159265359
        expect(result).toEqual(expected)
    })

    it('should parse a simple fraction', () => {
        const text = "3/8"
        const result = parseNumber(text)
        const expected = new Fraction(3, 8)
        expect(result).toEqual(expected)
    })

    it('should parse a fraction with a whole number', () => {
        const text = "1 3/8"
        const result = parseNumber(text)
        const expected = new Fraction(11, 8)
        expect(result).toEqual(expected)
    })

    it('should fail to parse', () => {
        const text = "this is not a test"
        const result = parseNumber(text)
        expect(result).toBeNaN()
    })
    
})