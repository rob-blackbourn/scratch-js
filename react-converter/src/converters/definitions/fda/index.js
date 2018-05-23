import { collectUnitConverters as collectUtensilConverters } from './utensils'

export function collectUnitConverters() {
    return [
        ...collectUtensilConverters()
    ]
}