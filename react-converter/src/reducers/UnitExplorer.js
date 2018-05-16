import * as actionTypes from '../actions/actionTypes'
import { UnitIdentifier } from '../converters/UnitConverter'
import { parseNumber } from '../numbers/parsers'
import Fraction from '../numbers/Fraction'

export const ROUNDED_FRACTION_METHOD = 'fraction'

export default repository => {

    const initialState = {
        source: {
            unitIdentifier: new UnitIdentifier(null, null, null, null),
            domains: Array.from(repository.converters.keys()),
            systems: [],
            authorities: [],
            names: [],
            value: '',
            style: {
                isDecimal: false,
                decimalPrecision: 2,
                isFractionRounded: true,
                fractionDenominators: [1, 2, 3, 4, 6, 8, 12, 16],
                isFractionRationalised: false,
                rationalisePrecision: 2, 
                fromFloatPrecision: 6
            }
        },
        destination: {
            unitIdentifier: new UnitIdentifier(null, null, null, null),
            domains: Array.from(repository.converters.keys()),
            systems: [],
            authorities: [],
            names: [],
            value: '',
            style: {
                isDecimal: false,
                decimalPrecision: 2,
                isFractionRounded: true,
                fractionDenominators: [1, 2, 3, 4, 6, 8, 12, 16],
                isFractionRationalised: false,
                rationalisePrecision: 2, 
                fromFloatPrecision: 6
            }
        }
    }

    function tryParse(value) {
        if (typeof value === "string") {
            return parseNumber(value)
        } else {
            return value
        }
    }

    function tryConvert(fromUnit, value, toUnit, style) {
        try {
            value = tryParse(value)
            let result = repository.findAndConvert(fromUnit, value, toUnit)

            if (style.isDecimal) {
                return result.valueOf().toFixed(style.decimalPrecision)
            } else {
                if (!(result instanceof Fraction)) {
                    result = Fraction.fromFloat(result, Math.pow(10, -style.fromFloatPrecision))
                }
                if (style.isFractionRationalised) {
                    result = result.rationalise(Math.pow(10, -style.rationalisePrecision))
                }
                if (style.isFractionRounded) {
                    result = result.roundTo(style.fractionDenominators)
                }
                return result.toString()
            }
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
                        const sourceValue = tryConvert(unitIdentifier, state.destination.value, state.source.unitIdentifier, state.source.style)
    
                        return {
                            ...state,
                            source: {
                                ...state.source,
                                unitIdentifier,
                                value: sourceValue
                            }
                        }
                        }
                    else {
                        const unitIdentifier = new UnitIdentifier(state.destination.unitIdentifier.domain, state.destination.unitIdentifier.system, state.destination.unitIdentifier.authority, action.content.name)
                        const destinationValue = tryConvert(state.source.unitIdentifier, state.source.value, unitIdentifier, state.destination.style)
    
                        return {
                            ...state,
                            destination: {
                                ...state.destination,
                                unitIdentifier,
                                value: destinationValue
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
                        const sourceValue = action.content.value
                        const destinationValue = tryConvert(state.source.unitIdentifier, sourceValue, state.destination.unitIdentifier, state.destination.style)
    
                        return {
                            ...state,
                            source: {
                                ...state.source,
                                value: sourceValue
                            },
                            destination: {
                                ...state.destination,
                                value: destinationValue
                            }
                        }
                    }
                    else {
                        const destinationValue = action.content.value
                        const sourceValue = tryConvert(state.destination.unitIdentifier, destinationValue, state.source.unitIdentifier, state.source.style)
    
                        return {
                            ...state,
                            source: {
                                ...state.source,
                                value: sourceValue
                            },
                            destination: {
                                ...state.destination,
                                value: destinationValue
                            }
                        }
                    }
                }
                catch (_) {
                    return state
                }
            case actionTypes.SET_STYLE:
                try {
                    const key = action.content.isSource ? "source" : "destination"
                    const altKey = action.content.isSource ? "destination" : "source"
                    const obj = state[key]
                    const altObj = state[altKey]
                    const { isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision } = action.content
                    const style = { isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision }

                    const value = tryConvert(altObj.unitIdentifier, altObj.value, obj.unitIdentifier, style)

                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            style,
                            value
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
