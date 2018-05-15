import Fraction from './Fraction'

describe('fractions', () => {

    describe("Fraction constructor", () => {

        it("should construct a simple fraction", () => {
            const f = new Fraction(1, 2)
            expect(f.isNaN()).toBe(false)
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

        it("should construct a top heavy fraction", () => {
            const f = new Fraction(4, 3)
            expect(f.isNaN()).toBe(false)
            expect(f.numerator).toBe(4)
            expect(f.denominator).toBe(3)
        })

        it("should construct and simplify a fraction", () => {
            const f = new Fraction(2, 4)
            expect(f.isNaN()).toBe(false)
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

        it("should construct a fraction where the numerator is negative", () => {
            const f = new Fraction(-1, 2)
            expect(f.isNaN()).toBe(false)
            expect(f.numerator).toBe(-1)
            expect(f.denominator).toBe(2)
        })

        it("should construct a fraction where the denominator is negative", () => {
            const f = new Fraction(1, -2)
            expect(f.isNaN()).toBe(false)
            expect(f.numerator).toBe(-1)
            expect(f.denominator).toBe(2)
        })

        it('should construct a positive fraction if bothe the numerator and denominator are negative', () => {
            const f1 = new Fraction(-1, -2)
            expect(f1.numerator).toBe(1)
            expect(f1.denominator).toBe(2)
        })

        it("should fail to construct a fraction beacause the denominator is zero.", () => {
            const f = new Fraction(1, 0)
            expect(f.isNaN()).toBe(true)
        })

        it("should fail to construct a fraction because neither argument is an integer", () => {
            var f = null

            f = new Fraction(1.2, 3.4)
            expect(f.isNaN())
                .toBe(true)

        })

        it("should fail to construct a fraction because the first argument is not an integer", () => {
            var f = null

            f = new Fraction(1.2, 3)
            expect(f.isNaN())
                .toBe(true)

            f = new Fraction(1, 3.4)
            expect(f.isNaN())
                .toBe(true)

            f = new Fraction(null, null)
            expect(f.isNaN())
                .toBe(true)

        })

        it("should fail to construct a fraction because the second argument is not an integer", () => {
            var f = null

            f = new Fraction(1, 3.4)
            expect(f.isNaN())
                .toBe(true)

        })

        it("should fail to construct a fraction with no args", () => {
            var f = null

            f = new Fraction()
            expect(f.isNaN())
                .toBe(true)

        })

    })

    describe("Fraction absolute", function () {

        it("should leave a positive fraction unchanged", function () {
            const a = new Fraction(1, 2)
            const f = a.abs()
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

        it("should make a negative fraction positive", function () {
            const a = new Fraction(-1, 2)
            const f = a.abs()
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

    })

    describe("Fraction equals", function () {

        it("should compare fractions to be equal", function () {
            const a = new Fraction(1, 2)
            const b = new Fraction(1, 2)
            expect(a.eq(b)).toBe(true)
        })

        it("should compare fractions to be unequal", function () {
            const a = new Fraction(1, 2)
            const b = new Fraction(1, 4)
            expect(a.eq(b)).toBe(false)
        })

        it("should compare negative fractions to be equal", function () {
            const a = new Fraction(-1, 2)
            const b = new Fraction(-1, 2)
            expect(a.eq(b)).toBe(true)
        })

        it("should compare a fraction and an integer to be equal", function () {
            const a = new Fraction(2, 1)
            expect(a.eq(2)).toBe(true)
        })

        it("should compare a fraction and a float to be equal", function () {
            const a = new Fraction(1, 2)
            expect(a.eq(0.5)).toBe(true)
        })

    })

    describe("Fraction not equals", function () {

        it("should compare same fractions to be equal", function () {
            const a = new Fraction(1, 2)
            const b = new Fraction(1, 2)
            expect(a.ne(b)).toBe(false)
        })

        it("should compare different fractions to be not equal", function () {
            const a = new Fraction(1, 2)
            const b = new Fraction(1, 4)
            expect(a.ne(b)).toBe(true)
        })

        it("should compare same negative fractions to be equal", function () {
            const a = new Fraction(-1, 2)
            const b = new Fraction(-1, 2)
            expect(a.ne(b)).toBe(false)
        })

        it("should compare different negative fractions to be not equal", function () {
            const a = new Fraction(-1, 2)
            const b = new Fraction(-1, 4)
            expect(a.ne(b)).toBe(true)
        })

        it("should compare a fraction and an integer to be equal", function () {
            const a = new Fraction(2, 1)
            expect(a.ne(2)).toBe(false)
        })

        it("should compare a fraction and an integer to be equal", function () {
            const a = new Fraction(2, 1)
            expect(a.ne(3)).toBe(true)
        })

        it("should compare a fraction and a float to be equal", function () {
            const a = new Fraction(1, 2)
            expect(a.ne(0.5)).toBe(false)
        })

        it("should compare a fraction and a float to be equal", function () {
            const a = new Fraction(1, 2)
            expect(a.ne(0.75)).toBe(true)
        })

    })

    describe("Fraction less than", function () {

        it("should compare two fractions", function () {
            const a = new Fraction(1, 4)
            const b = new Fraction(1, 2)
            expect(a.lt(b)).toBe(true)
            expect(b.lt(a)).toBe(false)
        })

        it("should compare a fraction to an integer", function () {
            const a = new Fraction(1, 4)
            expect(a.lt(1)).toBe(true)
            expect(a.lt(0)).toBe(false)
        })

        it("should compare a fraction to an float", function () {
            const a = new Fraction(1, 4)
            expect(a.lt(0.5)).toBe(true)
            expect(a.lt(0.1)).toBe(false)
        })

    })

    describe("Fraction add", function () {
        it("should add two fractions", function () {
            const a = new Fraction(1, 4)
            const b = new Fraction(1, 2)
            const f = a.add(b)
            expect(f.numerator)
                .toBe(3)
            expect(f.denominator)
                .toBe(4)
        })

        it("should add a fraction to an integer", function () {
            const a = new Fraction(1, 4)
            const f = a.add(2)
            expect(f.numerator).toBe(9)
            expect(f.denominator).toBe(4)
        })

        it("should add a fraction to a float", function () {
            const a = new Fraction(1, 4)
            const f = a.add(0.5)
            expect(f).toBe(0.75)
        })

        it("should add a fraction to a string", function () {
            const a = new Fraction(1, 4)
            const f = a.add(" hello")
            expect(f).toBe("0.25 hello")
        })

        it("should fail to add a fraction to NaN", function () {
            const a = new Fraction(1, 4)
            const f = a.add(Number.NaN)
            expect(Number.isNaN(f.valueOf())).toBeTruthy()
        })
    })

    describe("Fraction subtract", function () {

        it("should subtract two fractions", function () {
            const a = new Fraction(1, 4)
            const b = new Fraction(1, 2)
            const f = a.sub(b)
            expect(f.numerator).toBe(-1)
            expect(f.denominator).toBe(4)
        })

        it("should subtract a fraction from an integer", function () {
            const a = new Fraction(1, 4)
            const f = a.sub(2)
            expect(f.numerator).toBe(-7)
            expect(f.denominator).toBe(4)
        })

        it("should subtract a fraction from a float", function () {
            const a = new Fraction(1, 4)
            const f = a.sub(0.5)
            expect(f).toBe(-0.25)
        })

        it("should subtract a fraction to a string returning NaN", function () {
            const a = new Fraction(1, 4)
            const f = a.sub(" hello")
            expect(Number.isNaN(f)).toBe(true)
        })

        it("should fail to subtract a fraction from NaN", function () {
            const a = new Fraction(1, 4)
            const f = a.sub(Number.NaN)
            expect(Number.isNaN(f)).toBe(true)
        })

    })

    describe("Fraction multiply", function () {

        it("should multiply two fractions", function () {
            const a = new Fraction(1, 4)
            const b = new Fraction(1, 2)
            const f = a.mul(b)
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(8)
        })

        it("should multiply a fraction by an integer", function () {
            const a = new Fraction(1, 4)
            const f = a.mul(2)
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

        it("should multiply a fraction by a float", function () {
            const a = new Fraction(1, 4)
            const f = a.mul(0.5)
            expect(f).toEqual(0.125)
        })

        it("should fail to multiply a fraction by a string", function () {
            const a = new Fraction(1, 4)
            const f = a.mul(" hello")
            expect(Number.isNaN(f)).toBe(true)
        })

        it("should fail to multiply a fraction by NaN", function () {
            const a = new Fraction(1, 4)
            const f = a.mul(Number.NaN)
            expect(Number.isNaN(f)).toBe(true)
        })

    })

    describe("Fraction divide", function () {

        it("should divide two fractions", function () {
            const a = new Fraction(1, 4)
            const b = new Fraction(1, 2)
            const f = a.div(b)
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

        it("should divide a fraction by an integer", function () {
            const a = new Fraction(1, 4)
            const f = a.div(2)
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(8)
        })

        it("should divide a fraction by a float", function () {
            const a = new Fraction(1, 4)
            const f = a.div(0.5)
            expect(f).toBe(0.5)
        })

        it("should divide a fraction by a string", function () {
            const a = new Fraction(1, 4)
            const f = a.div(" hello")
            expect(Number.isNaN(f)).toBe(true)
        })

        it("should fail to divide a fraction by NaN", function () {
            const a = new Fraction(1, 4)
            const f = a.div(Number.NaN)
            expect(Number.isNaN(f)).toBe(true)
        })

    })

    describe("Fraction negate", function () {

        it("should make a positive fraction negative", function () {
            const a = new Fraction(1, 2)
            const f = a.neg()
            expect(f.numerator).toBe(-1)
            expect(f.denominator).toBe(2)
        })

        it("should make a negative fraction positive", function () {
            const a = new Fraction(-1, 2)
            const f = a.neg()
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

    })

    describe("Fraction inverse", function () {

        it("should invert fraction", function () {
            const a = new Fraction(3, 4)
            const f = a.inv()
            expect(f.numerator).toBe(4)
            expect(f.denominator).toBe(3)
        })

        it("should invert a negative fraction", function () {
            const a = new Fraction(-3, 4)
            const f = a.inv()
            expect(f.numerator).toBe(-4)
            expect(f.denominator).toBe(3)
        })

    })

    describe("Fraciton Parse", function () {

        it("Should parse a simple fraction.", function () {
            const f = Fraction.parse("1/2")
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

        it("Should parse a top heavy fraction.", function () {
            const f = Fraction.parse("1 1/2")
            expect(f.numerator).toBe(3)
            expect(f.denominator).toBe(2)
        })

        it("Should parse a whole number.", function () {
            const f = Fraction.parse("2")
            expect(f.numerator).toBe(2)
            expect(f.denominator).toBe(1)
        })

        it("Should parse a simple negative fraction.", function () {
            const f = Fraction.parse("-1/2")
            expect(f.numerator).toBe(-1)
            expect(f.denominator).toBe(2)
        })

        it("Should parse a negative top heavy fraction.", function () {
            const f = Fraction.parse("-1 1/2")
            expect(f.numerator).toBe(-3)
            expect(f.denominator).toBe(2)
        })

        it("Should parse a whole negative number.", function () {
            const f = Fraction.parse("-2")
            expect(f.numerator).toBe(-2)
            expect(f.denominator).toBe(1)
        })

        it("Should parse a simple positive fraction.", function () {
            const f = Fraction.parse("+1/2")
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

        it("Should parse a positive top heavy fraction.", function () {
            const f = Fraction.parse("+1 1/2")
            expect(f.numerator).toBe(3)
            expect(f.denominator).toBe(2)
        })

        it("Should parse a whole positive number.", function () {
            const f = Fraction.parse("+2")
            expect(f.numerator).toBe(2)
            expect(f.denominator).toBe(1)
        })

    })

    describe("Fraction toString", function () {

        it("should display a simple fraction", function () {
            const f = new Fraction(1, 2).toString()
            expect(f).toBe("1/2")
        })

        it("should display a top heavy fraction", function () {
            const  f = new Fraction(3, 2).toString()
            expect(f).toBe("1 1/2")
        })

        it("should display a whole number", function () {
            const f = new Fraction(1, 1).toString()
            expect(f).toBe("1")
        })

        it("should display a negative simple fraction", function () {
            const f = new Fraction(-1, 2).toString()
            expect(f).toBe("-1/2")
        })

        it("should display a negative top heavy fraction", function () {
            const f = new Fraction(-3, 2).toString()
            expect(f).toBe("-1 1/2")
        })

        it("should display a negative whole number", function () {
            const f = new Fraction(-1, 1).toString()
            expect(f).toBe("-1")
        })

        it("should display NaN", function () {
            const  f = new Fraction().toString()
            expect(f).toBe(Number.NaN.toString())
        })

        it("should display 0", function () {
            const  f = new Fraction(0, 1).toString()
            expect(f).toBe("0")
        })

    })

    it('Should round fraction to denominator', function () {

        let f1, f2, adj = new Fraction(1, 100)

        f1 = new Fraction(1, 5)
        f2 = f1.add(adj).roundTo([2, 3, 4, 5])
        expect(f2.eq(f1)).toBeTruthy()

        f1 = new Fraction(1, 4)
        f2 = f1.add(adj).roundTo([2, 3, 4, 5])
        expect(f2.eq(f1)).toBeTruthy()

        f1 = new Fraction(1, 3)
        f2 = f1.add(adj).roundTo([2, 3, 4, 5])
        expect(f2.eq(f1)).toBeTruthy()

        f1 = new Fraction(1, 2)
        f2 = f1.add(adj).roundTo([2, 3, 4, 5])
        expect(f2.eq(f1)).toBeTruthy()

        f1 = new Fraction(1, 4)
        f2 = f1.add(adj).roundTo([2, 3, 4, 5])
        expect(f2.eq(f1)).toBeTruthy()

        f1 = new Fraction(473176473, 9092180000)
        f2 = f1.roundTo([2, 3, 4, 8])
        expect(f2.eq(new Fraction(1, 8))).toBeTruthy()

        
    })

    it('should rationalise a fraction', () => {
        const f1 = new Fraction(473176473, 9092180000)
        const f2 = f1.rationalise(0.01)
        expect(f2.eq(new Fraction(1, 17))).toBeTruthy()
    })


    describe("Fraction fromFloat", function () {

        it('should convert simple float', function () {
            const f = Fraction.fromFloat(0.5)
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(2)
        })

        it('should convert complex float', function () {
            const f = Fraction.fromFloat(1.0 / 3.0)
            expect(f.numerator).toBe(1)
            expect(f.denominator).toBe(3)
        })

        it('should convert simple negative float', function () {
            const f = Fraction.fromFloat(-0.5)
            expect(f.numerator).toBe(-1)
            expect(f.denominator).toBe(2)
        })

        it('should convert negative complex float', function () {
            const f = Fraction.fromFloat(-1.0 / 3.0)
            expect(f.numerator).toBe(-1)
            expect(f.denominator).toBe(3)
        })

        it('should convert NaN', function () {
            const f = Fraction.fromFloat(Number.NaN)
            expect(f.isNaN()).toBe(true)
        })

    })
})