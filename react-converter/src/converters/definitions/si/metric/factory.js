import UnitConverter from '../../../UnitConverter'
import { mul, div } from '../../../../numbers'

import { MeterConverter, GrammeConverter, LitreConverter, SecondConverter, KelvinConverter } from './baseConverters'

import { Unit, UnitDetails } from '../../../Unit'
import metricLengthUnitDetails from '../../_details/unitDetails/metricLength.json'
import metricMassUnitDetails from '../../_details/unitDetails/metricMass.json'
import metricVolumeUnitDetails from '../../_details/unitDetails/metricVolume.json'
import metricTimeUnitDetails from '../../_details/unitDetails/metricTime.json'
import metricTemperatureUnitDetails from '../../_details/unitDetails/metricTemperature.json'

function createPrefix(name, isMultiplier, scalar) {
    return { name: name, isMultiplier: isMultiplier, scalar: scalar }
}

function createFromPrefix(targetConverter, prefix, unitDetails) {
    const unitKey = prefix.name + targetConverter.unit.key
    const unit = new Unit(unitKey, UnitDetails.fromJSON(unitDetails[unitKey]))
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
        createPrefix('yocto', false, Math.pow(10, 24)),
        createPrefix('zepto', false, Math.pow(10, 21)),
        createPrefix('atto', false, Math.pow(10, 18)),
        createPrefix('femto', false, Math.pow(10, 15)),
        createPrefix('pico', false, Math.pow(10, 12)),
        createPrefix('nano', false, Math.pow(10, 9)),
        createPrefix('micro', false, Math.pow(10, 6)),
        createPrefix('milli', false, Math.pow(10, 3)),
        createPrefix('centi', false, Math.pow(10, 2)),
        createPrefix('deci', false, Math.pow(10, 1)),

        createPrefix('deca', true, Math.pow(10, 1)),
        createPrefix('hecto', true, Math.pow(10, 2)),
        createPrefix('kilo', true, Math.pow(10, 3)),
        createPrefix('mega', true, Math.pow(10, 6)),
        createPrefix('giga', true, Math.pow(10, 9)),
        createPrefix('tera', true, Math.pow(10, 12)),
        createPrefix('peta', true, Math.pow(10, 15)),
        createPrefix('exa', true, Math.pow(10, 18)),
        createPrefix('zetta', true, Math.pow(10, 21)),
        createPrefix('yotta', true, Math.pow(10, 24))
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
