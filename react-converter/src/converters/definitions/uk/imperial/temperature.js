import UnitConverter from '../../../UnitConverter'
import { Fraction, add, sub, mul, div, lt } from '../../../../numbers'
import { Temperature } from '../../domains'
import { UnitedKingdom } from '../../authorities'
import { Imperial } from '../../systems'
import { GasMark } from '../../units'
import { CelsiusConverter } from '../../si/metric/celsius'

const gasMarkScalar = 14;
const gasMarkOffset = 121;
export const GasMarkConverter =
    new UnitConverter(
        Temperature,
        UnitedKingdom,
        Imperial,
        GasMark,
        CelsiusConverter,
        gasMark => {
            if (lt(gasMark, new Fraction(3, 8))) {
                return 107
            } else if (lt(gasMark, new Fraction(3, 4))) {
                return 121
            } else {
                gasMark = Math.round(gasMark.valueOf())
                return add(mul(gasMark, gasMarkScalar), gasMarkOffset)
            }
        },
        celsius => {
            if (lt(celsius, 114)) {
                return new Fraction(1, 4)
            } else if (lt(celsius, 128)) {
                return new Fraction(1, 2)
            } else {
                var gasMark = div(sub(celsius, gasMarkOffset), gasMarkScalar)
                return Math.round(gasMark)
            }
        })

export function collectUnitConverters() {
    return [ GasMarkConverter ]
}