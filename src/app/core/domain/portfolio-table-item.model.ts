import { Sector } from "./company.model";

export class PortfolioTableItem {
    logo: string;
    companyId: string;
    companyName: string;
    teamLeadAvatar: string;
    teamLeadName: string;
    sectors: string[];
    sectorsAdditional?: { value: string; visible: boolean };
    region: string;
    countryFlag: string;
    country: string;
    amountInvested: number;
    currentValuation: number;
    MOIC: number;
    IRR: number;
}
