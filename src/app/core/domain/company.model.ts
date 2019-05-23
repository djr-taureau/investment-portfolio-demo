export interface Company {
    id: string;
    type: string; // enum
    data: any;
    sector: string[];
    score: number;
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
    percentOwnership: string;

    // Displayed in the company header under the description as a list.
    dealTeam: TeamMember[];

    // Displayed in the company header under the team members as a list.
    takeaways: Takeaway[];

    // Displayed in the company header with the list of takeaways.
    takeawayDate: string;

    // Displayed in the company header to the right of the takeaways.
    deployed: number;

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
}

export interface Tag {
    // List of tags under the company name in the header.
    id: string;
    name: string;
}

export interface TeamMember {
    id: string;
    name: string;
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
    current: number;
    yearOne: number;
    yearTwo: number;
    yearThree: number;
    exit: number;
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
