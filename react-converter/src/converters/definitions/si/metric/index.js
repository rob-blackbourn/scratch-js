import { mul, div } from '../../../../numbers/Arithmetic'
import DomainConverter from '../../../DomainConverter'
import { MeterConverter, GrammeConverter, LitreConverter, SecondConverter, KelvinConverter } from './baseConverters'
import { collectUnitConverters as collectMetricUnitConverters } from './factory'
import { CelsiusConverter } from './celsius'

export function collectUnitConverters() {
    return [...collectMetricUnitConverters(), CelsiusConverter]
}

export const MassVolumeConverter = new DomainConverter(GrammeConverter, LitreConverter,(value, scalar) => mul(value, scalar),(value, scalar) => div(value, scalar))

export function collectDomainConverters() {
    return [MassVolumeConverter]
}

export { MeterConverter, GrammeConverter, LitreConverter, SecondConverter, KelvinConverter, CelsiusConverter }
