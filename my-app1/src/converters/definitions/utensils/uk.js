import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import {Metric, Litre} from '../metric/constants';
import {Imperial} from '../imperial/constants';
import * as domains from '../domains';
import {UnitedKingdom, SystemInternational} from '../authorities';
import {Utensils} from './constants';

export default (repository) => {

    const litreConverter = repository.find(new UnitIdentifier(domains.Volume, Metric, SystemInternational, Litre));
    const pintConverter = repository.find(new UnitIdentifier(domains.Volume, Imperial, UnitedKingdom, 'pint'));

    const teaspoonScalar = new Fraction(5, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            UnitedKingdom,
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
            UnitedKingdom,
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
            UnitedKingdom,
            "tablespoon",
            "tbsp",
            litreConverter,
            value => mul(value, tablespoonScalar),
            value => div(value, tablespoonScalar)));

    const cupScalar = 2;
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            UnitedKingdom,
            "cup",
            "cup",
            pintConverter,
            value => div(value, cupScalar),
            value => mul(value, cupScalar)));
};