import { collectUnitConverters as collectButterConverters } from './butter'
import { collectUnitConverters as collectChickenEggConverters } from './chickenEggs'

export function collectUnitConverters() {
    return [
        ...collectButterConverters(),
        ...collectChickenEggConverters()
    ]
}