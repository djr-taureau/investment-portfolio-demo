import { CompanyFinancialsComponent } from "./company-financials.component";
import { CompanyFinancialsContainer } from "./company-financials.container";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const COMPONENTS: any = [CompanyFinancialsContainer, CompanyFinancialsComponent];
const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyFinancialsContainer
    }
];
@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyFinancialsModule {}
