import Repository from '../../Repository';
import {UnitIdentifier} from '../../UnitConverter';
import createMetricUnits from '../metric';
import createImperialUnits from '../imperial';
import createCustomaryUnits from '../customary';
import createUtensilUnits from './index';

import * as domains from '../domains';
import {UnitedStates, UnitedKingdom, SystemInternational} from '../authorities';
import {Metric} from '../metric/constants';
import {Customary} from '../customary/constants';
import {Utensils} from './constants';

const repository = new Repository();
createMetricUnits(repository);
createImperialUnits(repository);
createCustomaryUnits(repository);
createUtensilUnits(repository);

describe('utensils', () => {

    describe('spoons', () => {

        it('should convert US tablespoons to US fluid ounces', () => {
            const usTableSpoons = 2;
            const usFluidOunces =  repository.findAndConvert(new UnitIdentifier(domains.Volume, Utensils, UnitedStates, 'tablespoon'), usTableSpoons, new UnitIdentifier(domains.Volume, Customary, UnitedStates, 'fluid ounce'));
            expect(usFluidOunces.valueOf()).toBe(1);
        });

        it('should convert UK tablespoons to millilitres', () => {
            const ukTableSpoons = 1;
            const millilitres =  repository.findAndConvert(new UnitIdentifier(domains.Volume, Utensils, UnitedKingdom, 'tablespoon'), ukTableSpoons, new UnitIdentifier(domains.Volume, Metric, SystemInternational, 'millilitre'));
            expect(millilitres.valueOf()).toBe(15);
        });

        it('should convert US tablespoons to millilitres', () => {
            const usTableSpoons = 1;
            const millilitres =  repository.findAndConvert(new UnitIdentifier(domains.Volume, Utensils, UnitedStates, 'tablespoon'), usTableSpoons, new UnitIdentifier(domains.Volume, Metric, SystemInternational, 'millilitre'));
            expect(millilitres.valueOf()).toBe(14.78676478125);
        });
        
        it('should convert US tablespoons to UK tablespoons', () => {
            const usTableSpoons = 1;
            const ukTableSpoons =  repository.findAndConvert(new UnitIdentifier(domains.Volume, Utensils, UnitedStates, 'tablespoon'), usTableSpoons, new UnitIdentifier(domains.Volume, Utensils, UnitedKingdom, 'tablespoon'));
            expect(ukTableSpoons.valueOf()).toBe(0.98578431875);
        });

    });

    describe('cups', () => {

        it('should convert US cups to UK cups', () => {
            const usCups = 1;
            const ukCups =  repository.findAndConvert(new UnitIdentifier(domains.Volume, Utensils, UnitedStates, 'cup'), usCups, new UnitIdentifier(domains.Volume, Utensils, UnitedKingdom, 'cup'));
            expect(ukCups.valueOf()).toBe(0.8326741846289889);
        });

    });

});