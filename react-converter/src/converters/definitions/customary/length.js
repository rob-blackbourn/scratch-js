import UnitConverter, {UnitIdentifier} from '../../UnitConverter'
import {Fraction, mul, div} from '../../../numbers'

import * as domains from '../domains'

import {UnitedStates, SystemInternational} from '../authorities'
import {Metric, Meter} from '../metric/constants'
import {Customary, CustomaryFeet} from './constants'

export default (repository) => {

    const meterConverter = repository.find(new UnitIdentifier(domains.Length, SystemInternational, Metric, Meter))
    const meterScalar = new Fraction(3048, 10000)
    const feetConverter = repository.add(
        new UnitConverter(
            domains.Length,
            UnitedStates,
            Customary,
            CustomaryFeet,
            "ft",
            meterConverter,
            value => mul(value, meterScalar),
            value => div(value, meterScalar)))

    const thouScalar = 12000
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedStates,
            Customary,
            "thou",
            "th",
            feetConverter,
            value => div(value, thouScalar),
            value => mul(value, thouScalar)))

    const inchScalar = 12
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedStates,
            Customary,
            "inch",
            "in",
            feetConverter,
            value => div(value, inchScalar),
            value => mul(value, inchScalar)))

    const yardScalar = 3
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedStates,
            Customary,
            "yard",
            "yd",
            feetConverter,
            value => mul(value, yardScalar),
            value => div(value, yardScalar)))

    const chainScalar = 66
    repository.add(
        new UnitConverter(
            domains.Length,
            Customary,
            UnitedStates,
            "chain",
            "ch",
            feetConverter,
            value => mul(value, chainScalar),
            value => div(value, chainScalar)))

    const furlongScalar = 660
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedStates,
            Customary,
            "furlong",
            "fur",
            feetConverter,
            value => mul(value, furlongScalar),
            value => div(value, furlongScalar)))

    const mileScalar = 5280
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedStates,
            Customary,
            "mile",
            "mi",
            feetConverter,
            value => mul(value, mileScalar),
            value => div(value, mileScalar)))

    const leagueScalar = 15840
    repository.add(
        new UnitConverter(
            domains.Length,
            UnitedStates,
            Customary,
            "league",
            "lea",
            feetConverter,
            value => mul(value, leagueScalar),
            value => div(value, leagueScalar)))
}