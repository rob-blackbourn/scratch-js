import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import * as domains from '../domains';
import {UnitedKingdom, SystemInternational} from '../authorities';
import {Metric, Meter} from '../metric/constants';
import {Imperial, ImperialFeet} from './constants';

export default (repository) => {

    const meterConverter = repository.find(new UnitIdentifier(domains.Length, SystemInternational, Metric, Meter));
    const meterScalar = new Fraction(3048, 10000);
    const feetConverter = repository.add(
        new UnitConverter(
            domains.Length,
            UnitedKingdom,
            Imperial,
            ImperialFeet,
            "ft",
            meterConverter,
            feet => mul(feet, meterScalar),
            meter => div(meter, meterScalar)));

    const thouScalar = 12000;
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedKingdom,
            Imperial,
            "thou",
            "th",
            feetConverter,
            feet => div(feet, thouScalar),
            thou => mul(thou, thouScalar)));

    const inchScalar = 12;
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedKingdom,
            Imperial,
            "inch",
            "in",
            feetConverter,
            feet => div(feet, inchScalar),
            inch => mul(inch, inchScalar)));

    const yardScalar = 3;
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedKingdom,
            Imperial,
            "yard",
            "yd",
            feetConverter,
            feet => mul(feet, yardScalar),
            yard => div(yard, yardScalar)));

    const chainScalar = 66;
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedKingdom,
            Imperial,
            "chain",
            "ch",
            feetConverter,
            feet => mul(feet, chainScalar),
            chain => div(chain, chainScalar)));

    const furlongScalar = 660;
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedKingdom,
            Imperial,
            "furlong",
            "fur",
            feetConverter,
            feet => mul(feet, furlongScalar),
            furlong => div(furlong, furlongScalar)));

    const mileScalar = 5280;
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedKingdom,
            Imperial,
            "mile",
            "mi",
            feetConverter,
            feet => mul(feet, mileScalar),
            mile => div(mile, mileScalar)));

    const leagueScalar = 15840;
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedKingdom,
            Imperial,
            "league",
            "lea",
            feetConverter,
            feet => mul(feet, leagueScalar),
            league => div(league, leagueScalar)));
}