import { collectUnitConverters as collectSiConverters, collectDomainConverters } from './si'
import { collectUnitConverters as collectAustralianConverters } from './australia'
import { collectUnitConverters as collectCanadianConverters } from './canada'
import { collectUnitConverters as collectEuropeanConverters } from './europe'
import { collectUnitConverters as collectFdaConverters } from './fda'
import { collectUnitConverters as collectJapaneseConverters } from './japan'
import { collectUnitConverters as collectNewZealandConverters } from './nz'
import { collectUnitConverters as collectUkConverters } from './uk'
import { collectUnitConverters as collectUsConverters } from './us'

export function collectUnitConverters() {
    return [
        ...collectSiConverters(),
        ...collectAustralianConverters(),
        ...collectCanadianConverters(),
        ...collectEuropeanConverters(),
        ...collectFdaConverters(),
        ...collectJapaneseConverters(),
        ...collectNewZealandConverters(),
        ...collectUkConverters(),
        ...collectUsConverters()
    ]
}

export { collectDomainConverters }
