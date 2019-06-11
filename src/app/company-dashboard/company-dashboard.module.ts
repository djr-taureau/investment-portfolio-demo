// import { CommonModule } from "@angular/common";
import { CompanyDashboardComponent } from "./company-dashboard.component";
import { CompanyDashboardContainer } from "./company-dashboard.container";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const COMPONENTS: any = [CompanyDashboardContainer, CompanyDashboardComponent];
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
