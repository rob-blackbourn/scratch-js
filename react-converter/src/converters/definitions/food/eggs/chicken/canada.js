import UnitConverter, {UnitIdentifier} from '../../../../UnitConverter';
import { mul, div } from '../../../../../numbers';

import * as domains from '../../../domains';
import {Canada, SystemInternational} from '../../../authorities';
import {Metric, Gramme} from '../../../metric/constants';
import {ChickenEgg} from './constants';

export default (repository) => {

    const grammeConverter = repository.find(new UnitIdentifier(domains.Mass, Metric, SystemInternational, Gramme));

    const jumboScalar = 70;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            Canada,
            "jumbo",
            "jumbo",
            grammeConverter,
            value => mul(value, jumboScalar),
            value => div(value, jumboScalar)));

    const veryLargeScalar = 66;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            Canada,
            "very large",
            "XL",
            grammeConverter,
            value => mul(value, veryLargeScalar),
            value => div(value, veryLargeScalar)));

    const largeScalar = 59;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            Canada,
            "large",
            "L",
            grammeConverter,
            value => mul(value, largeScalar),
            value => div(value, largeScalar)));

    const mediumScalar = 52;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            Canada,
            "medium",
            "M",
            grammeConverter,
            value => mul(value, mediumScalar),
            value => div(value, mediumScalar)));

    const smallScalar = 45;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            Canada,
            "small",
            "S",
            grammeConverter,
            value => mul(value, smallScalar),
            value => div(value, smallScalar)));

    const peeweeScalar = 41;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            Canada,
            "peewee",
            "peewee",
            grammeConverter,
            value => mul(value, peeweeScalar),
            value => value.div(peeweeScalar)));
};