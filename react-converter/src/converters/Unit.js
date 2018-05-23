import LocaleDetails from './LocaleDetails'

export class UnitDetails {
    
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
            details[key] = new UnitDetails(value["singular"], value["plural"], value["symbol"])
        }
        return details
    }
}

export class Unit extends LocaleDetails {
    constructor(key, details) {
        super(details)
        this.key = key
    }

    equals(other) {
        return this === other || (other instanceof Unit && this.key === other.key)
    }

    toString() {
        const localeDetail = this.localeDetail()
        return `key=${this.key}, ${localeDetail.toString()}`
    }
}
