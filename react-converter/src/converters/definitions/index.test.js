import { UnitIdentifier } from '../UnitConverter'
import Repository from '../Repository'
import * as domains from './domains'
import * as authorities from './authorities'
import * as systems from './systems'
import * as units from './units'
import { collectUnitConverters, collectDomainConverters } from './index'

const repository = new Repository()
repository.addRange(collectUnitConverters())
repository.domainConverters.addRange(collectDomainConverters())

describe('utensils', () => {

    describe('spoons', () => {

        it('should convert US tablespoons to US fluid ounces', () => {
            const usTableSpoons = 2
            const usFluidOunces =  repository.findAndConvert(
                new UnitIdentifier(domains.Volume, authorities.UnitedStates, systems.Utensils, units.Tablespoon),
                usTableSpoons,
                new UnitIdentifier(domains.Volume, authorities.UnitedStates, systems.Customary, units.FluidOunce))
            expect(usFluidOunces.valueOf()).toBe(1)
        })

        it('should convert UK tablespoons to litres', () => {
            const ukTableSpoons = 1
            const millilitres =  repository.findAndConvert(
                new UnitIdentifier(domains.Volume, authorities.UnitedKingdom, systems.Utensils, units.Tablespoon), 
                ukTableSpoons,
                new UnitIdentifier(domains.Volume, authorities.SystemInternational, systems.Metric, units.Litre))
            expect(millilitres.valueOf()).toBe(15 / 1000)
        })

        it('should convert US tablespoons to litres', () => {
            const usTableSpoons = 1
            const millilitres =  repository.findAndConvert(
                new UnitIdentifier(domains.Volume, authorities.UnitedStates, systems.Utensils, units.Tablespoon),
                usTableSpoons,
                new UnitIdentifier(domains.Volume, authorities.SystemInternational, systems.Metric, units.Litre))
            expect(millilitres.valueOf()).toBe(14.78676478125 / 1000)
        })
        
        it('should convert US tablespoons to UK tablespoons', () => {
            const usTableSpoons = 1
            const ukTableSpoons =  repository.findAndConvert(
                new UnitIdentifier(domains.Volume, authorities.UnitedStates, systems.Utensils, units.Tablespoon),
                usTableSpoons,
                new UnitIdentifier(domains.Volume, authorities.UnitedKingdom, systems.Utensils, units.Tablespoon))
            expect(ukTableSpoons.valueOf()).toBe(0.98578431875)
        })

    })

    describe('cups', () => {

        it('should convert US cups to UK cups', () => {
            const usCups = 1
            const ukCups =  repository.findAndConvert(
                new UnitIdentifier(domains.Volume, authorities.UnitedStates, systems.Utensils, units.Cup),
                usCups,
                new UnitIdentifier(domains.Volume, authorities.UnitedKingdom, systems.Utensils, units.Cup))
            expect(ukCups.valueOf()).toBe(0.8326741846289889)
        })

    })

})