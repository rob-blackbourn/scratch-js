import UnitConverter from '../../../UnitConverter'
import { Fraction, add, sub, mul, div } from '../../../../numbers'
import { Temperature } from '../../domains'
import { UnitedStates } from '../../authorities'
import { Customary } from '../../systems'
import { CelsiusConverter } from '../../si/metric/celsius'
import { Fahrenheit } from '../../units'

const fahrenheitOffset = 32;
const fahrenheitScalar = new Fraction(9, 5);
export const FahrenheitConverter =
    new UnitConverter(
        Temperature,
        UnitedStates,
        Customary,
        Fahrenheit,
        CelsiusConverter,
        farenheit => div(sub(farenheit, fahrenheitOffset), fahrenheitScalar),
        celsius => add(mul(celsius, fahrenheitScalar), fahrenheitOffset))

export function collectUnitCOnverters() {
    return [
        FahrenheitConverter
    ]
};