import {mul, div, inv, add, sub, abs, neg, sign, eq} from './Arithmetic';
import Fraction from './Fraction';

describe('arithmetic', () => {

    describe('multiply', () => {

        it('should multiply two numbers', () => {
            const a = 2
            const b = 3
            const c = a * b
            expect(mul(a, b)).toEqual(c)
        })

        it('should multiply two fractions', () => {
            const a = new Fraction(1, 2)
            const b = new Fraction(2, 3)
            const c = a.mul(b)
            expect(mul(a, b)).toEqual(c)
        })

        it('should multiply an integer by a fraction', () => {
            const a = 3
            const b = new Fraction(2, 3)
            const c = b.mul(a)
            expect(mul(a, b)).toEqual(c)
        })

        it('should multiply a fraction by an integer', () => {
            const a = new Fraction(1, 2)
            const b = 3
            const c = a.mul(b)
            expect(mul(a, b)).toEqual(c)
        })

        it('should multiply a float by a fraction', () => {
            const a = 1.5
            const b = new Fraction(2, 3)
            const c = b.mul(a)
            expect(mul(a, b)).toEqual(c)
        })

        it('should multiply a fraction by a float', () => {
            const a = new Fraction(1, 2)
            const b = 1.5
            const c = a.mul(b)
            expect(mul(a, b)).toEqual(c)
        })
        
    });

    describe('divide', () => {

        it('should divide two numbers', () => {
            const a = 2
            const b = 3
            const c = a / b
            expect(div(a, b)).toEqual(c)
        })

        it('should divide two fractions', () => {
            const a = new Fraction(1, 2)
            const b = new Fraction(2, 3)
            const c = a.div(b)
            expect(div(a, b)).toEqual(c)
        })

        it('should divide an integer by a fraction', () => {
            const a = 3
            const b = new Fraction(2, 3)
            const c = inv(b).mul(a)
            expect(div(a, b)).toEqual(c)
        })

        it('should divide a fraction by an integer', () => {
            const a = new Fraction(1, 2)
            const b = 3
            const c = a.div(b)
            expect(div(a, b)).toEqual(c)
        })

        it('should divide a float by a fraction', () => {
            const a = 1.5
            const b = new Fraction(2, 3)
            const c = inv(b).mul(a)
            expect(div(a, b)).toEqual(c)
        })

        it('should divide a fraction by a float', () => {
            const a = new Fraction(1, 2)
            const b = 1.5
            const c = a.div(b)
            expect(div(a, b)).toEqual(c)
        })
        
    })

    describe('add', () => {

        it('should add two numbers', () => {
            const a = 2
            const b = 3
            const c = a + b
            expect(add(a, b)).toEqual(c)
        })

        it('should add two fractions', () => {
            const a = new Fraction(1, 2)
            const b = new Fraction(2, 3)
            const c = a.add(b)
            expect(add(a, b)).toEqual(c)
        })

        it('should add an integer to a fraction', () => {
            const a = 3
            const b = new Fraction(2, 3)
            const c = b.add(a)
            expect(add(a, b)).toEqual(c)
        })

        it('should add a fraction to an integer', () => {
            const a = new Fraction(1, 2)
            const b = 3
            const c = a.add(b)
            expect(add(a, b)).toEqual(c)
        })

        it('should add a float to a fraction', () => {
            const a = 1.5
            const b = new Fraction(2, 3)
            const c = b.add(a)
            expect(add(a, b)).toEqual(c)
        })

        it('should add a fraction to a float', () => {
            const a = new Fraction(1, 2)
            const b = 1.5
            const c = a.add(b)
            expect(add(a, b)).toEqual(c)
        })
        
    })

    describe('subtract', () => {

        it('should subtract two numbers', () => {
            const a = 2
            const b = 3
            const c = a - b
            expect(sub(a, b)).toEqual(c)
        })

        it('should subtract two fractions', () => {
            const a = new Fraction(1, 2)
            const b = new Fraction(2, 3)
            const c = a.sub(b)
            expect(sub(a, b)).toEqual(c)
        })

        it('should subtract an integer from a fraction', () => {
            const a = 3
            const b = new Fraction(2, 3)
            const c = b.neg().add(a)
            expect(sub(a, b)).toEqual(c)
        })

        it('should subtract a fraction from an integer', () => {
            const a = new Fraction(1, 2)
            const b = 3
            const c = a.sub(b)
            expect(sub(a, b)).toEqual(c)
        })

        it('should subtract a float from a fraction', () => {
            const a = 1.5
            const b = new Fraction(2, 3)
            const c = b.neg().add(a)
            expect(sub(a, b)).toEqual(c)
        })

        it('should subtract a fraction from a float', () => {
            const a = new Fraction(1, 2)
            const b = 1.5
            const c = a.sub(b)
            expect(sub(a, b)).toEqual(c)
        })
        
    })

    describe('abs', () => {

        it('should abs a positive integer', () => {
            const a = 2
            const b = Math.abs(a)
            expect(abs(a)).toEqual(b)
        })

        it('should abs a negative integer', () => {
            const a = -2
            const b = Math.abs(a)
            expect(abs(a)).toEqual(b)
        })

        it('should abs a positive float', () => {
            const a = 2.1
            const b = Math.abs(a)
            expect(abs(a)).toEqual(b)
        })

        it('should abs a negative integer', () => {
            const a = -2.1
            const b = Math.abs(a)
            expect(abs(a)).toEqual(b)
        })

        it('should abs a positive fraction', () => {
            const a = new Fraction(1, 2)
            const b = a.abs()
            expect(abs(a)).toEqual(b)
        })

        it('should abs a negative fraction', () => {
            const a = new Fraction(-1, 2)
            const b = a.abs()
            expect(abs(a)).toEqual(b)
        })
     
    })

    describe('neg', () => {

        it('should negate a positive integer', () => {
            const a = 2
            const b = -a
            expect(neg(a)).toEqual(b)
        })

        it('should negate a negative integer', () => {
            const a = -2
            const b = -a
            expect(neg(a)).toEqual(b)
        })

        it('should negate a positive float', () => {
            const a = 2.1
            const b = -a
            expect(neg(a)).toEqual(b)
        })

        it('should negate a negative integer', () => {
            const a = -2.1
            const b = -a
            expect(neg(a)).toEqual(b)
        })

        it('should negate a positive fraction', () => {
            const a = new Fraction(1, 2)
            const b = a.neg()
            expect(neg(a)).toEqual(b)
        })

        it('should negate a negative fraction', () => {
            const a = new Fraction(-1, 2)
            const b = a.neg()
            expect(neg(a)).toEqual(b)
        })
     
    })

    describe('inv', () => {

        it('should invert a positive integer', () => {
            const a = 2
            const b = 1 / a
            expect(inv(a)).toEqual(b)
        })

        it('should negate a negative integer', () => {
            const a = -2
            const b = 1 / a
            expect(inv(a)).toEqual(b)
        })

        it('should negate a positive float', () => {
            const a = 2.1
            const b = 1 / a
            expect(inv(a)).toEqual(b)
        })

        it('should negate a negative integer', () => {
            const a = -2.1
            const b = 1 / a
            expect(inv(a)).toEqual(b)
        })

        it('should negate a positive fraction', () => {
            const a = new Fraction(1, 2)
            const b = a.inv()
            expect(inv(a)).toEqual(b)
        })

        it('should negate a negative fraction', () => {
            const a = new Fraction(-1, 2)
            const b = a.inv()
            expect(inv(a)).toEqual(b)
        })
     
    })

    describe('sign', () => {

        it('should find the sign of a positive integer', () => {
            const a = 2
            const b = Math.sign(a)
            expect(sign(a)).toEqual(b)
        })

        it('should find the sign of a negative integer', () => {
            const a = -2
            const b = Math.sign(a)
            expect(sign(a)).toEqual(b)
        })

        it('should find the sign of a positive float', () => {
            const a = 2.1
            const b = Math.sign(a)
            expect(sign(a)).toEqual(b)
        })

        it('should find the sign of a negative integer', () => {
            const a = -2.1
            const b = Math.sign(a)
            expect(sign(a)).toEqual(b)
        })

        it('should find the sign of a positive fraction', () => {
            const a = new Fraction(1, 2)
            const b = a.sign()
            expect(sign(a)).toEqual(b)
        })

        it('should find the sign of a negative fraction', () => {
            const a = new Fraction(-1, 2)
            const b = a.sign()
            expect(sign(a)).toEqual(b)
        })
     
    })

    describe('equals', () => {

        it('should compare two numbers', () => {
            const a = 2
            const b = 2
            const c = 3
            expect(eq(a, b)).toBe(true)
            expect(eq(a, c)).toBe(false)
        })

        it('should compare two fractions', () => {
            const a = new Fraction(1, 2)
            const b = new Fraction(1, 2)
            const c = new Fraction(2, 3)
            expect(eq(a, b)).toBe(true)
            expect(eq(a, c)).toBe(false)
        })

        it('should compare an integer with a fraction', () => {
            const a = 2
            const b = new Fraction(2, 1)
            const c = new Fraction(1, 3)
            expect(eq(a, b)).toBe(true)
            expect(eq(a, c)).toBe(false)
        })

        it('should compare a fraction with an integer', () => {
            const a = new Fraction(2, 1)
            const b = 2
            const c = 1
            expect(eq(a, b)).toBe(true)
            expect(eq(a, c)).toBe(false)
        })

        it('should compare a float with a fraction', () => {
            const a = 0.5
            const b = new Fraction(1, 2)
            const c = new Fraction(1, 3)
            expect(eq(a, b)).toBe(true)
            expect(eq(a, c)).toBe(false)
        })

        it('should compare a fraction with a float', () => {
            const a = new Fraction(1, 2)
            const b = 0.5
            const c = 0.25
            expect(eq(a, b)).toBe(true)
            expect(eq(a, c)).toBe(false)
        })
        
    })

})