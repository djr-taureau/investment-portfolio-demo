import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioDashboardComponent } from "./portfolio-dashboard.component";
import { PortfolioDashboardContainer } from "./portfolio-dashboard.container";

const COMPONENTS: any = [PortfolioDashboardContainer, PortfolioDashboardComponent];
const PORTFOLIO_DASHBOARD_ROUTES: Routes = [
    {
        path: "",
        component: PortfolioDashboardContainer
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(PORTFOLIO_DASHBOARD_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioDashboardModule {}
