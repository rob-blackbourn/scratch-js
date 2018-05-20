import UnitConverter, {UnitIdentifier} from '../../UnitConverter'
import {Fraction, mul,div} from '../../../numbers'

import * as domains from '../domains'
import {UnitedStates, SystemInternational} from '../authorities'
import {Metric, Litre} from '../metric/constants'
import {Customary, CustomaryPint} from './constants'

export default repository => {

    const litreConverter = repository.find(new UnitIdentifier(domains.Volume, SystemInternational, Metric, Litre))
    const litreScalar = new Fraction(473176473, 1000000000) // 473176473
    const pintConverter = repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedStates,
            Customary,
            CustomaryPint,
            "pt",
            litreConverter,
            pint => mul(pint, litreScalar),
            litre => div(litre, litreScalar)))

    const minimScalar = 9600
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedStates,
            Customary,
            "minim",
            "min",
            pintConverter,
            pint => div(pint, minimScalar),
            minim => mul(minim, minimScalar)))

    const fluidDramScalar = 160
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedStates,
            Customary,
            "fluid dram",
            "fl dr",
            pintConverter,
            pint => div(pint, fluidDramScalar),
            fluidDram => mul(fluidDram, fluidDramScalar)))

    const fluidOunceScalar = 16
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedStates,
            Customary,
            "fluid ounce",
            "fl oz",
            pintConverter,
            pint => div(pint, fluidOunceScalar),
            fluidOunce => mul(fluidOunce, fluidOunceScalar)))

    const quartScalar = 2
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedStates,
            Customary,
            "quart",
            "qt",
            pintConverter,
            pint => mul(pint, quartScalar),
            quart => div(quart, quartScalar)))

    const gallonScalar = 8
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedStates,
            Customary,
            "gallon",
            "gal",
            pintConverter,
            pint => mul(pint, gallonScalar),
            gallon => div(gallon, gallonScalar)))
}