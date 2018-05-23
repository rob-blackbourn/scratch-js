import UnitConverter from '../../../UnitConverter';
import {Fraction, mul, div} from '../../../../numbers';

import { Mass } from '../../domains';
import { UnitedKingdom } from '../../authorities';
import { Imperial } from '../../systems'
import { GrammeConverter } from '../../si/metric/baseConverters'
import { Grain, Drachm, Ounce, Pound, Stone, Quarter, Hundredweight, Ton } from '../../units'

const grammeScalar = new Fraction(45359237, 100000)
export const PoundConverter = 
    new UnitConverter(
        Mass,
        UnitedKingdom,
        Imperial,
        Pound,
        GrammeConverter,
        pound => mul(pound, grammeScalar),
        gramme => div(gramme, grammeScalar))

const grainScalar = 7000
export const GrainConverter =
    new UnitConverter(
        Mass,
        UnitedKingdom,
        Imperial,
        Grain,
        PoundConverter,
        pound => div(pound, grainScalar),
        grain => mul(grain, grainScalar))

const drachmScalar = 256
export const DrachmConverter =
    new UnitConverter(
        Mass,
        UnitedKingdom,
        Imperial,
        Drachm,
        PoundConverter,
        pound => div(pound, drachmScalar),
        drachm => mul(drachm, drachmScalar))

const ounceScalar = 16;
export const OunceConverter =
    new UnitConverter(
        Mass,
        UnitedKingdom,
        Imperial,
        Ounce,
        PoundConverter,
        pound => div(pound, ounceScalar),
        ounce => mul(ounce, ounceScalar))

const stoneScalar = 14
export const StoneConverter =
    new UnitConverter(
        Mass,
        UnitedKingdom,
        Imperial,
        Stone,
        PoundConverter,
        pound => mul(pound, stoneScalar),
        stone => div(stone, stoneScalar))

const quarterScalar = 28
export const QuarterConverter =
    new UnitConverter(
        Mass,
        UnitedKingdom,
        Imperial,
        Quarter,
        PoundConverter,
        pound => mul(pound, quarterScalar),
        quarter => div(quarter, quarterScalar))

const hundredweightScalar = 112
export const HundredweightConverter =
    new UnitConverter(
        Mass,
        UnitedKingdom,
        Imperial,
        Hundredweight,
        PoundConverter,
        pound => mul(pound, hundredweightScalar),
        hundredweight => div(hundredweight, hundredweightScalar))

const tonScalar = 2240
export const TonConverter =
    new UnitConverter(
        Mass,
        UnitedKingdom,
        Imperial,
        Ton,
        PoundConverter,
        pound => mul(pound, tonScalar),
        ton => div(ton, tonScalar))
            
export function collectUnitConverters() {
    return [
        GrainConverter,
        DrachmConverter,
        OunceConverter,
        PoundConverter,
        StoneConverter,
        QuarterConverter,
        HundredweightConverter,
        TonConverter
    ]
}