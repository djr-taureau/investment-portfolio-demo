import { ApiResponse } from "./api.model";

export interface Company {
    id: string;
    type: string; // enum
    data: any;
    sectors: Sector[];
    region: string;
    funds: Fund[];
    score: number;
    amountInvested: number;
    currentValuation: number;
    slackName: string;
    slackUrl: string;
    aka: string;
    headquarters: Address;
    founders: string[];
    foundedDate: string;
    website: string;
    stage: string;
    fiscalYearEnd: string;
    investingEntity: string;
    initialInvestmentDate: string;
    latestFollowOnDate: string;
    FDOwnership: string;
    boardMembers: BoardMember[];
    MOIC: number;
    IRR: number;
    logo: string;
    revenue?: CompanyRevenue[];

    ///////////////////////////////////////////////////////////////////
    // DASHBOARD HEADER SECTION
    ///////////////////////////////////////////////////////////////////

    // Displayed in the company header.
    name: string;

    // Displayed in the company header under the tags.
    description: string;

    // List of tags under the company name in the header as a list.
    tags: Tag[];

    // Displayed in the company header to the right of the tags.
    percentOwnership: number;

    // Displayed in the company header under the team members as a list.
    takeaways: string[];

    // Displayed in the company header with the list of takeaways.
    takeawayDate: string;

    // Displayed in the company header to the right of the takeaways.
    deployed: number;
    deployedTotal: number;

    // Displayed in the company header to the right of the deployed.
    valuation: ValuationDetail;

    ///////////////////////////////////////////////////////////////////
    // DASHBOARD BODY SECTION
    ///////////////////////////////////////////////////////////////////

    initiatives: CompanyInitiative[];
    companyUpdates: CompanyUpdate[];
}

export interface CompanyInitiative {
    id: string;
    name: string;
}

export interface CompanyUpdate {
    id: string;
    name: string;
}

export interface Sector {
    id: string;
    name: string;
    desription: string;
}

export interface Region {
    id: string;
    name: string;
    description: string;
}

export interface Fund {
    id: string;
    name: string;
    description: string;
}

export interface Tag {
    // List of tags under the company name in the header.
    id: string;
    name: string;
}

export interface Contact {
    id: string;
    companyName: string;
    firstName: string;
    lastName: string;
    avatar: string;
    slack: string;
    mobile: string;
    email: string;
    bio: string;
    postion: string;
}

export interface BoardMember {
    id?: string;
    name: string;
    sinceDate: string;
    company: string;
    phone: string;
    email: string;
    avatar: string;
}

export enum TeamMemberGroupTypes {
    DEAL = "DEAL",
    OPS = "OPS",
    PORTFOLIO = "PORTFOLIO",
    FINANCE = "FINANCE"
}

export interface Team {
    groups: TeamMemberGroup[];
}
export interface TeamMemberGroup {
    category: string; // of TeamMemberGroupTypes
    members: TeamMember[];
}
export interface TeamMember {
    id: string;
    companyName: string;
    firstName: string;
    lastName: string;
    initials?: string;
    avatar: string;
    slack: string;
    mobile: string;
    email: string;
    bio: string;
    position: string;
    companyRelationships: CompanyRelationship[];
    isLead?: boolean;
}

export enum CompanyRelationshipTypes {
    OTHER_COMPANY = "OTHER_COMPANY",
    COMPANY_COVERED = "COMPANY_COVERED",
    BOARD_SEAT = "BOARD_SEAT"
}
export interface CompanyRelationship {
    memberId: string;
    companyId: string;
    relationship: string; // one of CompanyRelationshipTypes
}

export interface Takeaway {
    id: string;
    content: string;
}

export interface CompanyRevenue {
    companyId: string;
    quarter: number;
    year: number;
    actual: boolean;
    revenue: number;
    PY: number;
    IC: number;
    budget: number;
    forecast: number;
}

export interface ValuationDetail {
    id: string;
    name: string;
    desc: string;
    entry: number;
    current: ValuationValue;
    yearOne: ValuationValue;
    yearTwo: ValuationValue;
    yearThree: ValuationValue;
    exit: ValuationValue;
}

export interface ValuationValue {
    totalValue: number;
    moic: number;
    irr: number;
}

// This interface supports the Initiative card
// in the Company Dashboard view
export interface CompanyInitiativeResponse {
    id: string;
    status: string;
    title: string;
    owner: string;
    description: string;
}

// This interface supports the Updates card
// in the Company Dashboard view
export interface CompanyUpdateResponse {
    id: string;
    status: string;
    title: string;
    owner: string;
    date: string;
}

// This interface is the API response for getting Company Revenue for the
// minimized and expanded cards on the Company Dashboard view for Revenue,
// EBITDA, Cash Burn, and the 4 original Placeholder KPIs
export interface CompanyRevenueResponse {
    companyId: string;
    // indicates if the value is a projected value
    projected: boolean;
    revenue: number;
    PY: number;
    IC: number;
    budget: number;
    forecast: number;
    // comment icon associated with table value
    // also shown on line chart
    comment: string;
    // icon in minimized card state
    confidence: string;
}

export interface GetAllCompaniesResponse extends ApiResponse {
    data: Company[];
}

export interface GetCompanyResponse extends ApiResponse {
    data: Company;
}

export interface Address {
    id: string;
    addressName: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    countryCodeISO: string;
    countryName: string;
    postal: string;
}

export interface GetAllTeamsResponse extends ApiResponse {
    data: {
        teams: TeamMemberGroup[];
    };
}
