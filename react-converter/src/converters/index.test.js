import createRepository, {UnitIdentifier} from './index';

import * as domains from './definitions/domains';
import {SystemInternational, UnitedKingdom} from './definitions/authorities';
import {Metric} from './definitions/metric/constants';
import {Imperial} from './definitions/imperial/constants';

const repository = createRepository();

describe('converters', () => {

    describe('length', () => {

        it('should convert centimeters to inches', () => {
            const centimeters = 2.54;
            const inches =  repository.findAndConvert(new UnitIdentifier(domains.Length, SystemInternational, Metric, 'centimeter'), centimeters, new UnitIdentifier(domains.Length, UnitedKingdom, Imperial, 'inch'));
            expect(inches).toBeCloseTo(1, 10);
        });

        it('should convert centimeters to inches with unit identifiers', () => {
            const centimeters = 2.54;
            const inches =  repository.findAndConvert(new UnitIdentifier(domains.Length, SystemInternational, Metric, 'centimeter'), centimeters, new UnitIdentifier(domains.Length, UnitedKingdom, Imperial, 'inch'));
            expect(inches).toBeCloseTo(1, 10);
        });

    });

});