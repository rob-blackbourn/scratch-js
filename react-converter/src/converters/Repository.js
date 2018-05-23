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

export default class Repository {

    constructor(defaultClassification, defaultAuthority) {

        this._defaultClassification = defaultClassification
        this._defaultAuthority = defaultAuthority

        this._converters = new Map()
        this._domainConverters = new DomainRepository()

        this._domains = new Map()
        this._authorities = new Map()
        this._systems = new Map()
        this._units = new Map()
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

    addRange(converters) {
        for (let converter of converters) {
            try {
                this.add(converter);
            } catch (error) {
                console.log(error)
            }
        }
    }

    getDomains() {
        return this._domains.values()
    }

    getAuthorities(domain) {
        let convertersInDomain = this._converters.get(domain.key);
        if (!convertersInDomain) {
            return []
        }
        const authorities = []
        for (let key of convertersInDomain.keys()) {
            const authority = this._authorities.get(key)
            authorities.push(authority)
        }
        return authorities
    }

    getSystems(domain, authority) {
        let convertersInDomain = this._converters.get(domain.key);
        if (!convertersInDomain) {
            return []
        }
        let convertersInAuthority = convertersInDomain.get(authority.key)
        if (!convertersInAuthority) {
            return []
        }
        const systems = []
        for (let key of convertersInAuthority.keys()) {
            const system = this._systems.get(key)
            systems.push(system)
        }
        return systems
    }

    getUnits(domain, authority, system) {
        let convertersInDomain = this._converters.get(domain.key);
        if (!convertersInDomain) {
            return []
        }
        let convertersInAuthority = convertersInDomain.get(authority.key)
        if (!convertersInAuthority) {
            return []
        }
        let convertersInSystem = convertersInAuthority.get(system.key)
        if (!convertersInSystem) {
            return []
        }
        const units = []
        for (let key of convertersInSystem.keys()) {
            const unit = this._units.get(key)
            units.push(unit)
        }
        return units
        
    }

    add(converter) {

        if (!this._domains.has(converter.domain.key)) {
            this._domains.set(converter.domain.key, converter.domain)
        }
        if (!this._authorities.has(converter.authority.key)) {
            this._authorities.set(converter.authority.key, converter.authority)
        }
        if (!this._systems.has(converter.system.key)) {
            this._systems.set(converter.system.key, converter.system)
        }
        if (!this._units.has(converter.unit.key)) {
            this._units.set(converter.unit.key, converter.unit)
        }

        let convertersInDomain = this._converters.get(converter.domain.key);
        if (!convertersInDomain) {
            this._converters.set(converter.domain.key, convertersInDomain = new Map());
        }
        let convertersInAuthority = convertersInDomain.get(converter.authority.key);
        if (!convertersInAuthority) {
            convertersInDomain.set(converter.authority.key, convertersInAuthority = new Map());
        }
        let convertersInSystem = convertersInAuthority.get(converter.system.key);
        if (!convertersInSystem) {
            convertersInAuthority.set(converter.system.key, convertersInSystem = new Map());
        }
        convertersInSystem.set(converter.unit.key, converter);
        return converter;
    }

    find(unitIdentifier) {
        try {
            const domainKey = unitIdentifier.domain.key
            const authorityKey = unitIdentifier.authority.key
            const systemKey = unitIdentifier.system.key
            const unitKey = unitIdentifier.unit.key
            const converter = this.findByKey(domainKey, authorityKey, systemKey, unitKey)
            return converter
        } catch (error) {
            console.log(error)
        }
    }

    findByKey(domainKey, authorityKey, systemKey, unitKey) {
        let convertersInDomain = this._converters.get(domainKey)
        if (convertersInDomain) {
            let convertersInAuthority = convertersInDomain.get(authorityKey)
            if (convertersInAuthority) {
                let convertersInSystem = convertersInAuthority.get(systemKey)
                if (convertersInSystem) {
                    return convertersInSystem.get(unitKey)
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
        const sourceConverter = this.find(fromUnitIdentifier)
        const targetConverter = this.find(toUnitIdentifier)
        return this.convert(sourceConverter, value, targetConverter)
    }
}