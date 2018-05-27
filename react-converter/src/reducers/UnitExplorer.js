import * as actionTypes from '../actions/actionTypes'
import * as usages from '../converters/definitions/usages'
import { parseNumber } from '../numbers/parsers'
import Fraction from '../numbers/Fraction'

export const ROUNDED_FRACTION_METHOD = 'fraction'

export default repository => {

    const initialState = {
        source: {
            domain: null,
            authority: null,
            system: null,
            unitConverter: null,
            domains: Array.from(repository.getDomains()),
            authorities: [],
            systems: [],
            units: [],
            value: '',
            text: '',
            usage: '',
            maxItems: 5,
            suggestions: [],
            isSettingsOpen: false,
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
            domain: null,
            authority: null,
            system: null,
            unitConverter: null,
            domains: Array.from(repository.getDomains()),
            authorities: [],
            systems: [],
            units: [],
            value: '',
            text: '',
            usage: '',
            maxItems: 5,
            suggestions: [],
            isSettingsOpen: false,
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

    function tryConvert(fromUnitConverter, value, toUnitConverter, style) {
        if (!(fromUnitConverter && value && toUnitConverter)) {
            return ''
        }

        try {
            value = tryParse(value)
            if (Number.isNaN(value)) {
                return ''
            }

            let result = repository.convert(fromUnitConverter, value, toUnitConverter)

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

        try {
            switch (action.type || null) {

                case actionTypes.SET_DOMAIN: {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    const domain = repository.domains.get(action.content.domain)
                    const authority = null
                    const system = null
                    const unitConverter = null

                    const authorities = Array.from(repository.getAuthorities(domain))
                    const systems = []
                    const units = []

                    const newState = {
                        ...state,
                        [key]: {
                            ...obj,
                            domain,
                            authority,
                            system,
                            unitConverter,
                            authorities,
                            systems,
                            units
                        }
                    }

                    return newState
                }
                case actionTypes.SET_AUTHORITY: {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    const authority = repository.authorities.get(action.content.authority)
                    const system = null
                    const unitConverter = null
                    const systems = Array.from(repository.getSystems(obj.domain, authority))
                    const units = []

                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            authority,
                            system,
                            unitConverter,
                            systems,
                            units
                        }
                    }
                }
                case actionTypes.SET_SYSTEM: {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    const system = repository.systems.get(action.content.system)
                    const unitConverter = null
                    const units = Array.from(repository.getUnits(obj.domain, obj.authority, system))
                    
                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            system,
                            unitConverter,
                            units
                        }
                    }
                }
                case actionTypes.SET_UNIT: {

                    if (action.content.isSource) {

                        const unitConverter = repository.findByKey(
                            state.source.domain.key,
                            state.source.authority.key,
                            state.source.system.key,
                            action.content.unit)

                        const sourceValue = tryConvert(
                            state.destination.unitConverter,
                            state.destination.value,
                            unitConverter,
                            state.source.style)
    
                        return {
                            ...state,
                            source: {
                                ...state.source,
                                unitConverter,
                                value: sourceValue
                            }
                        }
                    } else {

                        const unitConverter = repository.findByKey(
                            state.destination.domain.key,
                            state.destination.authority.key,
                            state.destination.system.key,
                            action.content.unit)

                        const destinationValue = tryConvert(
                            state.source.unitConverter,
                            state.source.value,
                            unitConverter,
                            state.destination.style)
    
                        return {
                            ...state,
                            destination: {
                                ...state.destination,
                                unitConverter,
                                value: destinationValue
                            }
                        }
                    }
                }   
                case actionTypes.SET_VALUE: {
                    if (action.content.isSource) {

                        const sourceValue = action.content.value

                        const destinationValue = 
                            tryConvert(
                                state.source.unitConverter,
                                sourceValue,
                                state.destination.unitConverter,
                                state.destination.style) || state.destination.value
    
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
                            state.destination.unitConverter,
                            destinationValue,
                            state.source.unitConverter,
                            state.source.style) || state.source.value
    
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
                case actionTypes.SET_STYLE: {
                    const key = action.content.isSource ? "source" : "destination"
                    const altKey = action.content.isSource ? "destination" : "source"
                    const obj = state[key]
                    const altObj = state[altKey]
                    const { isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision } = action.content
                    const style = { isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision }

                    const value = tryConvert(altObj.unitConverter, altObj.value, obj.unitConverter, style) || altObj.value

                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            style,
                            value
                        }
                    }
                }
                case actionTypes.GET_SUGGESTIONS: {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    const text = action.content.text
                    const usage = usages[action.content.usage]
                    const maxItems = action.content.maxItems
                    const suggestions = text ? repository.match(text, usage, maxItems) : []

                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            text,
                            usage: action.content.usage,
                            maxItems,
                            suggestions
                        }
                    }
                }
                case actionTypes.SET_CONVERTER: {
                    const unitConverter = action.content.converter
                    const domain = unitConverter.domain
                    const authorities = Array.from(repository.getAuthorities(domain))
                    const authority = unitConverter.authority
                    const systems = Array.from(repository.getSystems(domain, authority))
                    const system = unitConverter.system
                    const units = Array.from(repository.getUnits(domain, authority, system))

                    if (action.content.isSource) {
                        const sourceValue =
                            tryConvert(
                                state.destination.unitConverter,
                                state.destination.value,
                                unitConverter,
                                state.source.style) || state.source.value

                        return {
                            ...state,
                            source: {
                                ...state.source,
                                domain,
                                authority,
                                system,
                                unitConverter,
                                authorities,
                                systems,
                                units,
                                value: sourceValue
                            }
                        }
                    } else {
                        const destinationValue =
                            tryConvert(
                                state.source.unitConverter,
                                state.source.value,
                                unitConverter,
                                state.destination.style) || state.destination.value

                        return {
                            ...state,
                            destination: {
                                ...state.destination,
                                domain,
                                authority,
                                system,
                                unitConverter,
                                authorities,
                                systems,
                                units,
                                value: destinationValue
                            }
                        }
                    }
                }
                case actionTypes.TOGGLE_SETTINGS: {
                    const key = action.content.isSource ? "source" : "destination"
                    const obj = state[key]

                    return {
                        ...state,
                        [key]: {
                            ...obj,
                            isSettingsOpen: !obj.isSettingsOpen
                        }
                    }
                    
                }
                default:
                    return state
            }
        } catch (error) {
            console.log('Failed to reduce - returning current state', error)
            return state
        }
    }
}
