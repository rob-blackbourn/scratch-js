export default class ProcessedIngredient {

    constructor(ingredient, treatment, density) {
        this.ingredient = ingredient
        this.treatment = treatment
        this.density = density
    }

    equals(other) {
        return other === this || (
            other instanceof ProcessedIngredient &&
            this.ingredient.key === other.ingredient.key &&
            this.treatment.key == other.treatment.key
        )
    }

    toString() {
        return `ingredient=${this.ingredient.toString()}, treatment=${this.treatment.toString()}, density=${this.density}`
    }
}