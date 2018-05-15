import UnitConverter, {UnitIdentifier} from '../../../../UnitConverter';
import { mul, div } from '../../../../../numbers';

import * as domains from '../../../domains';
import {EuropeanUnion, SystemInternational} from '../../../authorities';
import {Metric, Gramme} from '../../../metric/constants';
import {ChickenEgg} from './constants';

export default (repository) => {

    const grammeConverter = repository.find(new UnitIdentifier(domains.Mass, Metric, SystemInternational, Gramme));

    const veryLargeScalar = 73;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            EuropeanUnion,
            "very large",
            "XL",
            grammeConverter,
            value => mul(value, veryLargeScalar),
            value => div(value, veryLargeScalar)));

    const largeScalar = 68;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            EuropeanUnion,
            "large",
            "L",
            grammeConverter,
            value => mul(value, largeScalar),
            value => value.div(largeScalar)));

    const mediumScalar = 58;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            EuropeanUnion,
            "medium",
            "M",
            grammeConverter,
            value => mul(value, mediumScalar),
            value => div(value, mediumScalar)));

    const smallScalar = 53;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            EuropeanUnion,
            "small",
            "S",
            grammeConverter,
            value => mul(value, smallScalar),
            value => div(value, smallScalar)));

};