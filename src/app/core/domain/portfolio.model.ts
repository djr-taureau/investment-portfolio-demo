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
export interface PortfolioRelativePerformanceSeries {
    id: number;
    x: number;
    y: number;
    density: number;
    group: string;
}

export interface PortfolioRelativePerformance {
    series: PortfolioRelativePerformanceSeries[];
}

export interface PortfolioRelativePerformanceRequest {
    id: number;
    as_of_date: string;
    top: number;
    accumulator: string;
    by: string;
    scenario: string;
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

// export enum PortfolioGroupingType {
//      SECTOR= "SECTOR",
//      FX= "FX",
//      COUNTRY= "COUNTRY",
//      REGION= "REGION",
//      TYPE= "TYPE",
//      STAGE= "STAGE",
//      DEALLEAD= "DEALLEAD"
// }

export enum PortfolioGroupingType {
    SECTOR = "SECTOR",
    FX = "FX",
    COUNTRY = "COUNTRY",
    DEALLEAD = "DEALLEAD",
    REGION = "REGION",
    TYPE = "TYPE",
    STAGE = "STAGE"
}
export enum PortfolioPerformanceScenario {
    BUDGET = "BUDGET",
    FORECAST = "FORECAST",
    PRIORYEAR = "PRIORYEAR",
    PRIORQUARTER = "PRIORQUARTER",
    INVESTMENTCASE = "INVESTMENTCASE"
}
export enum PortfolioPerformanceAccumulator {
    UNREALIZED_VALUE = "UNREALIZED_VALUE",
    INCREASE_IN_TOTAL_VALUE = "INCREASE_IN_TOTAL_VALUE",
    REVENUE = "REVENUE"
}

export interface PortfolioExposure {
    id: string;
    metric: PortfolioMetricTypes;
    type: PortfolioGroupingType;
    label: string;
    portfolioValue: number;
    portfolioPercentage: number;
}
