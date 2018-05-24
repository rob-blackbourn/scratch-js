import LocaleDetails from './LocaleDetails'

export class DomainDetail {

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
            details[key] = new DomainDetail(value["name"])
        }
        return details
    }
}

export class Domain extends LocaleDetails {
    constructor(key, details) {
        super(details)
        this.key = key
    }

    equals(other) {
        return this === other || (other instanceof Domain && this.key === other.key)
    }

    toString() {
        const localeDetail = this.localeDetail()
        return `key=${this.key}, ${localeDetail.toString()}`
    }

    static Empty = new Domain('', {})
}
