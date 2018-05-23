import { collectUnitConverters as collectMassConverters } from './mass'
import { collectUnitConverters as collectLengthConverters } from './length'
import { collectUnitConverters as collectVolumeConverters } from './volume'
import { collectUnitCOnverters as collectTemperatureConverters } from './temperature'

export function collectUnitConverters() {
    return [
        ...collectMassConverters(),
        ...collectLengthConverters(),
        ...collectVolumeConverters(),
        ...collectTemperatureConverters()
    ]
}