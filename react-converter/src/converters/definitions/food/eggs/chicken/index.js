import createAustralianUnits from './australia';
import createCanadianUnits from './canada';
import createEuropeanUnits from './europe';
import createNewZealandUnits from './newzealand';
import createAmericanUnits from './usa';

export default repository => {
    createAustralianUnits(repository);
    createCanadianUnits(repository);
    createEuropeanUnits(repository);
    createNewZealandUnits(repository);
    createAmericanUnits(repository);
}
