import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CompanyValuationComponent } from "./company-valuation.component";
import { CompanyValuationContainer } from "./company-valuation.container";

const COMPONENTS: any = [CompanyValuationContainer, CompanyValuationComponent];
const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyValuationContainer
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(MODULE_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyValuationModule {}
