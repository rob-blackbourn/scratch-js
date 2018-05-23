import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { LitreConverter } from '../../si/metric/baseConverters'
import { Volume } from '../../domains'
import { Japan } from '../../authorities'
import { Utensils } from '../../systems'
import { Go, Cup } from '../../units'

const goScalar = new Fraction(2401, 133100)
export const GoConverter =
    new UnitConverter(
        Volume,
        Japan,
        Utensils,
        Go,
        LitreConverter,
        value => mul(value, goScalar),
        value => div(value, goScalar))

const cupScalar = new Fraction(200, 1000)
export const CupConverter =
    new UnitConverter(
        Volume,
        Japan,
        Utensils,
        Cup,
        LitreConverter,
        value => mul(value, cupScalar),
        value => div(value, cupScalar))

export function collectUnitConverters() {
    return [
        GoConverter,
        CupConverter
    ]
}