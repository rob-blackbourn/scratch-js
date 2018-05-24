import * as actionTypes from '../actions/actionTypes'
import { UnitIdentifier } from '../converters/UnitConverter'
import { parseNumber } from '../numbers/parsers'
import Fraction from '../numbers/Fraction'

export const ROUNDED_FRACTION_METHOD = 'fraction'

export default repository => {

    const initialState = {
        source: {
            unitIdentifier: new UnitIdentifier(null, null, null, null),
            domains: Array.from(repository.getDomains()),
            authorities: [],
            systems: [],
            units: [],
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
            domains: Array.from(repository.getDomains()),
            authorities: [],
            systems: [],
            units: [],
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
            return Number.NaN
        }
    }

    function tryConvert(fromUnit, value, toUnit, style) {
        try {
            value = tryParse(value)
            if (Number.isNaN(value)) {
                return ''
            }

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

                    const domain = repository.domains.get(action.content.domain)
                    const unitIdentifier = new UnitIdentifier(domain, null, null, null)
                    const authorities = Array.from(repository.getAuthorities(domain))
                    const systems = []
                    const units = []

                    const newState = {
                        ...state,
                        [key]: {
                            ...obj,
                            unitIdentifier,
                            authorities,
                            systems,
                            units
                        }
                    }

                    return newState
                }
                catch (_) {
                    return state
                }
            case actionTypes.SET_AUTHORITY:
                try {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    const authority = repository.authorities.get(action.content.authority)
                    const unitIdentifier = new UnitIdentifier(
                        obj.unitIdentifier.domain,
                        authority,
                        null,
                        null)
                    const systems = Array.from(
                        repository.getSystems(
                            obj.unitIdentifier.domain,
                            authority))
                    const units = []

                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            unitIdentifier,
                            systems,
                            units
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

                    const system = repository.systems.get(action.content.system)
                    const unitIdentifier = new UnitIdentifier(
                        obj.unitIdentifier.domain,
                        obj.unitIdentifier.authority,
                        system,
                        null)
                    const units = Array.from(
                        repository.getUnits(
                            obj.unitIdentifier.domain,
                            obj.unitIdentifier.authority,
                            system))
                    
                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            unitIdentifier,
                            units
                        }
                    }
                }
                catch (_) {
                    return state
                }
            case actionTypes.SET_UNIT:
                try {
                    const unit = repository.units.get(action.content.unit)

                    if (action.content.isSource) {
                        const unitIdentifier = new UnitIdentifier(
                            state.source.unitIdentifier.domain,
                            state.source.unitIdentifier.authority,
                            state.source.unitIdentifier.system,
                            unit)
                        console.log('unitIdentifier', unitIdentifier)
                        const sourceValue = tryConvert(
                            unitIdentifier,
                            state.destination.value,
                            state.source.unitIdentifier,
                            state.source.style)
                        console.log('sourceValue', sourceValue)
    
                        return {
                            ...state,
                            source: {
                                ...state.source,
                                unitIdentifier,
                                value: sourceValue
                            }
                        }
                    } else {
                        const unitIdentifier = new UnitIdentifier(
                            state.destination.unitIdentifier.domain,
                            state.destination.unitIdentifier.authority,
                            state.destination.unitIdentifier.system,
                            unit)
                        const destinationValue = tryConvert(
                            state.source.unitIdentifier,
                            state.source.value,
                            unitIdentifier,
                            state.destination.style)
    
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
                        const destinationValue = tryConvert(
                            state.source.unitIdentifier,
                            sourceValue,
                            state.destination.unitIdentifier,
                            state.destination.style)
    
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
                        const sourceValue = tryConvert(
                            state.destination.unitIdentifier,
                            destinationValue,
                            state.source.unitIdentifier,
                            state.source.style)
    
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

    }
}
