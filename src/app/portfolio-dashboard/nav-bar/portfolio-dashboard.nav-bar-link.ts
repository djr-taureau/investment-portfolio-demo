import { appRoutePaths } from "@app/app.routes";

export interface PortfolioDashboardNavBarLink {
    icon: string;
    label: string;
    route: string;
    enabled: boolean;
    itemcount?: number;
    showItemCount: boolean;
}

export const portfolioDashboardInvestmentNavBarLink = {
    icon: "assets/image/overview.svg",
    label: "Investment",
    route: appRoutePaths.portfolioDashboardInvestment,
    enabled: true,
    showItemCount: false
};

export const portfolioDashboardFinancialsNavBarLink = {
    icon: "assets/image/company.svg",
    label: "Financial",
    route: appRoutePaths.portfolioDashboardFinancials,
    enabled: true,
    showItemCount: false
};
