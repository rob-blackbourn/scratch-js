import LocaleDetails from './LocaleDetails'

export class DomainDetails {

    constructor (name) {
        this._name = name
    }

    get name() {
        return this._name
    }

    toString() {
        return `name=${this.name}`
    }

    static fromJSON(json) {
        const details = {}
        for (let key in json) {
            const value = json[key]
            details[key] = new DomainDetails(value["name"])
        }
        return details
    }
}

export class Domain extends LocaleDetails {
    constructor(key, details) {
        super(details)
        this._key = key
    }

    static defaultLocale = navigator.language

    get key() {
        return this._key
    }

    equals(other) {
        return this === other || (other instanceof Domain && this.key === other.key)
    }
}
