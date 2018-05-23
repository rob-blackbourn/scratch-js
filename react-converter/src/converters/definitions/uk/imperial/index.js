import { collectUnitConverters as collectMassUnitConverters } from './mass';
import { collectUnitConverters as collectLengthUnitConverters } from './length';
import { collectUnitConverters as collectVolumeUnitConverters }  from './volume';
import { collectUnitConverters as collectTemperaturUnitConverters } from './temperature'

export function collectUnitConverters() {
    return [
        ...collectMassUnitConverters(),
        ...collectLengthUnitConverters(),
        ...collectVolumeUnitConverters(),
        ...collectTemperaturUnitConverters()
    ]
}
