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
    id: number;
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
