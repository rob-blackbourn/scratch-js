import createRepository, { UnitIdentifier } from '../converters'
import * as domains from '../converters/definitions/domains'
import * as authorities from '../converters/definitions/authorities'
import * as systems from '../converters/definitions/systems'
import * as units from '../converters/definitions/units'
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
        expect(state.source.names).toBeInstanceOf(Array)
        expect(state.source.names.length).toBe(0)
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
        expect(state.destination.names).toBeInstanceOf(Array)
        expect(state.destination.names.length).toBe(0)
        expect(state.destination.value).toBe("")
    });

    it('should handle SET_*', () => {
        let state = unitExplorer(undefined, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Length,
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
        expect(state.source.names).toBeInstanceOf(Array)
        expect(state.source.names.length).toBe(0)
        expect(state.destination.value).toBe("")
        state = unitExplorer(state, {
            type: actionTypes.SET_AUTHORITY,
            content: {
                authority: authorities.SystemInternational,
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
        expect(state.source.names).toBeInstanceOf(Array)
        expect(state.source.names.length).toBe(0)
        expect(state.destination.value).toBe("")
        state = unitExplorer(state, {
            type: actionTypes.SET_SYSTEM,
            content: {
                system: systems.Metric,
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
        expect(state.source.names).toBeInstanceOf(Array)
        expect(state.source.names.length).toBeGreaterThan(0)
        expect(state.destination.value).toBe("")
        state = unitExplorer(state, {
            type: actionTypes.SET_NAME,
            content: {
                name: units.Meter,
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
        expect(state.source.names).toBeInstanceOf(Array)
        expect(state.source.names.length).toBeGreaterThan(0)
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
        expect(state.source.names).toBeInstanceOf(Array)
        expect(state.source.names.length).toBeGreaterThan(0)
        expect(state.source.value).toBe(1)

    });

    it('should clear lists when domain is reset', () => {
        let state = unitExplorer(undefined, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Length,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_AUTHORITY,
            content: {
                authority: authorities.SystemInternational,
                isSOurce: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_SYSTEM,
            content: {
                system: systems.Metric,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_NAME,
            content: {
                name: units.Meter,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Mass,
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
        expect(state.source.names).toBeInstanceOf(Array)
        expect(state.source.names.length).toBe(0)
    })

    it('should convert meters to feet', () => {
        let state = unitExplorer(undefined, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Length,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_AUTHORITY,
            content: {
                authority: authorities.SystemInternational,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_SYSTEM,
            content: {
                system: systems.Metric,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_NAME,
            content: {
                name: units.Meter,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_VALUE,
            content: {
                value: 1,
                isSource: true
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_DOMAIN,
            content: {
                domain: domains.Length,
                isSource: false
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_AUTHORITY,
            content: {
                authority: authorities.UnitedKingdom,
                isSource: false
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_SYSTEM,
            content: {
                system: systems.Imperial,
                isSource: false
            }
        })
        state = unitExplorer(state, {
            type: actionTypes.SET_NAME,
            content: {
                name: units.Foot,
                isSource: false
            }
        })
        expect(state.destination.value).toBe("3 1/4")
    })
})