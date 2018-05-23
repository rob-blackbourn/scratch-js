import UnitConverter from '../../../UnitConverter'
import { mul, div } from '../../../../numbers'

import { Mass } from '../../domains'
import { NewZealand } from '../../authorities'
import { GrammeConverter } from '../../si/metric/baseConverters'
import { ChickenEggs } from '../../systems'
import { SizeEightEgg, SizeSevenEgg, SizeSixEgg, SizeFiveEgg, SizeFourEgg } from '../../units'

const jumboScalar = 68
export const JumboConverter =
    new UnitConverter(
        Mass,
        NewZealand,
        ChickenEggs,
        SizeEightEgg,
        GrammeConverter,
        value => mul(value, jumboScalar),
        value => div(value, jumboScalar))

const largeScalar = 62;
export const LargeConverter =
    new UnitConverter(
        Mass,
        NewZealand,
        ChickenEggs,
        SizeSevenEgg,
        GrammeConverter,
        value => mul(value, largeScalar),
        value => div(value, largeScalar))

const standardScalar = 53;
export const StandardConverter =
    new UnitConverter(
        Mass,
        NewZealand,
        ChickenEggs,
        SizeSixEgg,
        GrammeConverter,
        value => mul(value, standardScalar),
        value => div(value, standardScalar))

const mediumScalar = 44;
export const MediumConverter =
    new UnitConverter(
        Mass,
        NewZealand,
        ChickenEggs,
        SizeFiveEgg,
        GrammeConverter,
        value => mul(value, mediumScalar),
        value => div(value, mediumScalar))

const pulletScalar = 35;
export const PulletConverter =
    new UnitConverter(
        Mass,
        NewZealand,
        ChickenEggs,
        SizeFourEgg,
        GrammeConverter,
        value => mul(value, pulletScalar),
        value => div(value, pulletScalar))

export function collectUnitConverters() {
    return [
        JumboConverter,
        LargeConverter,
        StandardConverter,
        MediumConverter,
        PulletConverter
    ]
}