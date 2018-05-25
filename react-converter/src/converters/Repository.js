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


    match(text, usage, maxItems=100) {

        const calculateQuality = (lowercaseText, matchingText, valueIfExact) => {
            if (lowercaseText == matchingText) {
                return valueIfExact
            }

            return (matchingText.length - lowercaseText.length) / matchingText.length
        }

        if (!text) {
            return []
        }

        const lowercaseWords = text.toLocaleLowerCase().split(/\s+/)

        return Array.from(
            new Seq(this._converterList).filter(x => x.unit.usages.includes(usage)).map(converter => {
                let quality = 0

                const domainName = converter.domain.detail.name.toLocaleLowerCase()
                const authorityName = converter.authority.detail.name.toLocaleLowerCase()
                const authorityCommonName = converter.authority.detail.commonName.toLocaleLowerCase()
                const systemName = converter.system.detail.name.toLocaleLowerCase()
                const unitSingular = converter.unit.detail.singular.toLocaleLowerCase()
                const unitPlural = converter.unit.detail.plural.toLocaleLowerCase()
                const unitSymbol = converter.unit.detail.symbol.toLocaleLowerCase()

                for (let lowercaseText of lowercaseWords) {
                    if (domainName.includes(lowercaseText)) {
                        quality += calculateQuality(lowercaseText, domainName, 10)
                    }
                    if (authorityName.includes(lowercaseText)) {
                        quality += calculateQuality(lowercaseText, authorityName, 10)
                    }
                    if (authorityCommonName.includes(lowercaseText)) {
                        quality += calculateQuality(lowercaseText, authorityCommonName, 10)
                    }
                    if (systemName.includes(lowercaseText)) {
                        quality += calculateQuality(lowercaseText, systemName, 10)
                    }
                    if (unitSingular.includes(lowercaseText)) {
                        quality += calculateQuality(lowercaseText, unitSingular, 100)
                    }
                    if (unitPlural.includes(lowercaseText)) {
                        quality += calculateQuality(lowercaseText, unitPlural, 100)
                    }
                    if (unitSymbol.includes(lowercaseText)) {
                        quality += calculateQuality(lowercaseText, unitSymbol, 100)
                    }
                }

                return {quality, converter}
            })
            .filter(x => x.quality !== 0)
            .sort((a, b) => a.quality == b.quality ? 0 : a.quality > b.quality ? -1 : 1)
            .take(maxItems)
            .map(x => x.converter))
    }
}