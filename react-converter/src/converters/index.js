import UnitConverter, {UnitIdentifier} from './UnitConverter';
import Repository from './Repository';
import createUnits from './definitions';

export default () => {
    const repository = new Repository();
    createUnits(repository);
    return repository;
}

export {UnitConverter, UnitIdentifier}