import { InchConverter, MileConverter } from './length'
import { FluidOunceConverter } from './volume'
import { MeterConverter, LitreConverter } from '../../si/metric/baseConverters'

describe('customary', () => {

    describe('length', () => {

        it('should convert miles to inches', () => {
            const miles = 1
            const inches = MileConverter.convert(miles, InchConverter)
            expect(inches).toBe(1 * 12 * 5280)
        })

        it('should convert inches to miles', () => {
            const inches = 1 * 12 * 5280
            const miles = InchConverter.convert(inches, MileConverter)
            expect(miles).toBe(1)
        })

        it('should convert inches to meters', () => {
            const inches = 1
            const meters = InchConverter.convert(inches, MeterConverter)
            expect(meters).toBe(2.54 / 100)
        })

        it('should convert meters to inches', () => {
            const meters = 2.54 / 100;
            const inches = MeterConverter.convert(meters, InchConverter)
            expect(inches).toBeCloseTo(1, 10)
        })

        describe('volume', () => {

            it('should convert fluid ounces to litres', () => {
                const fluidOunces = 1
                const litres = FluidOunceConverter.convert(fluidOunces, LitreConverter)
                expect(litres).toBeCloseTo(29.5735295625 / 1000, 10)
            })

        })

    })
})