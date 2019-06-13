import { CompanyDashboardComponent } from "./company-dashboard.component";
import { CompanyDashboardContainer } from "./company-dashboard.container";
import { CompanySummaryCollapsedComponent } from "./company-summary/collapsed/company-summary-collapsed.component";
import { CompanySummaryContainer } from "./company-summary/company-summary.container";
import { CompanySummaryExpandedComponent } from "./company-summary/expanded/company-summary-expanded.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const COMPONENTS: any = [
    CompanyDashboardContainer,
    CompanyDashboardComponent,
    CompanySummaryContainer,
    CompanySummaryCollapsedComponent,
    CompanySummaryExpandedComponent
];

const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyDashboardContainer
    }
];

@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyDashboardModule {}
