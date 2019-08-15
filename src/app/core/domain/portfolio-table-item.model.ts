import { CompanyTypeEnum, Sector } from "./company.model";

export class PortfolioTableItem {
    logo: string;
    companyId: string;
    companyName: string;
    teamLeadAvatar: string;
    teamLeadName: string;
    sectors: string[];
    sectorsAdditional?: { value: string; visible: boolean };
    sectorsGroup?: string;
    region: string;
    countryISO: string;
    country: string;
    invested: number;
    investedGroup?: string;
    totalValue: number;
    valueGroup?: string;
    moic: number;
    moicGroup?: string;
    irr: number;
    irrGroup?: string;
    type: CompanyTypeEnum;
}
