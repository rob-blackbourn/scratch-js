import UnitConverter from '../../../UnitConverter'
import { mul, div } from '../../../../numbers'

import { Mass } from '../../domains'
import { EuropeanUnion } from '../../authorities'
import { GrammeConverter } from '../../si/metric/baseConverters'
import { ChickenEggs } from '../../systems'
import { VeryLarge, Large, Medium, Small } from '../../units'

const veryLargeScalar = 73;
export const VeryLargeConverter =
    new UnitConverter(
        Mass,
        EuropeanUnion,
        ChickenEggs,
        VeryLarge,
        GrammeConverter,
        value => mul(value, veryLargeScalar),
        value => div(value, veryLargeScalar))

const largeScalar = 68;
export const LargeConverter =
    new UnitConverter(
        Mass,
        EuropeanUnion,
        ChickenEggs,
        Large,
        GrammeConverter,
        value => mul(value, largeScalar),
        value => value.div(largeScalar))

const mediumScalar = 58;
export const MediumConverter =
    new UnitConverter(
        Mass,
        EuropeanUnion,
        ChickenEggs,
        Medium,
        GrammeConverter,
        value => mul(value, mediumScalar),
        value => div(value, mediumScalar))

const smallScalar = 53;
export const SmallConverter =
    new UnitConverter(
        Mass,
        EuropeanUnion,
        ChickenEggs,
        Small,
        GrammeConverter,
        value => mul(value, smallScalar),
        value => div(value, smallScalar))

export function collectUnitConverters() {
    return [
        VeryLargeConverter,
        LargeConverter,
        MediumConverter,
        SmallConverter
    ]
}