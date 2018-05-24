import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { Length } from '../../domains'

import { UnitedStates } from '../../authorities'
import { Customary } from '../../systems'
import { MeterConverter } from '../../si/metric/baseConverters'
import { Thou, Inch, Foot, Yard, Chain, Furlong, Mile, League } from '../../units'

const meterScalar = new Fraction(3048, 10000)
export const FeetConverter =
    new UnitConverter(
        Length,
        UnitedStates,
        Customary,
        Foot,
        MeterConverter,
        feet => mul(feet, meterScalar),
        meter => div(meter, meterScalar))

const thouScalar = 12000
export const ThouConverter =
    new UnitConverter(
        Length,
        UnitedStates,
        Customary,
        Thou,
        FeetConverter,
        feet => div(feet, thouScalar),
        thous => mul(thous, thouScalar))

const inchScalar = 12
export const InchConverter =
    new UnitConverter(
        Length,
        UnitedStates,
        Customary,
        Inch,
        FeetConverter,
        feet => div(feet, inchScalar),
        inches => mul(inches, inchScalar))

const yardScalar = 3
export const YardConverter =
    new UnitConverter(
        Length,
        UnitedStates,
        Customary,
        Yard,
        FeetConverter,
        feet => mul(feet, yardScalar),
        yards => div(yards, yardScalar))

const chainScalar = 66
export const ChainConverter =
    new UnitConverter(
        Length,
        UnitedStates,
        Customary,
        Chain,
        FeetConverter,
        feet => mul(feet, chainScalar),
        chains => div(chains, chainScalar))

const furlongScalar = 660
export const FurlongConverter =
    new UnitConverter(
        Length,
        UnitedStates,
        Customary,
        Furlong,
        FeetConverter,
        feet => mul(feet, furlongScalar),
        furlongs => div(furlongs, furlongScalar))

const mileScalar = 5280
export const MileConverter =
    new UnitConverter(
        Length,
        UnitedStates,
        Customary,
        Mile,
        FeetConverter,
        feet => mul(feet, mileScalar),
        miles => div(miles, mileScalar))

const leagueScalar = 15840
export const LeagueConverter =
    new UnitConverter(
        Length,
        UnitedStates,
        Customary,
        League,
        FeetConverter,
        feet => mul(feet, leagueScalar),
        leagues => div(leagues, leagueScalar))

export function collectUnitConverters() {
    return [
        ThouConverter,
        InchConverter,
        FeetConverter,
        YardConverter,
        ChainConverter,
        FurlongConverter,
        MileConverter,
        LeagueConverter
    ]
}