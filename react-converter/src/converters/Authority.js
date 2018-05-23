import LocaleDetails from './LocaleDetails'

export class AuthorityDetails {
    
    constructor (name, commonName) {
        this.name = name
        this.commonName = commonName
    }

    toString() {
        return `name=${this.name}, commonName=${this.commonName}`
    }

    static fromJSON(json) {
        const details = {}
        for (let key in json) {
            const value = json[key]
            details[key] = new AuthorityDetails(value["name"], value["commonName"])
        }
        return details
    }
}

export class Authority extends LocaleDetails {
    constructor(key, details) {
        super(details)
        this.key = key
    }

    equals(other) {
        return this === other || (other instanceof Authority && this.key === other.key)
    }

    toString() {
        const localeDetail = this.localeDetail()
        return `key=${this.key}, ${localeDetail.toString()}`
    }
}
