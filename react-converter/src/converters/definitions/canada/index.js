import { collectUnitConverters as collectFoodConverters } from './food'
import { collectUnitConverters as collectUtensilConverters} from './utensils'

export function collectUnitConverters() {
    return [
        ...collectFoodConverters(),
        ...collectUtensilConverters()
    ]
}