import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { Volume } from '../../domains'
import { UnitedStates } from '../../authorities'
import { Utensils } from '../../systems'
import { FluidOunceConverter } from '../../us/customary/volume'
import { Drop, Teaspoon, Tablespoon, Cup } from '../../units'

const dropsPerFluidOunce = 576
export const DropConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Utensils,
        Drop,
        FluidOunceConverter,
        value => mul(value, dropsPerFluidOunce),
        value => div(value, dropsPerFluidOunce))

const teaspoonsPerFluidOunce = 6
export const TeaspoonConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Utensils,
        Teaspoon,
        FluidOunceConverter,
        value => mul(value, teaspoonsPerFluidOunce),
        value => div(value, teaspoonsPerFluidOunce))

const fluidOuncesPerTablespoon = new Fraction(1, 2)
export const TablespoonConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Utensils,
        Tablespoon,
        FluidOunceConverter,
        value => mul(value, fluidOuncesPerTablespoon),
        value => div(value, fluidOuncesPerTablespoon))

const cupsPerFluidOunce = new Fraction(1, 8);
export const CupConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Utensils,
        Cup,
        FluidOunceConverter,
        value => div(value, cupsPerFluidOunce),
        value => mul(value, cupsPerFluidOunce))

export function collectUnitConverters() {
    return [
        DropConverter,
        TeaspoonConverter,
        TablespoonConverter,
        CupConverter
    ]
}