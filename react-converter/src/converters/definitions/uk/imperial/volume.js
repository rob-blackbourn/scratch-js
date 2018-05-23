import UnitConverter from '../../../UnitConverter'
import {Fraction, mul, div} from '../../../../numbers'

import { Volume } from '../../domains'
import { UnitedKingdom } from '../../authorities'
import { Imperial } from '../../systems'
import { Pint, Minim, FluidScruple, FluidDrachm, FluidOunce, Gill, Quart, Gallon } from '../../units'

import { LitreConverter } from '../../si/metric'

const litreScalar = new Fraction(56826125, 100000000)
export const PintConverter = 
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Imperial,
        Pint,
        LitreConverter,
        pint => mul(pint, litreScalar),
        litre => div(litre, litreScalar))

const minimScalar = 9600
export const MinimConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Imperial,
        Minim,
        PintConverter,
        pint => div(pint, minimScalar),
        minim => mul(minim, minimScalar))

const fluidScrupleScalar = 480
export const FluidScrupleConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Imperial,
        FluidScruple,
        PintConverter,
        pint => div(pint, fluidScrupleScalar),
        fluidScruple => mul(fluidScruple, fluidScrupleScalar))

const fluidDrachmScalar = 160
export const FluidDrachmConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Imperial,
        FluidDrachm,
        PintConverter,
        pint => div(pint, fluidDrachmScalar),
        fluidDrachm => mul(fluidDrachm, fluidDrachmScalar))

const fluidOunceScalar = 20
export const FluidOunceConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Imperial,
        FluidOunce,
        PintConverter,
        pint => div(pint, fluidOunceScalar),
        fluidOunce => mul(fluidOunce, fluidOunceScalar))

const gillScalar = 4
export const GillConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Imperial,
        Gill,
        PintConverter,
        pint => div(pint, gillScalar),
        gill => mul(gill, gillScalar))

const quartScalar = 2
export const QuartConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Imperial,
        Quart,
        PintConverter,
        pint => mul(pint, quartScalar),
        quart => div(quart, quartScalar))

const gallonScalar = 8
export const GallonConverter =
    new UnitConverter(
        Volume,
        UnitedKingdom,
        Imperial,
        Gallon,
        PintConverter,
        pint => mul(pint, gallonScalar),
        gallon => div(gallon, gallonScalar))
            
export function collectUnitConverters() {
    return [
        PintConverter,
        MinimConverter,
        FluidScrupleConverter,
        FluidDrachmConverter,
        FluidOunceConverter,
        GillConverter,
        QuartConverter,
        GallonConverter
    ]
}