export default class Constituent {

    constructor(quantity, processedIngredient) {
        this.quantity = quantity
        this.processedIngredent = processedIngredient
    }

    toString() {
        return `quantity=${this.quantity}, processedIngredient=${this.processedIngredient}`
    }
}