import { Authority, AuthorityDetails } from '../Authority'
import authorityDetails from './authorityDetails.json'

export const Australia = new Authority("australia", AuthorityDetails.fromJSON(authorityDetails['australia']))
export const Canada = new Authority("canada", AuthorityDetails.fromJSON(authorityDetails['canada']))
export const EuropeanUnion = new Authority("europe", AuthorityDetails.fromJSON(authorityDetails['europe']))
export const FederalDrugAdministration = new Authority("fda", AuthorityDetails.fromJSON(authorityDetails['fda']))
export const Japan = new Authority("japan", AuthorityDetails.fromJSON(authorityDetails['japan']))
export const NewZealand = new Authority("nz", AuthorityDetails.fromJSON(authorityDetails['nz']))
export const SystemInternational = new Authority("si", AuthorityDetails.fromJSON(authorityDetails['si']))
export const UnitedKingdom = new Authority("uk", AuthorityDetails.fromJSON(authorityDetails['uk']))
export const UnitedStates = new Authority("us", AuthorityDetails.fromJSON(authorityDetails['us']))
