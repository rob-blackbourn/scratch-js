import createMassUnits from './mass';
import createLengthUnits from './length';
import createVolumeUnits from './volume';

import {Customary} from './constants';

export default repository => {
    createLengthUnits(repository);
    createMassUnits(repository);
    createVolumeUnits(repository);
};

export {Customary};