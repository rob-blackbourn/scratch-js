import {System, SystemDetails} from '../System'
import systemDetails from './_details/systemDetails.json'
    
export const Metric = new System("metric", SystemDetails.fromJSON(systemDetails['metric']))
export const Imperial = new System("imperial", SystemDetails.fromJSON(systemDetails['imperial']))
export const Customary = new System("customary", SystemDetails.fromJSON(systemDetails['customary']))
export const Utensils = new System("utensils", SystemDetails.fromJSON(systemDetails['utensils']))
export const ChickenEggs = new System("chicken-eggs", SystemDetails.fromJSON(systemDetails['chicken-eggs']))
export const Butter = new System("butter", SystemDetails.fromJSON(systemDetails['butter']))

