import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioDashboardComponent } from "./portfolio-dashboard.component";
import { PortfolioDashboardContainerComponent } from "./portfolio-dashboard.container.component";

const COMPONENTS: any = [PortfolioDashboardContainerComponent, PortfolioDashboardComponent];
const PORTFOLIO_DASHBOARD_ROUTES: Routes = [
    {
        path: "",
        component: PortfolioDashboardContainerComponent
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(PORTFOLIO_DASHBOARD_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioDashboardModule {}
