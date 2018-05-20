import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import {Metric, Litre} from '../metric/constants';
import * as domains from '../domains';
import {Australia, SystemInternational} from '../authorities';
import {Utensils} from './constants';

export default (repository) => {

    const litreConverter = repository.find(new UnitIdentifier(domains.Volume, SystemInternational, Metric, Litre));

    const teaspoonScalar = new Fraction(5, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Australia,
            Utensils,
            "teaspoon",
            "tsp",
            litreConverter,
            value => mul(value, teaspoonScalar),
            value => div(value, teaspoonScalar)));

    const dessertspoonScalar = new Fraction(10, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Australia,
            Utensils,
            "dessertspoon",
            "dstspn",
            litreConverter,
            value => mul(value, dessertspoonScalar),
            value => div(value, dessertspoonScalar)));

    const tablespoonScalar = new Fraction(20, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Australia,
            Utensils,
            "tablespoon",
            "tbsp",
            litreConverter,
            value => mul(value, tablespoonScalar),
            value => div(value, tablespoonScalar)));

    const cupScalar = new Fraction(250, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Australia,
            Utensils,
            "cup",
            "cup",
            litreConverter,
            value => mul(value, cupScalar),
            value => div(value, cupScalar)));
};