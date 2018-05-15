import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import * as domains from '../domains';
import {Customary} from '../customary/constants';
import {UnitedStates} from '../authorities';
import {Utensils} from './constants';

export default repository => {

    const fluidOunceConverter = repository.find(new UnitIdentifier(domains.Volume, Customary, UnitedStates, 'fluid ounce'));

    const dropsPerFluidOunce = 576;
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            UnitedStates,
            "drop",
            "drop",
            fluidOunceConverter,
            value => mul(value, dropsPerFluidOunce),
            value => div(value, dropsPerFluidOunce)));

    const teaspoonsPerFluidOunce = 6;
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            UnitedStates,
            "teaspoon",
            "tsp",
            fluidOunceConverter,
            value => mul(value, teaspoonsPerFluidOunce),
            value => div(value, teaspoonsPerFluidOunce)));

    const fluidOuncesPerTablespoon = new Fraction(1, 2);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            UnitedStates,
            "tablespoon",
            "tbsp",
            fluidOunceConverter,
            value => mul(value, fluidOuncesPerTablespoon),
            value => div(value, fluidOuncesPerTablespoon)));

    const cupsPerFluidOunce = new Fraction(1, 8);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            UnitedStates,
            "cup",
            "cup",
            fluidOunceConverter,
            value => div(value, cupsPerFluidOunce),
            value => mul(value, cupsPerFluidOunce)));
};