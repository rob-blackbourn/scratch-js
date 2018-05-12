import createMetricUnits from './metric';
import createImperialUnits from './imperial';
import createCustomaryUnits from './customary';
import createTemperature from './temperature';
import createUtensilUnits from './utensils';
import createFoodUnits from './food';

export default repository => {
    createMetricUnits(repository);
    createImperialUnits(repository);
    createCustomaryUnits(repository);
    createTemperature(repository);
    createUtensilUnits(repository);
    createFoodUnits(repository);
};

