export default class Quantity {

    constructor(amount, originalUnitConverter, targetUnitConverter) {
        this.amount = amount
        this.originalUnitConverter = originalUnitConverter
        this.targetUnitConverter = targetUnitConverter
    }

    toString() {
        return `amount=${amount}, originalUnitConverter=${originalUnitConverter}, targetUnitConverter=${targetUnitConverter}`
    }
}