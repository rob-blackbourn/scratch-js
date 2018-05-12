import { combineReducers } from 'redux'
import createRepository from '../converters'
import createUnitExplorer from './UnitExplorer'

const repository = createRepository()

export default combineReducers({
  fromUnitExplorer: createUnitExplorer(repository),
  toUnitExplorer: createUnitExplorer(repository)
})