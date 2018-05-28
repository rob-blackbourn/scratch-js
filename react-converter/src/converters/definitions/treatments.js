import {Treatment, TreatmentDetail} from '../Treatment'
import treatmentDetails from './_details/treatmentDetails.json'

export const None = Treatment.fromJSON("none", treatmentDetails)
export const SlicedThinly = Treatment.fromJSON("sliced-thinly", treatmentDetails)
export const Sliced = Treatment.fromJSON("sliced", treatmentDetails)
export const SlicedThickly = Treatment.fromJSON("sliced-thickly", treatmentDetails)
export const DicedFinely = Treatment.fromJSON("diced-finely", treatmentDetails)
export const Diced = Treatment.fromJSON("diced", treatmentDetails)
export const DicedRoughly = Treatment.fromJSON("diced-roughly", treatmentDetails)
export const GroundFinely = Treatment.fromJSON("ground-finely", treatmentDetails)
export const Ground = Treatment.fromJSON("ground", treatmentDetails)
export const GroundRoughly = Treatment.fromJSON("ground-roughly", treatmentDetails)
export const Halved = Treatment("halved", treatmentDetails)
export const Quartered = Treatment.fromJSON("quartered", treatmentDetails)
