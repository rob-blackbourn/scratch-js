import * as actionTypes from './actionTypes'

export const setDomain = (domain, isSource) => {
    return ({type: actionTypes.SET_DOMAIN, content: { domain, isSource }})
}
export const setSystem = (system, isSource) => ({type: actionTypes.SET_SYSTEM, content: { system, isSource }})
export const setAuthority = (authority, isSource) => ({type: actionTypes.SET_AUTHORITY, content: { authority, isSource }})
export const setName = (name, isSource) => ({type: actionTypes.SET_NAME, content: { name, isSource }})
export const setValue = (value, isSource) => ({type: actionTypes.SET_VALUE, content: { value, isSource }})
