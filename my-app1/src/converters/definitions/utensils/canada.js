import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import {Metric, Litre} from '../metric/constants';
import * as domains from '../domains';
import {Canada, SystemInternational} from '../authorities';
import {Utensils} from './constants';

export default repository => {

    const litreConverter = repository.find(new UnitIdentifier(domains.Volume, Metric, SystemInternational, Litre));

    const teaspoonScalar = new Fraction(5, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            Canada,
            "teaspoon",
            "tsp",
            litreConverter,
            value => mul(value, teaspoonScalar),
            value => div(value, teaspoonScalar)));

    const dessertspoonScalar = new Fraction(10, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            Canada,
            "dessertspoon",
            "dstspn",
            litreConverter,
            value => mul(value, dessertspoonScalar),
            value => div(value, dessertspoonScalar)));

    const tablespoonScalar = new Fraction(15, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            Canada,
            "tablespoon",
            "tbsp",
            litreConverter,
            value => mul(value, tablespoonScalar),
            value => div(value, tablespoonScalar)));

    const cupScalar = new Fraction(250, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            Canada,
            "cup",
            "cup",
            litreConverter,
            value => mul(value, cupScalar),
            value => div(value, cupScalar)));
};