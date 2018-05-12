import {UnitIdentifier} from '../converters/UnitConverter'

export default repository => {

    const initialState = {
        unitIdentifier: new UnitIdentifier(null, null, null, null),
        domains: Array.from(repository.converters.keys()),
        systems: [],
        authorities: [],
        names: [],
    }

    return (state=initialState, action) => {

        switch (action.type) {

            case 'SELECT_DOMAIN':
                return {
                    ...state,
                    unitIdentifier: new UnitIdentifier(action.content.domain, null, null, null),
                    systems: Array.from(repository.converters.get(action.content.domain).keys()),
                    authorities: [],
                    names: [],
                }
            case 'SELECT_SYSTEM':
                return {
                    ...state,
                    unitIdentifier: new UnitIdentifier(state.unitIdentifier.domain, action.content.system, null, null),
                    authorities: Array.from(repository.converters.get(state.unitIdentifier.domain).get(action.content.system).keys()),
                    names: [],
                }
            case 'SELECT_AUTHORITY':
                return {
                    ...state,
                    unitIdentifier: new UnitIdentifier(state.unitIdentifier.domain, state.unitIdentifier.system, action.content.authority, null),
                    names: Array.from(repository.converters.get(state.unitIdentifier.domain).get(state.unitIdentifier.system).get(action.content.authority).keys())
                }
            case 'SELECT_NAME':
                return {
                    ...state,
                    unitIdentifier: new UnitIdentifier(state.unitIdentifier.domain, state.unitIdentifier.system, state.unitIdentifier.authority, action.content.name)
                }
                
            default:
                return state
        }

    };
}