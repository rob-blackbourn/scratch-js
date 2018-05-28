import LocaleDetails, { Detail } from './LocaleDetails'

export class TreatmentDetail extends Detail {
    
    constructor (name) {
        this.name = name
    }

    toString() {
        return `name=${this.name}`
    }

    static fromJSON(json) {
        return Detail.fromJSON(json, x => TreatmentDetail(x.get("name")))
    }
}

export class Treatment extends LocaleDetails {
    constructor(key, details) {
        super(details)
        this.key = key
    }

    equals(other) {
        return this === other || (other instanceof Treatment && this.key === other.key)
    }

    toString() {
        return `key=${this.key}, ${detail.toString()}`
    }

    static fromJSON(key, json) {
        return new Treatment(key, TreatmentDetail.fromJSON(json[key]))
    }
}
