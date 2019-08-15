import { MatIconModule } from "@angular/material";
import { CompanySummaryModule } from "@app/company-dashboard/company-summary/company-summary.module";
import { CompanyDocumentsTableComponent } from "@app/company-documents/company-documents-table/company-documents-table.component";
import { CompanyDocumentsTableContainer } from "@app/company-documents/company-documents-table/company-documents-table.container";
import { CompanyDocumentsComponent } from "./company-documents.component";
import { CompanyDocumentsContainer } from "./company-documents.container";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";

const COMPONENTS: any = [CompanyDocumentsContainer, CompanyDocumentsComponent, CompanyDocumentsTableContainer, CompanyDocumentsTableComponent];
const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyDocumentsContainer
    }
];
@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES), CompanySummaryModule, SharedModule, MatIconModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyDocumentsModule {}
