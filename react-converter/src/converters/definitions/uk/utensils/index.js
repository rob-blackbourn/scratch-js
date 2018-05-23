import UnitConverter from '../../../UnitConverter'
import {Fraction, mul, div} from '../../../../numbers'

import { Volume } from '../../domains'
import { UnitedKingdom } from '../../authorities'
import { Utensils } from '../../systems'
import { Teaspoon, Dessertspoon, Tablespoon, Cup } from '../../units'
import { LitreConverter } from '../../si/metric'
import { PintConverter } from '../imperial/volume'

const teaspoonScalar = new Fraction(5, 1000)
export const TeaspoonConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Utensils,
        Teaspoon,
        LitreConverter,
        value => mul(value, teaspoonScalar),
        value => div(value, teaspoonScalar))

const dessertspoonScalar = new Fraction(10, 1000)
export const DessertspoonConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Utensils,
        Dessertspoon,
        LitreConverter,
        value => mul(value, dessertspoonScalar),
        value => div(value, dessertspoonScalar))

const tablespoonScalar = new Fraction(15, 1000);
export const TablespoonConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Utensils,
        Tablespoon,
        LitreConverter,
        value => mul(value, tablespoonScalar),
        value => div(value, tablespoonScalar))

const cupScalar = 2;
export const CupConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Utensils,
        Cup,
        PintConverter,
        value => div(value, cupScalar),
        value => mul(value, cupScalar))

export function collectUnitConverters() {
    return [
        TeaspoonConverter,
        DessertspoonConverter,
        TablespoonConverter,
        CupConverter
    ]
}