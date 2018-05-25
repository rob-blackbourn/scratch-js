import * as actionTypes from './actionTypes'

export const setDomain = (domain, isSource) => ({
    type: actionTypes.SET_DOMAIN,
    content: {
        domain,
        isSource
    }
})

export const setAuthority = (authority, isSource) => ({
    type: actionTypes.SET_AUTHORITY,
    content: {
        authority,
        isSource
    }
})

export const setSystem = (system, isSource) => ({
    type: actionTypes.SET_SYSTEM,
    content: {
        system,
        isSource
    }
})

export const setUnit = (unit, isSource) => ({
    type: actionTypes.SET_UNIT, content:
    {
        unit,
        isSource
    }
})

export const setValue = (value, isSource) => ({
    type: actionTypes.SET_VALUE, 
    content: { 
        value,
        isSource
    }
})

export const getSuggestions = (text, usage, maxItems, isSource) => ({
    type: actionTypes.GET_SUGGESTIONS,
    content: {
        text,
        usage,
        maxItems,
        isSource
    }
})

export const setConverter = (domain, authority, system, unit, isSource) => ({
    type: actionTypes.SET_CONVERTER,
    content: {
        domain,
        authority,
        system,
        unit,
        isSource
    }
})

export const setStyle = (isDecimal, decimalPrecision, isFractionRounded, fractionDenominators, isFractionRationalised, rationalisePrecision, fromFloatPrecision, isSource) => ({
    type: actionTypes.SET_STYLE,
    content: {
        isDecimal,
        decimalPrecision,
        isFractionRounded,
        fractionDenominators,
        isFractionRationalised,
        rationalisePrecision,
        fromFloatPrecision,
        isSource
    }
})
