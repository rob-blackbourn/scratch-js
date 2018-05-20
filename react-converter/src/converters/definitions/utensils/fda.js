import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import {Metric, Litre} from '../metric/constants';
import * as domains from '../domains';
import {FederalDrugAdministration, SystemInternational} from '../authorities';
import {Utensils} from './constants';

export default repository => {

    const litreConverter = repository.find(new UnitIdentifier(domains.Volume, SystemInternational, Metric, Litre));

    const teaspoonScalar = new Fraction(5, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            FederalDrugAdministration,
            Utensils,
            "teaspoon",
            "tsp",
            litreConverter,
            value => mul(value, teaspoonScalar),
            value => div(value, teaspoonScalar)));

    const tablespoonScalar = new Fraction(15, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            FederalDrugAdministration,
            Utensils,
            "tablespoon",
            "tbsp",
            litreConverter,
            value => mul(value, tablespoonScalar),
            value => div(value, tablespoonScalar)));

    const cupScalar = new Fraction(240, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            FederalDrugAdministration,
            Utensils,
            "cup",
            "cup",
            litreConverter,
            value => mul(value, cupScalar),
            value => div(value, cupScalar)));
};