import { CompanyInitiativesComponent } from "./company-initiatives.component";
import { CompanyInitiativesContainer } from "./company-initiatives.container";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";

const COMPONENTS: any = [CompanyInitiativesContainer, CompanyInitiativesComponent];
const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyInitiativesContainer
    }
];
@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyInitiativesModule {}
