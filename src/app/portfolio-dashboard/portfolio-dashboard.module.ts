import { CommonModule } from "@angular/common";
import { PortfolioDashboardActionBarModule } from "@app/portfolio-dashboard/action-bar/portfolio-dashboard.action-bar.module";
import { PortfolioDashboardFinancialComponent } from "@app/portfolio-dashboard/financial/portfolio-dashboard-financial.component";
import { PortfolioDashboardFinancialContainer } from "@app/portfolio-dashboard/financial/portfolio-dashboard-financial.container";
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
    PortfolioDashboardFinancialContainer
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
                component: PortfolioDashboardFinancialComponent
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
