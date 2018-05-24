import { Authority, AuthorityDetail } from '../Authority'
import authorityDetails from './_details/authorityDetails.json'

export const Australia = new Authority("australia", AuthorityDetail.fromJSON(authorityDetails['australia']))
export const Canada = new Authority("canada", AuthorityDetail.fromJSON(authorityDetails['canada']))
export const EuropeanUnion = new Authority("europe", AuthorityDetail.fromJSON(authorityDetails['europe']))
export const FederalDrugAdministration = new Authority("fda", AuthorityDetail.fromJSON(authorityDetails['fda']))
export const Japan = new Authority("japan", AuthorityDetail.fromJSON(authorityDetails['japan']))
export const NewZealand = new Authority("nz", AuthorityDetail.fromJSON(authorityDetails['nz']))
export const SystemInternational = new Authority("si", AuthorityDetail.fromJSON(authorityDetails['si']))
export const UnitedKingdom = new Authority("uk", AuthorityDetail.fromJSON(authorityDetails['uk']))
export const UnitedStates = new Authority("us", AuthorityDetail.fromJSON(authorityDetails['us']))
