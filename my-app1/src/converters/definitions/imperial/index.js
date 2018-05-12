import createMassUnits from './mass';
import createLengthUnits from './length';
import createVolumeUnits from './volume';
import {Imperial, ImperialPint} from './constants';

export default (repository) => {

    createLengthUnits(repository);
    createMassUnits(repository);
    createVolumeUnits(repository);
};

export {Imperial, ImperialPint};