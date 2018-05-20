import UnitConverter, {UnitIdentifier} from '../../UnitConverter'
import {Fraction, mul, div} from '../../../numbers'

import * as domains from '../domains'
import {UnitedStates, SystemInternational} from '../authorities'
import {Metric,  Gramme} from '../metric/constants'
import {Customary,  CustomaryPound} from './constants'

export default repository => {

    const grammeConverter = repository.find(new UnitIdentifier(domains.Mass, SystemInternational, Metric, Gramme))
    const grammeScalar = new Fraction(45359237, 100000)
    const poundConverter = repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            Customary,
            CustomaryPound,
            "lb",
            grammeConverter,
            value => mul(value, grammeScalar),
            value => div(value, grammeScalar)))

    const grainScalar = 7000
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            Customary,
            "grain",
            "gr",
            poundConverter,
            value => div(value, grainScalar),
            value => mul(value, grainScalar)))

    const dramScalar = 256
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            Customary,
            "dram",
            "dr",
            poundConverter,
            value => div(value, dramScalar),
            value => mul(value, dramScalar)))

    const ounceScalar = 16
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            Customary,
            "ounce",
            "oz",
            poundConverter,
            value => div(value, ounceScalar),
            value => mul(value, ounceScalar)))

    const stoneScalar = 16
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            Customary,
            "stone",
            "st",
            poundConverter,
            value => mul(value, stoneScalar),
            value => div(value, stoneScalar)));

    const quarterScalar = 28
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            Customary,
            "quarter",
            "qtr",
            poundConverter,
            value => mul(value, quarterScalar),
            value => div(value, quarterScalar)))

    const hundredweightScalar = 112
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            Customary,
            "hundredweight",
            "cwt",
            poundConverter,
            value => mul(value, hundredweightScalar),
            value => div(value, hundredweightScalar)))

    const tonScalar = 2240;
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            Customary,
            "ton",
            "tn",
            poundConverter,
            value => mul(value, tonScalar),
            value => value.div(tonScalar)))
}