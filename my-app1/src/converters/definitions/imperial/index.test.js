import Repository from '../../Repository';
import {UnitIdentifier} from '../../UnitConverter';
import createMetricUnits from '../metric/index';
import createImperialUnits from './index';

import * as domains from '../domains';
import {UnitedKingdom, SystemInternational} from '../authorities';
import {Metric} from '../metric/constants';
import {Imperial} from './constants';

const repository = new Repository();
createMetricUnits(repository);
createImperialUnits(repository);

describe('metric', () => {

    describe('length', () => {

        it('should convert miles to inches', () => {
            const miles = 1;
            const inches =  repository.findAndConvert(new UnitIdentifier(domains.Length, Imperial, UnitedKingdom, 'mile'), miles, new UnitIdentifier(domains.Length, Imperial, UnitedKingdom, 'inch'));
            expect(inches).toBe(1 * 12 * 5280);
        });

        it('should convert inches to miles', () => {
            const inches = 1 * 12 * 5280;
            const miles =  repository.findAndConvert(new UnitIdentifier(domains.Length, Imperial, UnitedKingdom, 'inch'), inches, new UnitIdentifier(domains.Length, Imperial, UnitedKingdom, 'mile'));
            expect(miles).toBe(1);
        });

        it('should convert inches to centimeters', () => {
            const inches = 1;
            const centimeters =  repository.findAndConvert(new UnitIdentifier(domains.Length, Imperial, UnitedKingdom, 'inch'), inches, new UnitIdentifier(domains.Length, Metric, SystemInternational, 'centimeter'));
            expect(centimeters).toBe(2.54);
        });

        it('should convert centimeters to inches', () => {
            const centimeters = 2.54;
            const inches =  repository.findAndConvert(new UnitIdentifier(domains.Length, Metric, SystemInternational, 'centimeter'), centimeters, new UnitIdentifier(domains.Length, Imperial, UnitedKingdom, 'inch'));
            expect(inches).toBeCloseTo(1, 10);
        });

    });
});