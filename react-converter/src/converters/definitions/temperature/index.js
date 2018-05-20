import UnitConverter, {UnitIdentifier} from '../../UnitConverter';
import {Fraction, add, sub, mul, div, lt} from '../../../numbers';
import * as domains from '../domains';
import {UnitedKingdom, SystemInternational} from '../authorities';
import {Metric, Kelvin} from '../metric/constants';
import {Imperial} from '../imperial/constants';

export default (repository) => {

    const kelvinConverter = repository.find(new UnitIdentifier(domains.Temperature, SystemInternational, Metric, Kelvin));

    const celsiusOffset = new Fraction(27315, 100);
    const celsiusConverter = repository.add(
        new UnitConverter(
            domains.Temperature,
            SystemInternational,
            Metric,
            "Celsius",
            '\u00b0C',
            kelvinConverter,
            celsius => add(celsius, celsiusOffset),
            kelvin => sub(kelvin, celsiusOffset)));

    const fahrenheitOffset = 32;
    const fahrenheitScalar = new Fraction(9, 5);
    repository.add(
        new UnitConverter(
            domains.Temperature,
            UnitedKingdom,
            Imperial,
            "Fahrenheit",
            '\u00b0F',
            celsiusConverter,
            farenheit => div(sub(farenheit, fahrenheitOffset), fahrenheitScalar),
            celsius => add(mul(celsius, fahrenheitScalar), fahrenheitOffset)));

    const gasMarkScalar = 14;
    const gasMarkOffset = 121;
    repository.add(
        new UnitConverter(
            domains.Temperature,
            UnitedKingdom,
            Imperial,
            "Gas Mark",
            "GM",
            celsiusConverter,
            gasMark => {
                if (lt(gasMark, new Fraction(3, 8))) {
                    return 107;
                } else if (lt(gasMark, new Fraction(3, 4))) {
                    return 121;
                } else {
                    gasMark = Math.round(gasMark.valueOf());
                    return add(mul(gasMark, gasMarkScalar), gasMarkOffset);
                }
            },
            celsius => {
                if (lt(celsius, 114)) {
                    return new Fraction(1, 4);
                } else if (lt(celsius, 128)) {
                    return new Fraction(1, 2);
                } else {
                    var gasMark = div(sub(celsius, gasMarkOffset), gasMarkScalar);
                    return Math.round(gasMark);
                }
            }));
};