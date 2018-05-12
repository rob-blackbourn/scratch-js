import UnitConverter, {UnitIdentifier} from '../../../../UnitConverter';
import {Fraction, mul, div} from '../../../../../numbers';

import * as domains from '../../../domains';
import {NewZealand, SystemInternational} from '../../../authorities';
import {Metric, Gramme} from '../../../metric/constants';
import {ChickenEgg} from './constants';

export default (repository) => {

    const grammeConverter = repository.find(new UnitIdentifier(domains.Mass, Metric, SystemInternational, Gramme));

    const jumboScalar = 68;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            NewZealand,
            "jumbo",
            "size 8",
            grammeConverter,
            value => mul(value, jumboScalar),
            value => div(value, jumboScalar)));

    const largeScalar = 62;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            NewZealand,
            "large",
            "size 7",
            grammeConverter,
            value => mul(value, largeScalar),
            value => div(value, largeScalar)));

    const standardScalar = 53;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            NewZealand,
            "standard",
            "size 6",
            grammeConverter,
            value => mul(value, standardScalar),
            value => div(value, standardScalar)));

    const mediumScalar = 44;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            NewZealand,
            "medium",
            "size 5",
            grammeConverter,
            value => mul(value, mediumScalar),
            value => div(value, mediumScalar)));

    const pulletScalar = 35;
    repository.add(
        new UnitConverter(
            domains.Mass,
            ChickenEgg,
            NewZealand,
            "pullet",
            "size 4",
            grammeConverter,
            value => mul(value, pulletScalar),
            value => div(value, pulletScalar)));
};