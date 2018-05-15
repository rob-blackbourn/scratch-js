import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, mul, div} from '../../../numbers';

import {Metric, Litre} from '../metric/constants';
import * as domains from '../domains';
import {Japan, SystemInternational} from '../authorities';
import {Utensils} from './constants';

export default (repository) => {

    const litreConverter = repository.find(new UnitIdentifier(domains.Volume, Metric, SystemInternational, Litre));

    const goScalar = new Fraction(2401, 133100);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            Japan,
            "go",
            "go",
            litreConverter,
            value => mul(value, goScalar),
            value => div(value, goScalar)));

    const cupScalar = new Fraction(200, 1000);
    repository.add(
        new UnitConverter(
            domains.Volume,
            Utensils,
            Japan,
            "cup",
            "cup",
            litreConverter,
            value => mul(value, cupScalar),
            value => div(value, cupScalar)));
};