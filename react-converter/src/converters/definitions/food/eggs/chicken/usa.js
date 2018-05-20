import UnitConverter, {UnitIdentifier} from '../../../../UnitConverter';
import {Fraction, mul, div} from '../../../../../numbers';

import * as domains from '../../../domains';
import {UnitedStates} from '../../../authorities';
import {Customary} from '../../../customary/constants';
import {ChickenEgg} from './constants';

export default (repository) => {

    const ounceConverter = repository.find(new UnitIdentifier(domains.Mass, UnitedStates, Customary, 'ounce'));

    const jumboScalar = new Fraction(5, 2);
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            ChickenEgg,
            "jumbo",
            "jumbo",
            ounceConverter,
            value => mul(value, jumboScalar),
            value => div(value, jumboScalar)));

    const veryLargeScalar = new Fraction(9, 4);
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            ChickenEgg,
            "very large",
            "XL",
            ounceConverter,
            value => mul(value, veryLargeScalar),
            value => div(value, veryLargeScalar)));

    const largeScalar = 2;
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            ChickenEgg,
            "large",
            "L",
            ounceConverter,
            value => mul(value, largeScalar),
            value => div(value, largeScalar)));

    const mediumScalar = new Fraction(7, 4);
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            ChickenEgg,
            "medium",
            "M",
            ounceConverter,
            value => mul(value, mediumScalar),
            value => div(value, mediumScalar)));

    const smallScalar = new Fraction(3, 2);
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            ChickenEgg,
            "small",
            "S",
            ounceConverter,
            value => mul(value, smallScalar),
            value => div(value, smallScalar)));

    const peeweeScalar = new Fraction(5, 4);
    repository.add(
        new UnitConverter(
            domains.Mass,
            UnitedStates,
            ChickenEgg,
            "peewee",
            "peewee",
            ounceConverter,
            value => mul(value, peeweeScalar),
            value => div(value, peeweeScalar)));
};