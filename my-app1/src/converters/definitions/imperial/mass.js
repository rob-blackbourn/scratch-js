import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import * as domains from '../domains';
import {UnitedKingdom, SystemInternational} from '../authorities';
import {Metric, Gramme} from '../metric/constants';
import {Imperial, ImperialPound} from './constants';

export default (repository, system, authority) => {

    const grammeConverter = repository.find(new UnitIdentifier(domains.Mass, Metric, SystemInternational, Gramme));
    const grammeScalar = new Fraction(45359237, 100000);
    const poundConverter = repository.add(
        new UnitConverter(
            domains.Mass,
            Imperial,
            UnitedKingdom,
            ImperialPound,
            "lb",
            grammeConverter,
            pound => mul(pound, grammeScalar),
            gramme => div(gramme, grammeScalar)));

    const grainScalar = 7000;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Imperial,
            UnitedKingdom,
            "grain",
            "gr",
            poundConverter,
            pound => div(pound, grainScalar),
            grain => mul(grain, grainScalar)));

    const drachmScalar = 256;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Imperial,
            UnitedKingdom,
            "drachm",
            "dr",
            poundConverter,
            pound => div(pound, drachmScalar),
            drachm => mul(drachm, drachmScalar)));

    const ounceScalar = 16;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Imperial,
            UnitedKingdom,
            "ounce",
            "oz",
            poundConverter,
            pound => div(pound, ounceScalar),
            ounce => mul(ounce, ounceScalar)));

    const stoneScalar = 14;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Imperial,
            UnitedKingdom,
            "stone",
            "st",
            poundConverter,
            pound => mul(pound, stoneScalar),
            stone => div(stone, stoneScalar)));

    const quarterScalar = 28;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Imperial,
            UnitedKingdom,
            "quarter",
            "qtr",
            poundConverter,
            pound => mul(pound, quarterScalar),
            quarter => div(quarter, quarterScalar)));

    const hundredweightScalar = 112;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Imperial,
            UnitedKingdom,
            "hundredweight",
            "cwt",
            poundConverter,
            pound => mul(pound, hundredweightScalar),
            hundredweight => div(hundredweight, hundredweightScalar)));

    const tonScalar = 2240;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Imperial,
            UnitedKingdom,
            "ton",
            "tn",
            poundConverter,
            pound => mul(pound, tonScalar),
            ton => div(ton, tonScalar)));
}