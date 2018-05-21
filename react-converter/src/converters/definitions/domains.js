import {Domain, DomainDetails} from '../Domain'
import domainDetails from './domainDetails.json'
    
export const Length = new Domain("length", DomainDetails.fromJSON(domainDetails['length']))
export const Mass = new Domain("mass", DomainDetails.fromJSON(domainDetails['mass']))
export const Volume = new Domain("volume", DomainDetails.fromJSON(domainDetails['volume']))
export const Time = new Domain("time", DomainDetails.fromJSON(domainDetails['time']))
export const Temperature = new Domain("temperature", DomainDetails.fromJSON(domainDetails['time']))
