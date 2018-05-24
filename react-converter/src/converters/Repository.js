import DomainRepository from './DomainRepository'
import { List, Seq } from 'immutable'

export default class Repository {

    constructor(defaultClassification, defaultAuthority) {

        this._defaultClassification = defaultClassification
        this._defaultAuthority = defaultAuthority

        this._converterTree = new Map()
        this._converterList = []
        this._domainConverters = new DomainRepository()

        this.domains = new Map()
        this.authorities = new Map()
        this.systems = new Map()
        this.units = new Map()
    }

    get defaultClassification() {
        return this._defaultClassification;
    }

    get defaultAuthority() {
        return this._defaultAuthority;
    }

    get converters() {
        return this._converterTree;
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
        return this.domains.values()
    }

    getAuthorities(domain) {
        let convertersInDomain = this._converterTree.get(domain.key);
        if (!convertersInDomain) {
            return []
        }
        const authorities = []
        for (let key of convertersInDomain.keys()) {
            const authority = this.authorities.get(key)
            authorities.push(authority)
        }
        return authorities
    }

    getSystems(domain, authority) {
        let convertersInDomain = this._converterTree.get(domain.key);
        if (!convertersInDomain) {
            return []
        }
        let convertersInAuthority = convertersInDomain.get(authority.key)
        if (!convertersInAuthority) {
            return []
        }
        const systems = []
        for (let key of convertersInAuthority.keys()) {
            const system = this.systems.get(key)
            systems.push(system)
        }
        return systems
    }

    getUnits(domain, authority, system) {
        let convertersInDomain = this._converterTree.get(domain.key);
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
            const unit = this.units.get(key)
            units.push(unit)
        }
        return units
        
    }

    add(converter) {

        this._converterList.push(converter)

        if (!this.domains.has(converter.domain.key)) {
            this.domains.set(converter.domain.key, converter.domain)
        }
        if (!this.authorities.has(converter.authority.key)) {
            this.authorities.set(converter.authority.key, converter.authority)
        }
        if (!this.systems.has(converter.system.key)) {
            this.systems.set(converter.system.key, converter.system)
        }
        if (!this.units.has(converter.unit.key)) {
            this.units.set(converter.unit.key, converter.unit)
        }

        let convertersInDomain = this._converterTree.get(converter.domain.key);
        if (!convertersInDomain) {
            this._converterTree.set(converter.domain.key, convertersInDomain = new Map());
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
        const domainKey = unitIdentifier.domain.key
        const authorityKey = unitIdentifier.authority.key
        const systemKey = unitIdentifier.system.key
        const unitKey = unitIdentifier.unit.key
        const converter = this.findByKey(domainKey, authorityKey, systemKey, unitKey)
        return converter
    }

    findByKey(domainKey, authorityKey, systemKey, unitKey) {
        let convertersInDomain = this._converterTree.get(domainKey)
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

    convert(converter, value, targetConverter, domainScalar) {
        if (converter.domain === targetConverter.domain) {
            return converter.convert(value, targetConverter)
        } else {
            var domainConverter = this._domainConverters.find(converter.domain, targetConverter.domain)
            if (domainConverter) {
                return domainConverter.convert(value, converter, targetConverter, domainScalar)
            }
        }
    }

    findAndConvert(fromUnitIdentifier, value, toUnitIdentifier, domainScalar) {
        const sourceConverter = this.find(fromUnitIdentifier)
        const targetConverter = this.find(toUnitIdentifier)
        return this.convert(sourceConverter, value, targetConverter, domainScalar)
    }


    match(text, usage) {

        const calculateQuality = (text, matchingText, valueIfExact) => {
            if (text == matchingText) {
                return valueIfExact
            }

            return (matchingText.length - text.length) / matchingText.length
        }

        return Array.from(
            new Seq(this._converterList).filter(x => x.unit.usages.includes(usage)).map(converter => {
                let quality = 0

                if (converter.domain.detail.name.includes(text)) {
                    quality += calculateQuality(text, converter.domain.detail.name, 10)
                }
                if (converter.authority.detail.name.includes(text)) {
                    quality += calculateQuality(text, converter.authority.detail.name, 10)
                }
                if (converter.authority.detail.commonName.includes(text)) {
                    quality += calculateQuality(text, converter.authority.detail.commonName, 10)
                }
                if (converter.system.detail.name.includes(text)) {
                    quality += calculateQuality(text, converter.system.detail.name, 10)
                }
                if (converter.unit.detail.singular.includes(text)) {
                    quality += calculateQuality(text, converter.unit.detail.singular, 100)
                }
                if (converter.unit.detail.plural.includes(text)) {
                    quality += calculateQuality(text, converter.unit.detail.plural, 100)
                }
                if (converter.unit.detail.symbol.includes(text)) {
                    quality += calculateQuality(text, converter.unit.detail.symbol, 100)
                }

                return {quality, converter}
            }).filter(x => x.quality !== 0).sortBy(x => 100 - Math.abs(x.converter.unit.order)).sortBy(x => x.quality).map(x => x.converter).reverse())
    }
}