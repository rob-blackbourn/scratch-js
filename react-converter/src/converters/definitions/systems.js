import {System, SystemDetail} from '../System'
import systemDetails from './_details/systemDetails.json'
    
export const Metric = new System("metric", SystemDetail.fromJSON(systemDetails['metric']))
export const Imperial = new System("imperial", SystemDetail.fromJSON(systemDetails['imperial']))
export const Customary = new System("customary", SystemDetail.fromJSON(systemDetails['customary']))
export const Utensils = new System("utensils", SystemDetail.fromJSON(systemDetails['utensils']))
export const ChickenEggs = new System("chicken-eggs", SystemDetail.fromJSON(systemDetails['chicken-eggs']))
export const Butter = new System("butter", SystemDetail.fromJSON(systemDetails['butter']))

