import UnitConverter from '../../../UnitConverter'
import { Fraction, mul, div } from '../../../../numbers'

import { Volume } from '../../domains'
import { UnitedStates } from '../../authorities'
import { Customary } from '../../systems'
import { LitreConverter } from '../../si/metric/baseConverters'
import { Pint, Minim, FluidDram, FluidOunce, Quart, Gallon } from '../../units'

const litreScalar = new Fraction(473176473, 1000000000) // 473176473
export const PintConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Customary,
        Pint,
        LitreConverter,
        pint => mul(pint, litreScalar),
        litre => div(litre, litreScalar))

const minimScalar = 9600
export const MinimConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Customary,
        Minim,
        PintConverter,
        pint => div(pint, minimScalar),
        minim => mul(minim, minimScalar))

const fluidDramScalar = 160
export const FluidDramConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Customary,
        FluidDram,
        PintConverter,
        pint => div(pint, fluidDramScalar),
        fluidDram => mul(fluidDram, fluidDramScalar))

const fluidOunceScalar = 16
export const FluidOunceConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Customary,
        FluidOunce,
        PintConverter,
        pint => div(pint, fluidOunceScalar),
        fluidOunce => mul(fluidOunce, fluidOunceScalar))

const quartScalar = 2
export const QuartConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Customary,
        Quart,
        PintConverter,
        pint => mul(pint, quartScalar),
        quart => div(quart, quartScalar))

const gallonScalar = 8
export const GallonConverter =
    new UnitConverter(
        Volume,
        UnitedStates,
        Customary,
        Gallon,
        PintConverter,
        pint => mul(pint, gallonScalar),
        gallon => div(gallon, gallonScalar))

export function collectUnitConverters() {
    return [
        PintConverter,
        MinimConverter,
        FluidDramConverter,
        FluidOunceConverter,
        QuartConverter,
        GallonConverter
    ]
}