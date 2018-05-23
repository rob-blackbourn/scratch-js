import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { LitreConverter } from '../../si/metric/baseConverters'
import { Volume } from '../../domains'
import { Canada } from '../../authorities'
import { Utensils } from '../../systems'
import { Teaspoon, Dessertspoon, Tablespoon, Cup } from '../../units'

const teaspoonScalar = new Fraction(5, 1000)
export const TeaspoonConverter =
    new UnitConverter(
        Volume,
        Canada,
        Utensils,
        Teaspoon,
        LitreConverter,
        value => mul(value, teaspoonScalar),
        value => div(value, teaspoonScalar))

const dessertspoonScalar = new Fraction(10, 1000)
export const DessertspoonConverter =
    new UnitConverter(
        Volume,
        Canada,
        Utensils,
        Dessertspoon,
        LitreConverter,
        value => mul(value, dessertspoonScalar),
        value => div(value, dessertspoonScalar))

const tablespoonScalar = new Fraction(15, 1000)
export const TablespoonConverter =
    new UnitConverter(
        Volume,
        Canada,
        Utensils,
        Tablespoon,
        LitreConverter,
        value => mul(value, tablespoonScalar),
        value => div(value, tablespoonScalar))

const cupScalar = new Fraction(250, 1000)
export const CupConverter =
    new UnitConverter(
        Volume,
        Canada,
        Utensils,
        Cup,
        LitreConverter,
        value => mul(value, cupScalar),
        value => div(value, cupScalar))

export function collectUnitConverters() {
    return [
        TeaspoonConverter,
        DessertspoonConverter,
        TablespoonConverter,
        CupConverter
    ]
}