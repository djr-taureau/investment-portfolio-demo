import { CompanyNotesComponent } from "./company-notes.component";
import { CompanyNotesContainer } from "./company-notes.container";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const COMPONENTS: any = [CompanyNotesContainer, CompanyNotesComponent];
const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyNotesContainer
    }
];
@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyNotesModule {}
