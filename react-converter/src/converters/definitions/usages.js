import { Usage, UsageDetail } from '../Usage'
import usageDetails from './_details/usageDetails.json'
    
export const Science = new Usage("science", UsageDetail.fromJSON(usageDetails['science']))
export const Cookery = new Usage("cookery", UsageDetail.fromJSON(usageDetails['cookery']))