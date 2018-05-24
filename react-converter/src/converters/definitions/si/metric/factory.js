import UnitConverter from '../../../UnitConverter'
import { mul, div } from '../../../../numbers'

import { MeterConverter, GrammeConverter, LitreConverter, SecondConverter, KelvinConverter } from './baseConverters'

import { Unit, UnitDetail } from '../../../Unit'
import metricLengthUnitDetails from '../../_details/unitDetails/metricLength.json'
import metricMassUnitDetails from '../../_details/unitDetails/metricMass.json'
import metricVolumeUnitDetails from '../../_details/unitDetails/metricVolume.json'
import metricTimeUnitDetails from '../../_details/unitDetails/metricTime.json'
import metricTemperatureUnitDetails from '../../_details/unitDetails/metricTemperature.json'
import * as usages from '../../usages'

function createPrefix(name, isMultiplier, scalar, order, usages) {
    return {
        name: name,
        isMultiplier: isMultiplier,
        scalar: scalar,
        order: order,
        usages: usages
    }
}

function createFromPrefix(targetConverter, prefix, unitDetails) {
    const unitKey = prefix.name + targetConverter.unit.key
    const unit = new Unit(unitKey, prefix.order, prefix.usages, UnitDetail.fromJSON(unitDetails[unitKey]))
    const toConverter = prefix.isMultiplier ? value => mul(value, prefix.scalar) : value => div(value, prefix.scalar)
    const fromConverter = prefix.isMultiplier ? value => div(value, prefix.scalar) : value => mul(value, prefix.scalar)

    const converter =
        new UnitConverter(
            targetConverter.domain,
            targetConverter.authority,
            targetConverter.system,
            unit,
            targetConverter,
            toConverter,
            fromConverter)

    return converter
}

function createSiConverters(targetConverter, unitDetails) {

    const prefixes = [
        createPrefix('yocto', false, Math.pow(10, 24), -10, [usages.Science]),
        createPrefix('zepto', false, Math.pow(10, 21), -9, [usages.Science]),
        createPrefix('atto', false, Math.pow(10, 18), -8, [usages.Science]),
        createPrefix('femto', false, Math.pow(10, 15), -7, [usages.Science]),
        createPrefix('pico', false, Math.pow(10, 12), -6, [usages.Science]),
        createPrefix('nano', false, Math.pow(10, 9), -5, [usages.Science]),
        createPrefix('micro', false, Math.pow(10, 6), -4, [usages.Science]),
        createPrefix('milli', false, Math.pow(10, 3), -3, [usages.Science, usages.Cookery]),
        createPrefix('centi', false, Math.pow(10, 2), -2, [usages.Science, usages.Cookery]),
        createPrefix('deci', false, Math.pow(10, 1), -1, [usages.Science]),

        createPrefix('deca', true, Math.pow(10, 1), 1, [usages.Science]),
        createPrefix('hecto', true, Math.pow(10, 2), 2, [usages.Science]),
        createPrefix('kilo', true, Math.pow(10, 3), 3, [usages.Science, usages.Cookery]),
        createPrefix('mega', true, Math.pow(10, 6), 4, [usages.Science]),
        createPrefix('giga', true, Math.pow(10, 9), 5, [usages.Science]),
        createPrefix('tera', true, Math.pow(10, 12), 6, [usages.Science]),
        createPrefix('peta', true, Math.pow(10, 15), 7, [usages.Science]),
        createPrefix('exa', true, Math.pow(10, 18), 8, [usages.Science]),
        createPrefix('zetta', true, Math.pow(10, 21), 9, [usages.Science]),
        createPrefix('yotta', true, Math.pow(10, 24), 10, [usages.Science])
    ]

    const converters = prefixes.map(prefix => createFromPrefix(targetConverter, prefix, unitDetails))

    return converters
}

export function collectUnitConverters() {
    return [
        MeterConverter, ...createSiConverters(MeterConverter, metricLengthUnitDetails),
        GrammeConverter, ...createSiConverters(GrammeConverter, metricMassUnitDetails),
        SecondConverter, ...createSiConverters(SecondConverter, metricTimeUnitDetails),
        LitreConverter, ...createSiConverters(LitreConverter, metricVolumeUnitDetails),
        KelvinConverter, ...createSiConverters(KelvinConverter, metricTemperatureUnitDetails)
    ]
}
