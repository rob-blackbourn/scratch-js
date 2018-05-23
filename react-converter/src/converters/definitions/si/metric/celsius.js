import UnitConverter from '../../../UnitConverter'
import { Fraction, add, sub } from '../../../../numbers'
import { Temperature } from '../../domains'
import { SystemInternational } from '../../authorities'
import { Metric } from '../../systems'
import { Celsius } from '../../units'
import { KelvinConverter } from './baseConverters'

const celsiusOffset = new Fraction(27315, 100)
export const CelsiusConverter =
    new UnitConverter(
        Temperature,
        SystemInternational,
        Metric,
        Celsius,
        KelvinConverter,
        celsius => add(celsius, celsiusOffset),
        kelvin => sub(kelvin, celsiusOffset))
