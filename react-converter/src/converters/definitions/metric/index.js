import UnitConverter from '../../UnitConverter';
import DomainConverter from '../../DomainConverter';
import {mul, div} from '../../../numbers';

import * as domains from '../domains';
import {SystemInternational} from '../authorities';
import {Metric,  Meter, Gramme, Litre, Second, Kelvin} from './constants';

function createSiConverters(targetConverter) {

    const createPrefix = function (symbol, name, isMultiplier, scalar) {
        return { symbol: symbol, name: name, isMultiplier: isMultiplier, scalar: scalar };
    };

    const prefixes = [
        createPrefix('y', 'yocto', false, Math.pow(10, 24)),
        createPrefix('z', 'zepto', false, Math.pow(10, 21)),
        createPrefix('a', 'atto', false, Math.pow(10, 18)),
        createPrefix('f', 'femto', false, Math.pow(10, 15)),
        createPrefix('p', 'pico', false, Math.pow(10, 12)),
        createPrefix('n', 'nano', false, Math.pow(10, 9)),
        createPrefix('\u00b5', 'micro', false, Math.pow(10, 6)),
        createPrefix('m', 'milli', false, Math.pow(10, 3)),
        createPrefix('c', 'centi', false, Math.pow(10, 2)),
        createPrefix('d', 'deci', false, Math.pow(10, 1)),

        createPrefix('da', 'deca', true, Math.pow(10, 1)),
        createPrefix('h', 'hecto', true, Math.pow(10, 2)),
        createPrefix('k', 'kilo', true, Math.pow(10, 3)),
        createPrefix('M', 'mega', true, Math.pow(10, 6)),
        createPrefix('G', 'giga', true, Math.pow(10, 9)),
        createPrefix('T', 'tera', true, Math.pow(10, 12)),
        createPrefix('P', 'peta', true, Math.pow(10, 15)),
        createPrefix('E', 'exa', true, Math.pow(10, 18)),
        createPrefix('Z', 'zetta', true, Math.pow(10, 21)),
        createPrefix('Y', 'yotta', true, Math.pow(10, 24))
    ];

    return prefixes.map(prefix =>
            new UnitConverter(
                targetConverter.domain,
                targetConverter.authority,
                targetConverter.system,
                prefix.name + targetConverter.name,
                prefix.symbol + targetConverter.symbol,
                targetConverter,
                prefix.isMultiplier ? value => mul(value, prefix.scalar) : value => div(value, prefix.scalar),
                prefix.isMultiplier ? value => div(value, prefix.scalar) : value => mul(value, prefix.scalar))
    );
}

export const MeterConverter = new UnitConverter(domains.Length, SystemInternational, Metric, Meter, "m", null, null, null);
export const GrammeConverter = new UnitConverter(domains.Mass, SystemInternational, Metric, Gramme, "g", null, null, null);
export const SecondConverter = new UnitConverter(domains.Time, SystemInternational,  Metric, Second, "s", null, null, null);
export const LitreConverter = new UnitConverter(domains.Volume, SystemInternational, Metric, Litre, "l", null, null, null);
export const KelvinConverter = new UnitConverter(domains.Temperature, SystemInternational, Metric, Kelvin, "K", null, null, null);
export const MassVolumeConverter = new DomainConverter(GrammeConverter, LitreConverter,(value, scalar) => mul(value, scalar),(value, scalar) => div(value, scalar));

export function createUnitConverters() {
    return [
        MeterConverter, ...createSiConverters(MeterConverter),
        GrammeConverter, ...createSiConverters(GrammeConverter),
        SecondConverter, ...createSiConverters(SecondConverter),
        LitreConverter, ...createSiConverters(LitreConverter),
        KelvinConverter, ...createSiConverters(KelvinConverter)
    ]

}

export function createDomainConverters() {
    return [MassVolumeConverter];
}

export default repository => {

    const unitConverters = createUnitConverters();
    for (let converter of unitConverters) {
        repository.add(converter);
    }

    const domainConverters = createDomainConverters();
    for (let converter of domainConverters) {
        repository.domainConverters.add(converter);
    }

};

export {Metric, Meter, Gramme, Litre, Second, Kelvin};
