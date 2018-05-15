import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import * as domains from '../domains';
import {UnitedStates, SystemInternational} from '../authorities';
import {Metric,  Gramme} from '../metric/constants';
import {Customary,  CustomaryPound} from './constants';

export default repository => {

    const grammeConverter = repository.find(new UnitIdentifier(domains.Mass, Metric, SystemInternational, Gramme));
    const grammeScalar = new Fraction(45359237, 100000);
    const poundConverter = repository.add(
        new UnitConverter(
            domains.Mass,
            Customary,
            UnitedStates,
            CustomaryPound,
            "lb",
            grammeConverter,
            value => mul(value, grammeScalar),
            value => div(value, grammeScalar)));

    const grainScalar = 7000;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Customary,
            UnitedStates,
            "grain",
            "gr",
            poundConverter,
            value => div(value, grainScalar),
            value => mul(value, grainScalar)));

    const dramScalar = 256;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Customary,
            UnitedStates,
            "dram",
            "dr",
            poundConverter,
            value => div(value, dramScalar),
            value => mul(value, dramScalar)));

    const ounceScalar = 16;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Customary,
            UnitedStates,
            "ounce",
            "oz",
            poundConverter,
            value => div(value, ounceScalar),
            value => mul(value, ounceScalar)));

    const stoneScalar = 16;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Customary,
            UnitedStates,
            "stone",
            "st",
            poundConverter,
            value => mul(value, stoneScalar),
            value => div(value, stoneScalar)));

    const quarterScalar = 28;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Customary,
            UnitedStates,
            "quarter",
            "qtr",
            poundConverter,
            value => mul(value, quarterScalar),
            value => div(value, quarterScalar)));

    const hundredweightScalar = 112;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Customary,
            UnitedStates,
            "hundredweight",
            "cwt",
            poundConverter,
            value => mul(value, hundredweightScalar),
            value => div(value, hundredweightScalar)));

    const tonScalar = 2240;
    repository.add(
        new UnitConverter(
            domains.Mass,
            Customary,
            UnitedStates,
            "ton",
            "tn",
            poundConverter,
            value => mul(value, tonScalar),
            value => value.div(tonScalar)));
};