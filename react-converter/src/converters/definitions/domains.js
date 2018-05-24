import {Domain, DomainDetail} from '../Domain'
import domainDetails from './_details/domainDetails.json'
    
export const Length = new Domain("length", DomainDetail.fromJSON(domainDetails['length']))
export const Mass = new Domain("mass", DomainDetail.fromJSON(domainDetails['mass']))
export const Volume = new Domain("volume", DomainDetail.fromJSON(domainDetails['volume']))
export const Time = new Domain("time", DomainDetail.fromJSON(domainDetails['time']))
export const Temperature = new Domain("temperature", DomainDetail.fromJSON(domainDetails['time']))
