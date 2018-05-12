import createAustralianUnits from './australia';
import createCanadianUnits from './canada';
import createFdaUnits from './fda';
import createJapaneseUnits from './japan';
import createBritishUnits from './uk';
import createAmericanUnits from './usa';

export default (repository) => {
    createAustralianUnits(repository);
    createCanadianUnits(repository);
    createFdaUnits(repository);
    createJapaneseUnits(repository);
    createBritishUnits(repository);
    createAmericanUnits(repository);
};