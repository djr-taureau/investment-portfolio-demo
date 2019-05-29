import { CommonModule } from "@angular/common";
import { SharedModule } from "../../shared/shared.module";
import { CompanyInfoComponent } from "./company-info.component";
import { CompanyInfoContainerComponent } from "./company-info.container.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MaterialModule } from "../../shared/material/material.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const COMPONENTS: any = [CompanyInfoContainerComponent, CompanyInfoComponent];
const COMPANY_INFO_ROUTES: Routes = [
    {
        path: "",
        outlet: "sidebar-outlet",
        component: CompanyInfoContainerComponent
    }
];
@NgModule({
    imports: [CommonModule, FlexLayoutModule, RouterModule.forChild(COMPANY_INFO_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyInfoModule {}
