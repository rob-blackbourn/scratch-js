import UnitConverter from '../../../UnitConverter'
import * as domains from '../../domains'
import { SystemInternational } from '../../authorities';
import { Metric } from '../../systems';
import { Meter, Gramme, Litre, Second, Kelvin } from '../../units'

export const MeterConverter = new UnitConverter(domains.Length, SystemInternational, Metric, Meter, null, null, null)
export const GrammeConverter = new UnitConverter(domains.Mass, SystemInternational, Metric, Gramme, null, null, null)
export const LitreConverter = new UnitConverter(domains.Volume, SystemInternational, Metric, Litre, null, null, null)
export const SecondConverter = new UnitConverter(domains.Time, SystemInternational,  Metric, Second, null, null, null)
export const KelvinConverter = new UnitConverter(domains.Temperature, SystemInternational, Metric, Kelvin, null, null, null)