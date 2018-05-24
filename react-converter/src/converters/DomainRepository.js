export default class DomainRepository {

    constructor() {
        this._domainConverters = [];
    }

    get domainConverters() {
        return this._domainConverters;
    }

    add(domainConverter) {
        this._domainConverters.push(domainConverter);
        return domainConverter;
    }
    
    addRange(converters) {
        for (let converter of converters) {
            this.add(converter);
        }
    }

    find(sourceDomain, targetDomain) {
        for (var index = 0; index < this._domainConverters.length; ++index) {
            var domainConverter = this._domainConverters[index];
            if ((sourceDomain === domainConverter.sourceConverter.domain && targetDomain === domainConverter.targetConverter.domain)
                || (sourceDomain === domainConverter.targetConverter.domain && targetDomain === domainConverter.sourceConverter.domain)) {
                return domainConverter;
            }
        }
    }
}