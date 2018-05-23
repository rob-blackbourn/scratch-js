import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { LitreConverter } from '../../si/metric/baseConverters'
import { Volume } from '../../domains'
import { FederalDrugAdministration } from '../../authorities'
import { Utensils } from '../../systems'
import { Teaspoon, Tablespoon, Cup } from '../../units'

const teaspoonScalar = new Fraction(5, 1000)
export const TeaspoonConverter =
    new UnitConverter(
        Volume,
        FederalDrugAdministration,
        Utensils,
        Teaspoon,
        LitreConverter,
        value => mul(value, teaspoonScalar),
        value => div(value, teaspoonScalar))

const tablespoonScalar = new Fraction(15, 1000)
export const TablespoonConverter =
    new UnitConverter(
        Volume,
        FederalDrugAdministration,
        Utensils,
        Tablespoon,
        LitreConverter,
        value => mul(value, tablespoonScalar),
        value => div(value, tablespoonScalar))

const cupScalar = new Fraction(240, 1000);
export const CupConverter =
    new UnitConverter(
        Volume,
        FederalDrugAdministration,
        Utensils,
        Cup,
        LitreConverter,
        value => mul(value, cupScalar),
        value => div(value, cupScalar))

export function collectUnitConverters() {
    return [
        TeaspoonConverter,
        TablespoonConverter,
        CupConverter
    ]
}