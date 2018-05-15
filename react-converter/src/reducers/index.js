import { combineReducers } from 'redux'
import createRepository from '../converters'
import createUnitExplorer from './UnitExplorer'

const repository = createRepository()

export default combineReducers({
  unitExplorer: createUnitExplorer(repository)
})