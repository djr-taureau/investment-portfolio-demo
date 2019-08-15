import { CurrencyType } from "@core/domain/enum/currency-type.enum";
import { Initiative } from "@core/domain/initiative.model";
import { ApiResponse } from "./api.model";

export interface AvailablePeriod {
    // quarter: string;
    // year: number;
    financialQuarter: number;
    date: string;
    isProjection?: boolean;
}
export enum CompanyTypeEnum {
    PUBLIC = "PUBLIC",
    PRIVATE = "PRIVATE",
    JOINT_VENTURE = "JV",
    EXITED = "EXITED"
}

export enum ScenarioNameEnum {
    ACTUAL = "actual",
    ICFOLLOWON1 = "icFollowOn1",
    ICFOLLOWON2 = "icFollowOn2",
    ICINITIAL = "icInitial",
    YEARPLUS1 = "valuationForecast"
}

export interface Company {
    id: string;
    type: CompanyTypeEnum; // enum
    defaultCurrency: CurrencyType;
    data: any;
    approved: number;
    sectors: Sector[];
    region: string;
    country: string; // this is an ISO alpha-3 value EG: USA GBR
    countryISO2?: string; // alpha-2 for getting flag
    countryName?: string; // country name for display
    funds: Fund[];
    fund: string;
    lastFollowOn: string;
    internalTicker: string;
    score: number;
    invested: number;
    totalValue: number;
    teamLead: string;
    slackName: string;
    slackUrl: string;
    aka: string;
    ceo: string;
    revenueStage: string;
    headquarters: Address;
    founders: string[];
    foundedDate: string;
    website: string;
    stage: string;
    fiscalYearEnd: FiscalYearEnd;
    investingEntity: string;
    initialInvestment: string;
    latestFollowOnDate: string;
    fdOwnership: string;
    boardMembers: BoardMember[];
    moic: number;
    irr: number;
    logo: string;
    revenue?: RevenueSeries[];
    availablePeriods: AvailablePeriod[];

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
    // valuation: ValuationDetail;

    ///////////////////////////////////////////////////////////////////
    // DASHBOARD BODY SECTION
    ///////////////////////////////////////////////////////////////////

    initiatives: CompanyInitiative[];
    companyUpdates: CompanyUpdate[];
}

export interface FiscalYearEnd {
    day: string;
    month: string;
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
    id?: string;
    name?: string;
    description?: string;

    // FK to the parent company.
    companyId: string;
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

export interface Person {
    id: string;
    firstName: string;
    lastName: string;
}
export interface Contact extends Person {
    companyName: string;
    avatar: string;
    slack: string;
    mobil: string;
    email: string;
    bio: string;
    position: string;
}

export interface BoardMember {
    id?: string;
    CompanyLegalName: string;
    CompanyName: string;
    PortCoID: string;
    TeamName: string;
    name: string;
    sinceDate: string;
    company: string;
    phone: string;
    mobile: string;
    email: string;
    avatar: string;
    bio: string;
}

export enum TeamMemberGroupTypes {
    DEAL = "Deal",
    OPS = "OPS",
    PORTFOLIO = "Portfolio",
    FINANCE = "Finance",
    LEGAL = "Legal"
}

export interface Team {
    groups: TeamMemberGroup[];
}
export interface TeamMemberGroup {
    id?: string;
    companyId?: string;
    category: string; // of TeamMemberGroupTypes
    members: TeamMember[];
}
export interface TeamMember {
    id: string;
    companyName: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    initials?: string;
    avatar: string;
    slack: string;
    mobile: string;
    email: string;
    bio: string;
    position: string;
    companyRelationships: CompanyRelationship[];
    teamLead: boolean;
    boardMember: boolean;
}

export enum CompanyRelationshipTypes {
    OTHER_COMPANY = "OTHER_COMPANY",
    COMPANY_COVERED = "COMPANY_COVERED",
    BOARD_SEAT = "BOARD_SEAT",
    LEAD = "LEAD"
}
export interface CompanyRelationship {
    memberId: string;
    companyId: string;
    companyLogo?: string;
    companyName?: string;
    relationship: string; // one of CompanyRelationshipTypes
}

export interface Takeaway {
    id: string;
    content: string;
}

/**
 * Holds the graph values
 */
export interface RevenueSeriesGraphData {
    date: Date;
    value: number;
}

export interface RevenuePeriod {
    series_quarters: any[];
    series_years: any[];
}

/**
 * Holds the yearly and quarterly sets of data for graphs
 * These are calculated set based on yearly summation or by quarter
 */
export interface RevenueSeriesGraphSet {
    usd: {
        yearly: RevenueSeriesGraphData[];
        quarterly: RevenueSeriesGraphData[];
    };
    native: {
        yearly: RevenueSeriesGraphData[];
        quarterly: RevenueSeriesGraphData[];
    };
}

/**
 * Data in the data property of the API response
 */
export interface RevenueSeriesData {
    date: string;
    financialQuarter: number;
    amountInNative: number;
    amountInUSD: number;
    projection: boolean;
}

/**
 * Extended version of the response from the API
 * Includes properties to hold all of the presentation
 * level data. These are generated on the service call
 * response.
 */
export interface RevenueSeries {
    name: string;
    displayOrder: number;
    isScenario: boolean;
    scenarioName: string;
    data: RevenueSeriesData[];
    vsPYTotalUSD?: number; // vsPY total value on summary chart USD
    vsPYTotalNative?: number; // vsPY total value on summary chart Native
    vsBudTotalUSD?: number; // vsBud total value on summary chart USD
    vsBudTotalNative?: number; // vsBud total value on summary chart Native
    vsICTotalUSD?: number; // vsIC total value on summary chart USD
    vsICTotalNative?: number; // vsIC total value on summary chart Native
    totalRevenueUSD?: number; // total value on summary chart USD
    totalRevenueNative?: number; // total value on summary chart Native
    seriesGraphSet?: RevenueSeriesGraphSet;
}

export interface TopLineValuationData {
    totalValue: number;
    moic: number;
    irr: number;
}
export interface TopLineValuation {
    current: TopLineValuationData;
    yearPlus1: TopLineValuationData;
    exit: TopLineValuationData;
}

export interface ValuationDetailData {
    id: string;
    reportingPeriod: string;
    approved: number;
    companyEquityValue: number;
    invested: number;
    irr: number;
    moic: number;
    name: string;
    ownership: number;
    realizedValue: number;
    scenarioTypeID: number;
    sequence: number;
    totalValue: number;
    unrealizedValue: number;
}
export interface ValuationDetail {
    icInitial: ValuationDetailData;
    icFollowOn1: ValuationDetailData;
    actual: ValuationDetailData;
    valuationForecast: ValuationDetailData;
    exit: ValuationDetailData;
}
export interface Valuation {
    companyId?: string;
    topLineValuations: TopLineValuation;
    valuationDetail: ValuationDetail;
}

export class ValuationTableModel {
    label: any;
    icInitial: any;
    icFollowOn1: any;
    actual: any;
    valuationForecast: any;
    exit: any;
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

export interface RevenueSeriesData {
    date: string;
    financialQuarter: number;
    amountInNative: number;
    amountInUSD: number;
    projection: boolean;
}
export interface RevenueSeries {
    name: string;
    displayOrder: number;
    isScenario: boolean;
    scenarioName: string;
    data: RevenueSeriesData[];
}

// TODO: TJM: Are you using this???
// export interface CompanyRevenueRequest {
//     companyId: string;
//     currency: string;
//     timeFrame: string;
//     endDate: string;
// }

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

export interface GetAllCompanyInitiativesResponse extends ApiResponse {
    data: Initiative[];
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

export interface GetTeamMemberResponse extends ApiResponse {
    data: TeamMember;
}

export interface CompanyRevenueRequest {
    id: string;
    date: string;
}
