import UnitConverter from '../../../UnitConverter'
import { mul, div } from '../../../../numbers'

import { Mass } from '../../domains'
import { Canada } from '../../authorities'
import { GrammeConverter } from '../../si/metric/baseConverters'
import { ChickenEggs } from '../../systems'
import { Jumbo, VeryLarge, Large, Medium, Small, Peewee } from '../../units'

const jumboScalar = 70
export const JumboConverter =
    new UnitConverter(
        Mass,
        Canada,
        ChickenEggs,
        Jumbo,
        GrammeConverter,
        value => mul(value, jumboScalar),
        value => div(value, jumboScalar))

const veryLargeScalar = 66
export const VeryLargeConverter =
    new UnitConverter(
        Mass,
        Canada,
        ChickenEggs,
        VeryLarge,
        GrammeConverter,
        value => mul(value, veryLargeScalar),
        value => div(value, veryLargeScalar))

const largeScalar = 59
export const LargeConverter =
    new UnitConverter(
        Mass,
        Canada,
        ChickenEggs,
        Large,
        GrammeConverter,
        value => mul(value, largeScalar),
        value => div(value, largeScalar))

const mediumScalar = 52
export const MediumConverter =
    new UnitConverter(
        Mass,
        Canada,
        ChickenEggs,
        Medium,
        GrammeConverter,
        value => mul(value, mediumScalar),
        value => div(value, mediumScalar))

const smallScalar = 45
export const SmallConverter =
    new UnitConverter(
        Mass,
        Canada,
        ChickenEggs,
        Small,
        GrammeConverter,
        value => mul(value, smallScalar),
        value => div(value, smallScalar))

const peeweeScalar = 41
export const PeeweeConverter =
    new UnitConverter(
        Mass,
        Canada,
        ChickenEggs,
        Peewee,
        GrammeConverter,
        value => mul(value, peeweeScalar),
        value => value.div(peeweeScalar))

export function collectUnitConverters() {
    return [
        JumboConverter,
        VeryLargeConverter,
        LargeConverter,
        MediumConverter,
        SmallConverter,
        PeeweeConverter
    ]
}