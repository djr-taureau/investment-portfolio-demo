import { CommonModule } from "@angular/common";
import { PortfolioDashboardActionBarModule } from "@app/portfolio-dashboard/action-bar/portfolio-dashboard.action-bar.module";
import { PortfolioEbitdaDetailContainer } from "@app/portfolio-dashboard/financial/ebitda/portfolio-ebitda-detail.container";
import { FxExposureContainer } from "@app/portfolio-dashboard/financial/fx-exposure/fx-exposure.container";
import { PortfolioDashboardFinancialComponent } from "@app/portfolio-dashboard/financial/portfolio-dashboard-financial.component";
import { PortfolioDashboardFinancialContainer } from "@app/portfolio-dashboard/financial/portfolio-dashboard-financial.container";
import { RelativePerformanceComponent } from "@app/portfolio-dashboard/financial/relative-performance/relative-performance.component";
import { RelativePerformanceContainer } from "@app/portfolio-dashboard/financial/relative-performance/relative-performance.container";
import { PorfolioRevenueDetailContainer } from "@app/portfolio-dashboard/financial/revenue/porfolio-revenue-detail.container";
import { SectorExposureContainer } from "@app/portfolio-dashboard/financial/sector-exposure/sector-exposure.container";
import { PortfolioDashboardInvestmentComponent } from "@app/portfolio-dashboard/investment/portfolio-dashboard-investment.component";
import { PortfolioDashboardNavBarModule } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar.module";
import { SharedModule } from "@shared/shared.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioDashboardComponent } from "./portfolio-dashboard.component";
import { PortfolioDashboardContainer } from "./portfolio-dashboard.container";

const COMPONENTS: any = [
    PortfolioDashboardContainer,
    PortfolioDashboardComponent,
    PortfolioDashboardInvestmentComponent,
    PortfolioDashboardFinancialComponent,
    PortfolioDashboardFinancialContainer,
    PorfolioRevenueDetailContainer,
    PortfolioEbitdaDetailContainer,
    FxExposureContainer,
    SectorExposureContainer,
    RelativePerformanceComponent,
    RelativePerformanceContainer
];
const PORTFOLIO_DASHBOARD_ROUTES: Routes = [
    {
        path: "",
        component: PortfolioDashboardContainer,
        children: [
            {
                path: "",
                redirectTo: "investment",
                pathMatch: "full"
            },
            {
                path: "investment",
                component: PortfolioDashboardInvestmentComponent
            },
            {
                path: "financials",
                component: PortfolioDashboardFinancialContainer
            }
        ]
    }
];
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(PORTFOLIO_DASHBOARD_ROUTES),
        SharedModule,
        PortfolioDashboardNavBarModule,
        PortfolioDashboardActionBarModule
    ],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioDashboardModule {}
