import UnitConverter, {UnitIdentifier} from '../../../UnitConverter';
import {Fraction, mul, div} from '../../../../numbers';

import * as domains from '../../domains';
import {UnitedStates} from '../../authorities';
import {Customary} from '../../customary/constants';
import {Butter} from './constants';

export default (repository) => {

    const poundConverter = repository.find(new UnitIdentifier(domains.Mass, Customary, UnitedStates, 'pound'));

    const stickScalar = new Fraction(1, 4);
    repository.add(
        new UnitConverter(
            domains.Mass,
            Butter,
            UnitedStates,
            "stick",
            "stick",
            poundConverter,
            value => mul(value, stickScalar),
            value => div(value, stickScalar)));
};