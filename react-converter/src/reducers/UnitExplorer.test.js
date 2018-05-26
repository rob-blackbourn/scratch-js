import createRepository, { UnitIdentifier } from '../converters'
import * as domains from '../converters/definitions/domains'
import * as authorities from '../converters/definitions/authorities'
import * as systems from '../converters/definitions/systems'
import * as units from '../converters/definitions/units'
import * as usages from '../converters/definitions/usages'
import createUnitExplorer from './UnitExplorer'
import * as actionTypes from '../actions/actionTypes'
import { MeterConverter } from '../converters/definitions/si/metric';
import { CupConverter as UsCupConverter } from '../converters/definitions/us/utensils';
import { FluidOunceConverter as UsFluidOunceConverter } from '../converters/definitions/us/customary/volume';

const repository = createRepository()
const unitExplorer = createUnitExplorer(repository);

describe('unit explorer reducer', () => {

    it('should handle initial state', () => {
        const state = unitExplorer(undefined, {})
        expect(state).toBeDefined();
        expect(state.source).toBeDefined();
        expect(state.source.domain).toBeNull()
        expect(state.source.authority).toBeNull()
        expect(state.source.system).toBeNull()
        expect(state.source.unitConverter).toBeNull()
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
        expect(state.destination.domain).toBeNull()
        expect(state.destination.authority).toBeNull()
        expect(state.destination.system).toBeNull()
        expect(state.destination.unitConverter).toBeNull()
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
        expect(state.source.domain).toBe(domains.Length)
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
        expect(state.source.domain).toBe(domains.Length)
        expect(state.source.authority).toBe(authorities.SystemInternational)
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
        expect(state.source.domain).toBe(domains.Length)
        expect(state.source.authority).toBe(authorities.SystemInternational)
        expect(state.source.system).toBe(systems.Metric)
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
        expect(state.source.domain).toBe(domains.Length)
        expect(state.source.authority).toBe(authorities.SystemInternational)
        expect(state.source.system).toBe(systems.Metric)
        expect(state.source.unitConverter).toBe(MeterConverter)
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
        expect(state.source.domain).toBe(domains.Length)
        expect(state.source.authority).toBe(authorities.SystemInternational)
        expect(state.source.system).toBe(systems.Metric)
        expect(state.source.unitConverter).toBe(MeterConverter)
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
        expect(state.source.domain).toBe(domains.Mass)
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
                    converter: UsCupConverter,
                    isSource: true
                }
            })
            expect(state.source.domain).toBe(domains.Volume)
            expect(state.source.authority).toBe(authorities.UnitedStates)
            expect(state.source.system).toBe(systems.Utensils)
            expect(state.source.unitConverter).toBe(UsCupConverter)
            state = unitExplorer(state, {
                type: actionTypes.SET_CONVERTER,
                content: {
                    converter: UsFluidOunceConverter,
                    isSource: false
                }
            })
            expect(state.destination.domain).toBe(domains.Volume)
            expect(state.destination.authority).toBe(authorities.UnitedStates)
            expect(state.destination.system).toBe(systems.Customary)
            expect(state.destination.unitConverter).toBe(UsFluidOunceConverter)
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