import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { LitreConverter } from '../../si/metric/baseConverters'
import { FluidOunceConverter } from '../../uk/imperial/volume'
import { Volume } from '../../domains'
import { Australia } from '../../authorities'
import { Utensils } from '../../systems'
import { Teaspoon, Dessertspoon, Tablespoon, Cup } from '../../units'

const teaspoonScalar = new Fraction(5, 1000)
export const TeaspoonConverter =
    new UnitConverter(
        Volume,
        Australia,
        Utensils,
        Teaspoon,
        LitreConverter,
        value => mul(value, teaspoonScalar),
        value => div(value, teaspoonScalar))

const dessertspoonScalar = new Fraction(10, 1000)
export const DessertspoonConverter =
    new UnitConverter(
        Volume,
        Australia,
        Utensils,
        Dessertspoon,
        LitreConverter,
        value => mul(value, dessertspoonScalar),
        value => div(value, dessertspoonScalar))

const tablespoonScalar = new Fraction(20, 1000)
export const TablespoonConverter =
    new UnitConverter(
        Volume,
        Australia,
        Utensils,
        Tablespoon,
        LitreConverter,
        value => mul(value, tablespoonScalar),
        value => div(value, tablespoonScalar))

const cupsPerFluidOunce = new Fraction(1, 8);
export const CupConverter =
    new UnitConverter(
        Volume,
        Australia,
        Utensils,
        Cup,
        FluidOunceConverter,
        value => div(value, cupsPerFluidOunce),
        value => mul(value, cupsPerFluidOunce))

export function collectUnitConverters() {
    return [
        TeaspoonConverter,
        DessertspoonConverter,
        TablespoonConverter,
        CupConverter
    ]
}
