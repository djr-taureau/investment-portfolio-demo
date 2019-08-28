import { AvailablePeriod } from "@core/domain/company.model";

export interface Portfolio {
    id: number;
    name: string;
    headquarters: string;
    funds: PortfolioFund[];
}

export interface PortfolioFund {
    totalFund: number;
    fundInception: number;
    name: string;
    // id: number;
    portfolio_id: number;
    availablePeriods: AvailablePeriod[];
    grossIRR: number;
}

export interface PortfolioInvestmentSummary {
    invested: number;
    approved: number;
    totalFund: number;
    totalValue: number;
    moic: number;
    grossIrr: number;
    private: number;
    public: number;
    jv: number;
    exited: number;
}
export interface PortfolioPerformanceChartDataRequest {
    id: string;
    date: string;
    metric_type;
}

export interface PortfolioExposureDataRequest {
    id: string;
    as_of: string;
    metric_type: string;
    by: string;
}

export enum PortfolioMetricTypes {
    EBITDA = "EBITDA",
    REVENUE = "REVENUE"
}

export enum PortfolioExposureType {
    SECTOR = "SECTOR",
    FX = "FX",
    COUNTRY = "COUNTRY",
    DEALLEAD = "DEALLEAD",
    REGION = "REGION",
    TYPE = "TYPE",
    STAGE = "STAGE"
}

export interface PortfolioExposure {
    id: string;
    metric: PortfolioMetricTypes;
    type: PortfolioExposureType;
    label: string;
    portfolioValue: number;
    portfolioPercentage: number;
}
