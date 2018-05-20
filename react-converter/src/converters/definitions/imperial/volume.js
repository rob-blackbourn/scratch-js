import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import * as domains from '../domains';
import {UnitedKingdom, SystemInternational} from '../authorities';
import {Metric, Litre} from '../metric/constants';
import {Imperial, ImperialPint} from './constants';

export default (repository, system, authority) => {

    const litreConverter = repository.find(new UnitIdentifier(domains.Volume, SystemInternational, Metric, Litre));
    const litreScalar = new Fraction(56826125, 100000000);
    const pintConverter = repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedKingdom,
            Imperial,
            ImperialPint,
            "pt",
            litreConverter,
            pint => mul(pint, litreScalar),
            litre => div(litre, litreScalar)));

    const minimScalar = 9600;
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedKingdom,
            Imperial,
            "minim",
            "min",
            pintConverter,
            pint => div(pint, minimScalar),
            minim => mul(minim, minimScalar)));

    const fluidScrupleScalar = 480;
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedKingdom,
            Imperial,
            "fluid scruple",
            "fl scruple",
            pintConverter,
            pint => div(pint, fluidScrupleScalar),
            fluidScruple => mul(fluidScruple, fluidScrupleScalar)));

    const fluidDrachmScalar = 160;
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedKingdom,
            Imperial,
            "fluid drachm",
            "fl dr",
            pintConverter,
            pint => div(pint, fluidDrachmScalar),
            fluidDrachm => mul(fluidDrachm, fluidDrachmScalar)));

    const fluidOunceScalar = 20;
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedKingdom,
            Imperial,
            "fluid ounce",
            "fl oz",
            pintConverter,
            pint => div(pint, fluidOunceScalar),
            fluidOunce => mul(fluidOunce, fluidOunceScalar)));

    const gillScalar = 4;
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedKingdom,
            Imperial,
            "gill",
            "gl",
            pintConverter,
            pint => div(pint, gillScalar),
            gill => mul(gill, gillScalar)));

    const quartScalar = 2;
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedKingdom,
            Imperial,
            "quart",
            "qt",
            pintConverter,
            pint => mul(pint, quartScalar),
            quart => mul(quart, quartScalar)));

    const gallonScalar = 8;
    repository.add(
        new UnitConverter(
            domains.Volume,
            UnitedKingdom,
            Imperial,
            "gallon",
            "gal",
            pintConverter,
            pint => mul(pint, gallonScalar),
            gallon => div(gallon, gallonScalar)));
}