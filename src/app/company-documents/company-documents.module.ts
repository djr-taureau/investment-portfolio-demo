import { CompanyDocumentsComponent } from "./company-documents.component";
import { CompanyDocumentsContainer } from "./company-documents.container";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const COMPONENTS: any = [CompanyDocumentsContainer, CompanyDocumentsComponent];
const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyDocumentsContainer
    }
];
@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyDocumentsModule {}
