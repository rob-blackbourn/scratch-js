import createRepository, { UnitIdentifier } from '../converters'
import * as domains from '../converters/definitions/domains'
import createUnitExplorer from './UnitExplorer'

const repository = createRepository()
const unitExplorer = createUnitExplorer(repository);

describe('unit explorer reducer', () => {

    it('should handle initial state', () => {
        const state = unitExplorer(undefined, {})
        expect(state).toBeDefined();
        expect(state.unitIdentifier).toBeInstanceOf(UnitIdentifier)
        expect(state.unitIdentifier.domain).toBeNull()
        expect(state.unitIdentifier.system).toBeNull()
        expect(state.unitIdentifier.authority).toBeNull()
        expect(state.unitIdentifier.name).toBeNull()
        expect(state.domains).toBeInstanceOf(Array)
        expect(state.domains.length).toBeGreaterThan(0)
        expect(state.systems).toBeInstanceOf(Array)
        expect(state.systems.length).toBe(0)
        expect(state.authorities).toBeInstanceOf(Array)
        expect(state.authorities.length).toBe(0)
        expect(state.names).toBeInstanceOf(Array)
        expect(state.names.length).toBe(0)
    });

    it('should handle SELECT_*', () => {
        let state = unitExplorer(undefined, {
            type: 'SELECT_DOMAIN',
            content: {
                domain: domains.Length
            }
        })
        expect(state.unitIdentifier.domain).toBe(domains.Length)
        expect(state.domains).toBeInstanceOf(Array)
        expect(state.domains.length).toBeGreaterThan(0)
        expect(state.systems).toBeInstanceOf(Array)
        expect(state.systems.length).toBeGreaterThan(0)
        expect(state.authorities).toBeInstanceOf(Array)
        expect(state.authorities.length).toBe(0)
        expect(state.names).toBeInstanceOf(Array)
        expect(state.names.length).toBe(0)
        state = unitExplorer(state, {
            type: 'SELECT_SYSTEM',
            content: {
                system: state.systems[0]
            }
        })
        expect(state.unitIdentifier.domain).toBe(domains.Length)
        expect(state.unitIdentifier.system).toBe(state.systems[0])
        expect(state.domains).toBeInstanceOf(Array)
        expect(state.domains.length).toBeGreaterThan(0)
        expect(state.systems).toBeInstanceOf(Array)
        expect(state.systems.length).toBeGreaterThan(0)
        expect(state.authorities).toBeInstanceOf(Array)
        expect(state.authorities.length).toBeGreaterThan(0)
        expect(state.names).toBeInstanceOf(Array)
        expect(state.names.length).toBe(0)
        state = unitExplorer(state, {
            type: 'SELECT_AUTHORITY',
            content: {
                authority: state.authorities[0]
            }
        })
        expect(state.unitIdentifier.domain).toBe(domains.Length)
        expect(state.unitIdentifier.system).toBe(state.systems[0])
        expect(state.unitIdentifier.authority).toBe(state.authorities[0])
        expect(state.domains).toBeInstanceOf(Array)
        expect(state.domains.length).toBeGreaterThan(0)
        expect(state.systems).toBeInstanceOf(Array)
        expect(state.systems.length).toBeGreaterThan(0)
        expect(state.authorities).toBeInstanceOf(Array)
        expect(state.authorities.length).toBeGreaterThan(0)
        expect(state.names).toBeInstanceOf(Array)
        expect(state.names.length).toBeGreaterThan(0)
        state = unitExplorer(state, {
            type: 'SELECT_NAME',
            content: {
                name: state.names[0]
            }
        })
        expect(state.unitIdentifier.domain).toBe(domains.Length)
        expect(state.unitIdentifier.system).toBe(state.systems[0])
        expect(state.unitIdentifier.authority).toBe(state.authorities[0])
        expect(state.unitIdentifier.name).toBe(state.names[0])
        expect(state.domains).toBeInstanceOf(Array)
        expect(state.domains.length).toBeGreaterThan(0)
        expect(state.systems).toBeInstanceOf(Array)
        expect(state.systems.length).toBeGreaterThan(0)
        expect(state.authorities).toBeInstanceOf(Array)
        expect(state.authorities.length).toBeGreaterThan(0)
        expect(state.names).toBeInstanceOf(Array)
        expect(state.names.length).toBeGreaterThan(0)

    });

    it('should clear lists when domain is reset', () => {
        let state = unitExplorer(undefined, {
            type: 'SELECT_DOMAIN',
            content: {
                domain: domains.Length
            }
        })
        state = unitExplorer(state, {
            type: 'SELECT_SYSTEM',
            content: {
                system: state.systems[0]
            }
        })
        state = unitExplorer(state, {
            type: 'SELECT_AUTHORITY',
            content: {
                authority: state.authorities[0]
            }
        })
        state = unitExplorer(state, {
            type: 'SELECT_NAME',
            content: {
                name: state.names[0]
            }
        })
        state = unitExplorer(state, {
            type: 'SELECT_DOMAIN',
            content: {
                domain: domains.Mass
            }
        })
        expect(state.unitIdentifier.domain).toBe(domains.Mass)
        expect(state.domains).toBeInstanceOf(Array)
        expect(state.domains.length).toBeGreaterThan(0)
        expect(state.systems).toBeInstanceOf(Array)
        expect(state.systems.length).toBeGreaterThan(0)
        expect(state.authorities).toBeInstanceOf(Array)
        expect(state.authorities.length).toBe(0)
        expect(state.names).toBeInstanceOf(Array)
        expect(state.names.length).toBe(0)
    })

})