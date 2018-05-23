import UnitConverter from '../../../UnitConverter';
import { Fraction, mul, div } from '../../../../numbers';

import { Length } from '../../domains';
import { UnitedKingdom } from '../../authorities';
import { Imperial } from '../../systems';
import { MeterConverter } from '../../si/metric/baseConverters';
import { Thou, Inch, Foot, Yard, Chain, Furlong, Mile, League } from '../../units'

const meterScalar = new Fraction(3048, 10000);
export const FeetConverter =
    new UnitConverter(
        Length,
        UnitedKingdom,
        Imperial,
        Foot,
        MeterConverter,
        feet => mul(feet, meterScalar),
        meter => div(meter, meterScalar))

const thouScalar = 12000
export const ThouConverter =
    new UnitConverter(
        Length,
        UnitedKingdom,
        Imperial,
        Thou,
        FeetConverter,
        feet => div(feet, thouScalar),
        thou => mul(thou, thouScalar))

const inchScalar = 12
export const InchConverter =
    new UnitConverter(
        Length,
        UnitedKingdom,
        Imperial,
        Inch,
        FeetConverter,
        feet => div(feet, inchScalar),
        inch => mul(inch, inchScalar))

const yardScalar = 3
export const YardConverter =
    new UnitConverter(
        Length,
        UnitedKingdom,
        Imperial,
        Yard,
        FeetConverter,
        feet => mul(feet, yardScalar),
        yard => div(yard, yardScalar))

const chainScalar = 66
export const ChainConverter =
    new UnitConverter(
        Length,
        UnitedKingdom,
        Imperial,
        Chain,
        FeetConverter,
        feet => mul(feet, chainScalar),
        chain => div(chain, chainScalar))

const furlongScalar = 660
export const FurlongConverter =
    new UnitConverter(
        Length,
        UnitedKingdom,
        Imperial,
        Furlong,
        FeetConverter,
        feet => mul(feet, furlongScalar),
        furlong => div(furlong, furlongScalar))

const mileScalar = 5280
export const MileConverter =
    new UnitConverter(
        Length,
        UnitedKingdom,
        Imperial,
        Mile,
        FeetConverter,
        feet => mul(feet, mileScalar),
        mile => div(mile, mileScalar))

const leagueScalar = 15840
export const LeagueConverter =
    new UnitConverter(
        Length,
        UnitedKingdom,
        Imperial,
        League,
        FeetConverter,
        feet => mul(feet, leagueScalar),
        league => div(league, leagueScalar))
    
export function collectUnitConverters() {
    return [
        FeetConverter,
        ThouConverter,
        InchConverter,
        YardConverter,
        ChainConverter,
        FurlongConverter,
        MileConverter,
        LeagueConverter
    ]
}