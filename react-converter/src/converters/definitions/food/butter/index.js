import createAmericanUnits from './usa'
import { Butter, Stick } from './constants'

export default repository => {
    createAmericanUnits(repository)
}

export { Butter, Stick }