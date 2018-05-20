class DomainRepository {

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

export default class Repository {

    constructor(defaultClassification, defaultAuthority) {

        this._defaultClassification = defaultClassification;
        this._defaultAuthority = defaultAuthority;

        this._converters = new Map();
        this._domainConverters = new DomainRepository();
    }

    get defaultClassification() {
        return this._defaultClassification;
    }

    get defaultAuthority() {
        return this._defaultAuthority;
    }

    get converters() {
        return this._converters;
    }

    get domainConverters() {
        return this._domainConverters;
    }

    add(converter) {
        let convertersInDomain = this._converters.get(converter.domain);
        if (!convertersInDomain) {
            this._converters.set(converter.domain, convertersInDomain = new Map());
        }
        let convertersInAuthority = convertersInDomain.get(converter.authority);
        if (!convertersInAuthority) {
            convertersInDomain.set(converter.authority, convertersInAuthority = new Map());
        }
        let convertersInSystem = convertersInAuthority.get(converter.system);
        if (!convertersInSystem) {
            convertersInAuthority.set(converter.system, convertersInSystem = new Map());
        }
        convertersInSystem.set(converter.name, converter);
        return converter;
    }

    find(unitIdentifier) {
        let convertersInDomain = this._converters.get(unitIdentifier.domain);
        if (convertersInDomain) {
            let convertersInAuthority = convertersInDomain.get(unitIdentifier.authority);
            if (convertersInAuthority) {
                let convertersInSystem = convertersInAuthority.get(unitIdentifier.system);
                if (convertersInSystem) {
                    return convertersInSystem.get(unitIdentifier.name);
                }
            }
        }

        return undefined;
    }

    convert(converter, value, targetConverter) {
        if (converter.domain === targetConverter.domain) {
            return converter.convert(value, targetConverter);
        } else {
            var domainConverter = this._domainConverters.find(converter.domain, targetConverter.domain);
            if (domainConverter) {
                return domainConverter.convert(value, converter, targetConverter);
            }
        }
    }

    findAndConvert(fromUnitIdentifier, value, toUnitIdentifier) {
        const sourceConverter = this.find(fromUnitIdentifier);
        const targetConverter = this.find(toUnitIdentifier);
        return this.convert(sourceConverter, value, targetConverter);
    }
}