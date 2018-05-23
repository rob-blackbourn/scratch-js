import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { Mass } from '../../domains'
import { UnitedStates } from '../../authorities'
import { OunceConverter } from '../../us/customary/mass'
import { ChickenEggs } from '../../systems'
import { Jumbo, VeryLarge, Large, Medium, Small, Peewee } from '../../units'

const jumboScalar = new Fraction(5, 2)
export const JumboConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        ChickenEggs,
        Jumbo,
        OunceConverter,
        value => mul(value, jumboScalar),
        value => div(value, jumboScalar))

const veryLargeScalar = new Fraction(9, 4)
export const VeryLargeConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        ChickenEggs,
        VeryLarge,
        OunceConverter,
        value => mul(value, veryLargeScalar),
        value => div(value, veryLargeScalar))

const largeScalar = 2
export const LargeConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        ChickenEggs,
        Large,
        OunceConverter,
        value => mul(value, largeScalar),
        value => div(value, largeScalar))

const mediumScalar = new Fraction(7, 4)
export const MediumConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        ChickenEggs,
        Medium,
        OunceConverter,
        value => mul(value, mediumScalar),
        value => div(value, mediumScalar))

const smallScalar = new Fraction(3, 2)
export const SmallConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        ChickenEggs,
        Small,
        OunceConverter,
        value => mul(value, smallScalar),
        value => div(value, smallScalar))

const peeweeScalar = new Fraction(5, 4);
export const PeeweeConverter =
    new UnitConverter(
        Mass,
        UnitedStates,
        ChickenEggs,
        Peewee,
        OunceConverter,
        value => mul(value, peeweeScalar),
        value => div(value, peeweeScalar))

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