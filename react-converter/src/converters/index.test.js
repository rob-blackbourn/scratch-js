import createRepository, {UnitIdentifier} from './index'

import Fraction from '../numbers/Fraction'
import * as domains from './definitions/domains'
import * as authorities from './definitions/authorities'
import * as systems from './definitions/systems'
import * as units from './definitions/units'

const repository = createRepository()

describe('converters', () => {

    describe('length', () => {

        it('should convert centimeters to inches', () => {
            const centimeters = 2.54;
            
            const centimeterConverter = repository.findByKey(
                domains.Length.key,
                authorities.SystemInternational.key,
                systems.Metric.key,
                'centimeter'
            )
            const inchConverter = repository.findByKey(
                domains.Length.key,
                authorities.UnitedKingdom.key,
                systems.Imperial.key,
                units.Inch.key
            )

            const inches =  repository.convert(centimeterConverter, centimeters, inchConverter)

            expect(inches).toBeCloseTo(1, 10)
        })

    });

    describe('utensils', () => {

        describe('spoons', () => {
    
            it('should convert US tablespoons to US fluid ounces', () => {
                
                const tablespoonConverter =
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.UnitedStates.key,
                        systems.Utensils.key,
                        units.Tablespoon.key)
                const fluidOunceConverter =
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.UnitedStates.key,
                        systems.Customary.key,
                        units.FluidOunce.key
                    )

                const usTableSpoons = 2
                const usFluidOunces = repository.convert(tablespoonConverter, usTableSpoons, fluidOunceConverter)
                expect(usFluidOunces.valueOf()).toBe(1)
            })
    
            it('should convert UK tablespoons to millilitres', () => {

                
                const tablespoonConverter =
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.UnitedKingdom.key,
                        systems.Utensils.key,
                        units.Tablespoon.key
                    )
                const millilitreConverter = 
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.SystemInternational.key,
                        systems.Metric.key,
                        'millilitre'
                    )

                const ukTableSpoons = 1
                const millilitres =  repository.convert(tablespoonConverter, ukTableSpoons, millilitreConverter)
                expect(millilitres.valueOf()).toBe(15)
            })
    
            it('should convert US tablespoons to millilitres', () => {

                const tablespoonConverter =
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.UnitedStates.key,
                        systems.Utensils.key,
                        units.Tablespoon.key)
                const millilitreConverter = 
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.SystemInternational.key,
                        systems.Metric.key,
                        'millilitre')

                const usTableSpoons = 1
                const millilitres =  repository.findAndConvert(tablespoonConverter, usTableSpoons, millilitreConverter)
                expect(millilitres.valueOf()).toBe(14.78676478125)
            })
            
            it('should convert US tablespoons to UK tablespoons', () => {

                const usTablespoonConverter =
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.UnitedStates.key,
                        systems.Utensils.key,
                        units.Tablespoon.key)

                const ukTablespoonConverter =
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.UnitedKingdom.key,
                        systems.Utensils.key,
                        units.Tablespoon.key)
                            
                const usTableSpoons = 1
                const ukTableSpoons =  repository.findAndConvert(usTablespoonConverter, usTableSpoons, ukTablespoonConverter)
                expect(ukTableSpoons.valueOf()).toBe(0.98578431875)
            })
    
        })
    
        describe('cups', () => {
    
            it('should convert US cups to UK cups', () => {


                const usCupConverter =
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.UnitedStates.key,
                        systems.Utensils.key,
                        units.Cup.key)

                const ukCupConverter =
                    repository.findByKey(
                        domains.Volume.key,
                        authorities.UnitedKingdom.key,
                        systems.Utensils.key,
                        units.Cup.key)
                
                const usCups = 1
                const ukCups =  repository.findAndConvert(usCupConverter, usCups, ukCupConverter)
                expect(ukCups.valueOf()).toBe(0.8326741846289889)
            })
    
        })
    
    })

    describe('domain repository', () => {

        it('should convert litres to grammes', () => {
            const litreConverter = repository.findByKey(
                domains.Volume.key,
                authorities.SystemInternational.key,
                systems.Metric.key,
                units.Litre.key)
            const grammeConverter = repository.findByKey(
                domains.Mass.key,
                authorities.SystemInternational.key,
                systems.Metric.key,
                units.Gramme.key)

            const litres = 1
            const density = 1000
            const grammes  = repository.findAndConvert(litreConverter, litres, grammeConverter, new Fraction(1, 1000))
            expect(grammes.valueOf()).toBe(1000)
        })

    })

})