import Repository from '../../Repository';
import {UnitIdentifier} from '../../UnitConverter';
import createUnits from './index';

import * as domains from '../domains';
import {SystemInternational} from '../authorities';
import {Metric} from './constants';

const repository = new Repository();
createUnits(repository);

describe('metric', () => {

    describe('length', () => {

        it('should convert kilometers to millimeters', () => {
            const kilometers = 1;
            const millimeters =  repository.findAndConvert(new UnitIdentifier(domains.Length, SystemInternational, Metric, 'kilometer'), kilometers, new UnitIdentifier(domains.Length, SystemInternational, Metric, 'millimeter'));
            expect(millimeters).toBe(1 * 1000 * 1000);
        });

        it('should convert millimeters to kilometers', () => {
            const millimeters = 1 * 1000 * 1000;
            const kilometers =  repository.findAndConvert(new UnitIdentifier(domains.Length, SystemInternational, Metric, 'millimeter'), millimeters, new UnitIdentifier(domains.Length, SystemInternational, Metric, 'kilometer'));
            expect(kilometers).toBe(1);
        });

    });
});