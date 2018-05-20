import UnitConverter, {UnitIdentifier} from '../../../../UnitConverter';
import { mul, div } from '../../../../../numbers';

import * as domains from '../../../domains';
import {Australia, SystemInternational} from '../../../authorities';
import {Metric, Gramme} from '../../../metric/constants';
import {ChickenEgg} from './constants';

export default repository => {

    const grammeConverter = repository.find(new UnitIdentifier(domains.Mass, SystemInternational, Metric, Gramme));

    const kingSizeScalar = 74;
    const jumboScalar = 70;
    const veryLargeScalar = 68.35;
    const largeScalar = 62.45;
    const mediumScalar = 45.95;

    repository.add(
        new UnitConverter(
            domains.Mass,
            Australia,
            ChickenEgg,
            "king size",
            "king size",
            grammeConverter,
            value => mul(value, kingSizeScalar),
            value => div(value, kingSizeScalar)));

    repository.add(
        new UnitConverter(
            domains.Mass,
            Australia,
            ChickenEgg,
            "jumbo",
            "jumbo",
            grammeConverter,
            value => mul(value, jumboScalar),
            value => div(value, jumboScalar)));

    repository.add(
        new UnitConverter(
            domains.Mass,
            Australia,
            ChickenEgg,
            "very large",
            "XL",
            grammeConverter,
            value => mul(value, veryLargeScalar),
            value => div(value, veryLargeScalar)));

    repository.add(
        new UnitConverter(
            domains.Mass,
            Australia,
            ChickenEgg,
            "large",
            "L",
            grammeConverter,
            value => mul(value, largeScalar),
            value => div(value, largeScalar)));

    repository.add(
        new UnitConverter(
            domains.Mass,
            Australia,
            ChickenEgg,
            "medium",
            "M",
            grammeConverter,
            value => mul(value, mediumScalar),
            value => div(value, mediumScalar)))

}