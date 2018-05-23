import {collectUnitConverters as collectImperialUnitConverters} from './imperial'
import {collectUnitConverters as collectUtensilUnitConverters} from './utensils'

export function collectUnitConverters() {
    return [
        ...collectImperialUnitConverters(),
        ...collectUtensilUnitConverters()
    ]
}