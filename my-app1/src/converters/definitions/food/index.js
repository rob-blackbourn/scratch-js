import createEggUnits from './eggs';
import createButterUnits from './butter';

export default repository => {
    createEggUnits(repository);
    createButterUnits(repository);
}