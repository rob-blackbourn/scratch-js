import LocaleDetails, { Detail } from './LocaleDetails'

export class IngredientDetail extends Detail {
    
    constructor (singular, plural) {
        this.singular = singular
        this.plural = plural
    }

    toString() {
        return `singular=${this.singular}, plural=${this.plural}`
    }

    static fromJSON(json) {
        return Detail.fromJSON(json, x => new IngredientDetail(x.get("singular"), x.get("plural")))
    }
}

export class Ingredient extends LocaleDetails {
    constructor(key, details) {
        super(details)
        this.key = key
    }

    equals(other) {
        return this === other || (other instanceof Ingredient && this.key === other.key)
    }

    toString() {
        return `key=${this.key}, ${detail.toString()}`
    }

    static fromJSON(key, json) {
        return new Ingredient(key, IngredientDetail.fromJSON(json))
    }
}
