import { collectUnitConverters as collectCustomaryConverters } from './customary'
import { collectUnitConverters as collectUtensilConverters } from './utensils'
import { collectUnitConverters as collectFoodConverters } from './food'

export function collectUnitConverters() {
    return [
        ...collectCustomaryConverters(),
        ...collectUtensilConverters(),
        ...collectFoodConverters()
    ]
}