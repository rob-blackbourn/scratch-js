import * as actionTypes from '../actions/actionTypes'
import { UnitIdentifier } from '../converters/UnitConverter'
import { parseNumber, numberToString } from '../numbers/parsers'

export default repository => {

    const initialState = {
        source: {
            unitIdentifier: new UnitIdentifier(null, null, null, null),
            domains: Array.from(repository.converters.keys()),
            systems: [],
            authorities: [],
            names: [],
            value: ''
        },
        destination: {
            unitIdentifier: new UnitIdentifier(null, null, null, null),
            domains: Array.from(repository.converters.keys()),
            systems: [],
            authorities: [],
            names: [],
            value: ''
        },
    }

    function tryParse(value) {
        if (typeof value === "string") {
            return parseNumber(value)
        } else {
            return value
        }
    }

    function tryConvert(fromUnit, value, toUnit) {
        try {
            value = tryParse(value)
            let result = repository.findAndConvert(fromUnit, value, toUnit)
            result = numberToString(result)
            return result
        } catch (_) {
            return ''
        }
    }

    return (state=initialState, action) => {

        switch (action.type || null) {

            case actionTypes.SET_DOMAIN:
                try {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    const unitIdentifier = new UnitIdentifier(action.content.domain, null, null, null)
                    const systems = Array.from(repository.converters.get(action.content.domain).keys())
                    const authorities = []
                    const names = []

                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            unitIdentifier,
                            systems,
                            authorities,
                            names
                        }
                    }
                }
                catch (_) {
                    return state
                }
            case actionTypes.SET_SYSTEM:
                try {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    const unitIdentifier = new UnitIdentifier(obj.unitIdentifier.domain, action.content.system, null, null)
                    const authorities = Array.from(repository.converters.get(obj.unitIdentifier.domain).get(action.content.system).keys())
                    const names = []

                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            unitIdentifier,
                            authorities,
                            names
                        }
                    }
                }
                catch (_) {
                    return state
                }
            case actionTypes.SET_AUTHORITY:
                try {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    const unitIdentifier = new UnitIdentifier(obj.unitIdentifier.domain, obj.unitIdentifier.system, action.content.authority, null)
                    const names = Array.from(repository.converters.get(obj.unitIdentifier.domain).get(obj.unitIdentifier.system).get(action.content.authority).keys())
                    
                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            unitIdentifier,
                            names
                        }
                    }
                }
                catch (_) {
                    return state
                }
            case actionTypes.SET_NAME:
                try {
                    if (action.content.isSource) {
                        const unitIdentifier = new UnitIdentifier(state.source.unitIdentifier.domain, state.source.unitIdentifier.system, state.source.unitIdentifier.authority, action.content.name)
                        const value = tryConvert(unitIdentifier, state.destination.value, state.source.unitIdentifier)
    
                        return {
                            ...state,
                            source: {
                                ...state.source,
                                unitIdentifier,
                                value 
                            }
                        }
                        }
                    else {
                        const unitIdentifier = new UnitIdentifier(state.destination.unitIdentifier.domain, state.destination.unitIdentifier.system, state.destination.unitIdentifier.authority, action.content.name)
                        const value = tryConvert(state.source.unitIdentifier, state.source.value, unitIdentifier)
    
                        return {
                            ...state,
                            destination: {
                                ...state.destination,
                                unitIdentifier,
                                value
                            }
                        }
                        }
                }   
                catch (_) {
                    return state
                }
            case actionTypes.SET_VALUE:
                try {
                    if (action.content.isSource) {
                        const value = action.content.value
                        const converted = tryConvert(state.source.unitIdentifier, value, state.destination.unitIdentifier)
    
                        return {
                            ...state,
                            source: {
                                ...state.source,
                                value
                            },
                            destination: {
                                ...state.destination,
                                value: converted
                            }
                        }
                    }
                    else {
                        const value = action.content.value
                        const converted = tryConvert(state.destination.unitIdentifier, value, state.source.unitIdentifier)
    
                        return {
                            ...state,
                            source: {
                                ...state.source,
                                value: converted
                            },
                            destination: {
                                ...state.destination,
                                value
                            }
                        }
                    }
                }
                catch (_) {
                    return state
                }
            default:
                return state
        }

    };
}
