import { collectUnitConverters as collectFoodConverters } from './food'

export function collectUnitConverters() {
    return [
        ...collectFoodConverters()
    ]
}