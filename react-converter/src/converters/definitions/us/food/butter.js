import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { Mass } from '../../domains'
import { UnitedStates } from '../../authorities'
import { PoundConverter } from '../customary/mass'
import { Butter } from '../../systems'
import { Stick } from '../../units'

const stickScalar = new Fraction(1, 4)
export const StickConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Butter,
        Stick,
        PoundConverter,
        value => mul(value, stickScalar),
        value => div(value, stickScalar))

export function collectUnitConverters() {
    return [
        StickConverter
    ]
}