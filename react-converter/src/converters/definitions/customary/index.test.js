import Repository from '../../Repository'
import {UnitIdentifier} from '../../UnitConverter'
import * as domains from '../domains'
import {UnitedStates, SystemInternational} from '../authorities'
import createMetricUnits, {Metric} from '../metric'
import createCustomaryUnits, {Customary} from './index'

const repository = new Repository()
createMetricUnits(repository)
createCustomaryUnits(repository)

describe('customary', () => {

    describe('length', () => {

        it('should convert miles to inches', () => {
            const miles = 1
            const inches = repository.findAndConvert(
                new UnitIdentifier(domains.Length, UnitedStates, Customary, 'mile'),
                miles,
                new UnitIdentifier(domains.Length, UnitedStates, Customary, 'inch'))
            expect(inches).toBe(1 * 12 * 5280)
        })

        it('should convert inches to miles', () => {
            const inches = 1 * 12 * 5280
            const miles = repository.findAndConvert(
                new UnitIdentifier(domains.Length, UnitedStates, Customary, 'inch'),
                inches,
                new UnitIdentifier(domains.Length, UnitedStates, Customary, 'mile'))
            expect(miles).toBe(1)
        })

        it('should convert inches to centimeters', () => {
            const inches = 1
            const centimeters = repository.findAndConvert(
                new UnitIdentifier(domains.Length, UnitedStates, Customary, 'inch'),
                inches,
                new UnitIdentifier(domains.Length, SystemInternational, Metric, 'centimeter'))
            expect(centimeters).toBe(2.54)
        })

        it('should convert centimeters to inches', () => {
            const centimeters = 2.54;
            const inches = repository.findAndConvert(
                new UnitIdentifier(domains.Length, SystemInternational, Metric, 'centimeter'),
                centimeters,
                new UnitIdentifier(domains.Length, UnitedStates, Customary, 'inch'))
            expect(inches).toBeCloseTo(1, 10)
        })

        describe('volume', () => {

            it('should convert fluid ounces to millilitres', () => {
                const fluidOunces = 1
                const millilitres = repository.findAndConvert(
                    new UnitIdentifier(domains.Volume, UnitedStates, Customary, 'fluid ounce'),
                    fluidOunces,
                    new UnitIdentifier(domains.Volume, SystemInternational, Metric, 'millilitre'))
                expect(millilitres).toBeCloseTo(29.5735295625, 10)
            })

        })

    })
})