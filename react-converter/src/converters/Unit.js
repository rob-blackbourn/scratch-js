import LocaleDetails from './LocaleDetails'

export class UnitDetail {
    
    constructor (singular, plural, symbol) {
        this.singular = singular
        this.plural = plural
        this.symbol = symbol
    }

    toString() {
        return `singular=${this.singular}, plural=${this.plural}, symbol=${this.symbol}`
    }

    static fromJSON(json) {
        const details = {}
        for (let key in json) {
            const value = json[key]
            details[key] = new UnitDetail(value["singular"], value["plural"], value["symbol"])
        }
        return details
    }
}

export class Unit extends LocaleDetails {
    constructor(key, order, usages, details) {
        super(details)
        this.key = key
        this.order = order
        this.usages = usages
    }

    equals(other) {
        return this === other || (other instanceof Unit && this.key === other.key)
    }

    toString() {
        const localeDetail = this.localeDetail()
        return `key=${this.key}, ${localeDetail.toString()}, order=${this.order}`
    }
}
