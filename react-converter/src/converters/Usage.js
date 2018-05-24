import LocaleDetails from './LocaleDetails'

export class UsageDetail {
    
    constructor (name) {
        this.name = name
    }

    toString() {
        return `name=${this.name}`
    }

    static fromJSON(json) {
        const details = {}
        for (let key in json) {
            const value = json[key]
            details[key] = new UsageDetail(value["name"])
        }
        return details
    }
}

export class Usage extends LocaleDetails {
    constructor(key, details) {
        super(details)
        this.key = key
    }

    equals(other) {
        return this === other || (other instanceof Usage && this.key === other.key)
    }

    toString() {
        const localeDetail = this.localeDetail()
        return `key=${this.key}, name=${localeDetail.name}`
    }
}
