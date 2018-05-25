import createRepository, { UnitIdentifier } from '../converters'
import * as domains from '../converters/definitions/domains'
import * as authorities from '../converters/definitions/authorities'
import * as systems from '../converters/definitions/systems'
import * as units from '../converters/definitions/units'
import * as usages from '../converters/definitions/usages'
import createUnitExplorer from './UnitExplorer'
import * as actionTypes from '../actions/actionTypes'

const repository = createRepository()
const unitExplorer = createUnitExplorer(repository);

describe('unit explorer reducer', () => {

    it('should handle initial state', () => {
        const state = unitExplorer(undefined, {})
        expect(state).toBeDefined();
        expect(state.source).toBeDefined();
        expect(state.source.unitIdentifier).toBeInstanceOf(UnitIdentifier)
        expect(state.source.unitIdentifier.domain).toBeNull()
        expect(state.source.unitIdentifier.authority).toBeNull()
        expect(state.source.unitIdentifier.system).toBeNull()
        expect(state.source.unitIdentifier.unit).toBeNull()
        expect(state.source.domains).toBeInstanceOf(Array)
        expect(state.source.domains.length).toBeGreaterThan(0)
        expect(state.source.systems).toBeInstanceOf(Array)
        expect(state.source.systems.length).toBe(0)
        expect(state.source.authorities).toBeInstanceOf(Array)
        expect(state.source.authorities.length).toBe(0)
        expect(state.source.units).toBeInstanceOf(Array)
        expect(state.source.units.length).toBe(0)
        expect(state.source.value).toBe("")
        expect(state.destination).toBeDefined();
        expect(state.destination.unitIdentifier).toBeInstanceOf(UnitIdentifier)
        expect(state.destination.unitIdentifier.domain).toBeNull()
        expect(state.destination.unitIdentifier.authority).toBeNull()
        expect(state.destination.unitIdentifier.system).toBeNull()
        expect(state.destination.unitIdentifier.unit).toBeNull()
        expect(state.destination.domains).toBeInstanceOf(Array)
        expect(state.destination.domains.length).toBeGreaterThan(0)
        expect(state.destination.systems).toBeInstanceOf(Array)
        expect(state.destination.systems.length).toBe(0)
        expect(state.destination.authorities).toBeInstanceOf(Array)
        expect(state.destination.authorities.length).toBe(0)
        expect(state.destination.units).toBeInstanceOf(Array)
        expect(state.destination.units.length).toBe(0)
        expect(state.destination.value).toBe("")
    });

    it('should handle SET_*', () => {
        let state = unitExplorer(undefined, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Length.key,
                isSource: true
            }
        })
        expect(state.source.unitIdentifier.domain).toBe(domains.Length)
        expect(state.source.domains).toBeInstanceOf(Array)
        expect(state.source.domains.length).toBeGreaterThan(0)
        expect(state.source.authorities).toBeInstanceOf(Array)
        expect(state.source.authorities.length).toBeGreaterThan(0)
        expect(state.source.systems).toBeInstanceOf(Array)
        expect(state.source.systems.length).toBe(0)
        expect(state.source.units).toBeInstanceOf(Array)
        expect(state.source.units.length).toBe(0)
        expect(state.destination.value).toBe("")
        state = unitExplorer(state, {
            type: actionTypes.SET_AUTHORITY,
            content: {
                authority: authorities.SystemInternational.key,
                isSource: true
            }
        })
        expect(state.source.unitIdentifier.domain).toBe(domains.Length)
        expect(state.source.unitIdentifier.authority).toBe(authorities.SystemInternational)
        expect(state.source.domains).toBeInstanceOf(Array)
        expect(state.source.domains.length).toBeGreaterThan(0)
        expect(state.source.authorities).toBeInstanceOf(Array)
        expect(state.source.authorities.length).toBeGreaterThan(0)
        expect(state.source.systems).toBeInstanceOf(Array)
        expect(state.source.systems.length).toBeGreaterThan(0)
        expect(state.source.units).toBeInstanceOf(Array)
        expect(state.source.units.length).toBe(0)
        expect(state.destination.value).toBe("")
        state = unitExplorer(state, {
            type: actionTypes.SET_SYSTEM,
            content: {
                system: systems.Metric.key,
                isSource: true
            }
        })
        expect(state.source.unitIdentifier.domain).toBe(domains.Length)
        expect(state.source.unitIdentifier.authority).toBe(authorities.SystemInternational)
        expect(state.source.unitIdentifier.system).toBe(systems.Metric)
        expect(state.source.domains).toBeInstanceOf(Array)
        expect(state.source.domains.length).toBeGreaterThan(0)
        expect(state.source.authorities).toBeInstanceOf(Array)
        expect(state.source.authorities.length).toBeGreaterThan(0)
        expect(state.source.systems).toBeInstanceOf(Array)
        expect(state.source.systems.length).toBeGreaterThan(0)
        expect(state.source.units).toBeInstanceOf(Array)
        expect(state.source.units.length).toBeGreaterThan(0)
        expect(state.destination.value).toBe("")
        state = unitExplorer(state, {
            type: actionTypes.SET_UNIT,
            content: {
                unit: units.Meter.key,
                isSource: true
            }
        })
        expect(state.source.unitIdentifier.domain).toBe(domains.Length)
        expect(state.source.unitIdentifier.authority).toBe(authorities.SystemInternational)
        expect(state.source.unitIdentifier.system).toBe(systems.Metric)
        expect(state.source.unitIdentifier.unit).toBe(units.Meter)
        expect(state.source.domains).toBeInstanceOf(Array)
        expect(state.source.domains.length).toBeGreaterThan(0)
        expect(state.source.authorities).toBeInstanceOf(Array)
        expect(state.source.authorities.length).toBeGreaterThan(0)
        expect(state.source.systems).toBeInstanceOf(Array)
        expect(state.source.systems.length).toBeGreaterThan(0)
        expect(state.source.units).toBeInstanceOf(Array)
        expect(state.source.units.length).toBeGreaterThan(0)
        expect(state.destination.value).toBe("")
        state = unitExplorer(state, {
            type: actionTypes.SET_VALUE,
            content: {
                value: 1,
                isSource: true
            }
        })
        expect(state.source.unitIdentifier.domain).toBe(domains.Length)
        expect(state.source.unitIdentifier.authority).toBe(authorities.SystemInternational)
        expect(state.source.unitIdentifier.system).toBe(systems.Metric)
        expect(state.source.unitIdentifier.unit).toBe(units.Meter)
        expect(state.source.domains).toBeInstanceOf(Array)
        expect(state.source.domains.length).toBeGreaterThan(0)
        expect(state.source.authorities).toBeInstanceOf(Array)
        expect(state.source.authorities.length).toBeGreaterThan(0)
        expect(state.source.systems).toBeInstanceOf(Array)
        expect(state.source.systems.length).toBeGreaterThan(0)
        expect(state.source.units).toBeInstanceOf(Array)
        expect(state.source.units.length).toBeGreaterThan(0)
        expect(state.source.value).toBe(1)

    });

    it('should clear lists when domain is reset', () => {
        let state = unitExplorer(undefined, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Length.key,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_AUTHORITY,
            content: {
                authority: authorities.SystemInternational.key,
                isSOurce: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_SYSTEM,
            content: {
                system: systems.Metric.key,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_UNIT,
            content: {
                unit: units.Meter.key,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Mass.key,
                isSource: true
            }
        })
        expect(state.source.unitIdentifier.domain).toBe(domains.Mass)
        expect(state.source.domains).toBeInstanceOf(Array)
        expect(state.source.domains.length).toBeGreaterThan(0)
        expect(state.source.authorities).toBeInstanceOf(Array)
        expect(state.source.authorities.length).toBeGreaterThan(0)
        expect(state.source.systems).toBeInstanceOf(Array)
        expect(state.source.systems.length).toBe(0)
        expect(state.source.units).toBeInstanceOf(Array)
        expect(state.source.units.length).toBe(0)
    })

    it('should convert meters to feet', () => {
        let state = unitExplorer(undefined, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Length.key,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_AUTHORITY,
            content: {
                authority: authorities.SystemInternational.key,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_SYSTEM,
            content: {
                system: systems.Metric.key,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_UNIT,
            content: {
                unit: units.Meter.key,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_VALUE,
            content: {
                value: "1",
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Length.key,
                isSource: false
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_AUTHORITY,
            content: {
                authority: authorities.UnitedKingdom.key,
                isSource: false
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_SYSTEM,
            content: {
                system: systems.Imperial.key,
                isSource: false
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_UNIT,
            content: {
                unit: units.Foot.key,
                isSource: false
            }
        })
        expect(state.destination.value).toBe("3 1/4")
    })

    describe('matches', () => {

        it('should set suggestion', () => {
            let state = unitExplorer(undefined, {
                type: actionTypes.GET_SUGGESTIONS,
                content: {
                    text: 'cup',
                    usage: "Cookery",
                    isSource: true
                }
            })
            expect(state.source.suggestions.length).toBeGreaterThan(0)
        })

        it('should set converter', () => {
            let state = unitExplorer(undefined, {
                type: actionTypes.SET_CONVERTER,
                content: {
                    domain: domains.Volume.key,
                    authority: authorities.UnitedStates.key,
                    system: systems.Utensils.key,
                    unit: units.Cup.key,
                    isSource: true
                }
            })
            expect(state.source.unitIdentifier.domain).toBe(domains.Volume)
            expect(state.source.unitIdentifier.authority).toBe(authorities.UnitedStates)
            expect(state.source.unitIdentifier.system).toBe(systems.Utensils)
            expect(state.source.unitIdentifier.unit).toBe(units.Cup)
            state = unitExplorer(state, {
                type: actionTypes.SET_CONVERTER,
                content: {
                    domain: domains.Volume.key,
                    authority: authorities.UnitedStates.key,
                    system: systems.Customary.key,
                    unit: units.FluidOunce.key,
                    isSource: false
                }
            })
            expect(state.destination.unitIdentifier.domain).toBe(domains.Volume)
            expect(state.destination.unitIdentifier.authority).toBe(authorities.UnitedStates)
            expect(state.destination.unitIdentifier.system).toBe(systems.Customary)
            expect(state.destination.unitIdentifier.unit).toBe(units.FluidOunce)
            state = unitExplorer(state, {
                type: actionTypes.SET_VALUE,
                content: {
                    value: "1",
                    isSource: true
                }
            })
            expect(state.destination.value).toBe("8")
        })
    })
})