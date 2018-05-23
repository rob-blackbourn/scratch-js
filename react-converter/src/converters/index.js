import UnitConverter, {UnitIdentifier} from './UnitConverter';
import Repository from './Repository';
import { collectUnitConverters, collectDomainConverters } from './definitions';

export default () => {
    const repository = new Repository();
    const unitConverters = collectUnitConverters()
    const domainConverters = collectDomainConverters()
    repository.addRange(unitConverters)
    repository.domainConverters.addRange(domainConverters)
    return repository;
}

export {UnitConverter, UnitIdentifier}