import { collectUnitConverters as collectMetricConverters } from './metric'

export { collectDomainConverters } from './metric'

export function collectUnitConverters() {
    return [
        ...collectMetricConverters()
    ]
}

