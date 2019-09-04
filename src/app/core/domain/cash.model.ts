export interface CompanyCash {
    id: string;
    cashRunwayInMonths: number;
    cashData: CashMonth[];
}

export interface CashMonth {
    quarter: number;
    year: number;
    amountInUSD: number;
}

export interface GetCompanyCashRequest {
    id: string;
    date: string;
}

export interface GetCompanyCashResponse {
    id: string;
    data: CompanyCash;
}
