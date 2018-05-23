import UnitConverter from '../../../UnitConverter'
import { mul, div } from '../../../../numbers'

import { Mass } from '../../domains'
import { Australia } from '../../authorities'
import { KingSize, Jumbo, VeryLarge, Large, Medium } from '../../units'
import { ChickenEggs } from '../../systems'
import { GrammeConverter } from '../../si/metric/baseConverters'

const kingSizeScalar = 74
export const KingSizeConverter =
    new UnitConverter(
        Mass,
        Australia,
        ChickenEggs,
        KingSize,
        GrammeConverter,
        value => mul(value, kingSizeScalar),
        value => div(value, kingSizeScalar))

const jumboScalar = 70
export const JumboConverter =
    new UnitConverter(
        Mass,
        Australia,
        ChickenEggs,
        Jumbo,
        GrammeConverter,
        value => mul(value, jumboScalar),
        value => div(value, jumboScalar))

const veryLargeScalar = 68.35;
export const VeryLargeConverter =
    new UnitConverter(
        Mass,
        Australia,
        ChickenEggs,
        VeryLarge,
        GrammeConverter,
        value => mul(value, veryLargeScalar),
        value => div(value, veryLargeScalar))

const largeScalar = 62.45;
export const LargeConverter =
    new UnitConverter(
        Mass,
        Australia,
        ChickenEggs,
        Large,
        GrammeConverter,
        value => mul(value, largeScalar),
        value => div(value, largeScalar))

const mediumScalar = 45.95
export const MediumConverter =
    new UnitConverter(
        Mass,
        Australia,
        ChickenEggs,
        Medium,
        GrammeConverter,
        value => mul(value, mediumScalar),
        value => div(value, mediumScalar))

export function collectUnitConverters() {
    return [
        KingSizeConverter,
        JumboConverter,
        VeryLargeConverter,
        LargeConverter,
        MediumConverter
    ]
}
