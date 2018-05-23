import {collectUnitConverters as collectChickenEggConverters} from './chickenEggs'

export function collectUnitConverters() {

    return [
        ...collectChickenEggConverters()
    ]
}