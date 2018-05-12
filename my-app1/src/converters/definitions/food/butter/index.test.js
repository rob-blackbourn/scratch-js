import Repository from '../../../Repository';
import {UnitIdentifier} from '../../../UnitConverter';
import createMetricUnits from '../../metric/index';
import createCustomaryUnits, {Customary} from '../../customary/index';
import createButterUnits, {Butter} from './index';

import * as domains from '../../domains';
import {UnitedStates} from '../../authorities';

const repository = new Repository();
createMetricUnits(repository);
createCustomaryUnits(repository);
createButterUnits(repository);

describe('butter', () => {

    it('should convert a stick of butter to pounds', () => {
        const sticks = 1;
        const pounds =  repository.findAndConvert(new UnitIdentifier(domains.Mass, Butter, UnitedStates, 'stick'), sticks, new UnitIdentifier(domains.Mass, Customary, UnitedStates, 'pound'));
        expect(pounds.valueOf()).toBe(0.25);
    });

});