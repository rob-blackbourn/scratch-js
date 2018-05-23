import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { Mass} from '../../domains'
import { UnitedStates } from '../../authorities'
import { Customary } from '../../systems'
import { GrammeConverter } from '../../si/metric/baseConverters'
import { Grain, Dram, Ounce, Pound, Stone, Quarter, Hundredweight, Ton } from '../../units'

const grammeScalar = new Fraction(45359237, 100000)
export const PoundConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Customary,
        Pound,
        GrammeConverter,
        value => mul(value, grammeScalar),
        value => div(value, grammeScalar))

const grainScalar = 7000
export const GrainConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Customary,
        Grain,
        PoundConverter,
        value => div(value, grainScalar),
        value => mul(value, grainScalar))

const dramScalar = 256
export const DramConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Customary,
        Dram,
        PoundConverter,
        value => div(value, dramScalar),
        value => mul(value, dramScalar))

const ounceScalar = 16
export const OunceConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Customary,
        Ounce,
        PoundConverter,
        value => div(value, ounceScalar),
        value => mul(value, ounceScalar))

const stoneScalar = 16
export const StoneConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Customary,
        Stone,
        PoundConverter,
        value => mul(value, stoneScalar),
        value => div(value, stoneScalar))

const quarterScalar = 28
export const QuarterConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Customary,
        Quarter,
        PoundConverter,
        value => mul(value, quarterScalar),
        value => div(value, quarterScalar))

const hundredweightScalar = 112
export const HundredweightConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Customary,
        Hundredweight,
        PoundConverter,
        value => mul(value, hundredweightScalar),
        value => div(value, hundredweightScalar))

const tonScalar = 2240;
export const TonConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        Customary,
        Ton,
        PoundConverter,
        value => mul(value, tonScalar),
        value => value.div(tonScalar))

export function collectUnitConverters() {
    return [
        GrainConverter,
        DramConverter,
        OunceConverter,
        PoundConverter,
        StoneConverter,
        QuarterConverter,
        HundredweightConverter,
        TonConverter
    ]
}