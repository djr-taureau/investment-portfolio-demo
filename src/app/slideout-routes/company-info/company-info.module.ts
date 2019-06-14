import { CompanyInfoComponent } from "./company-info.component";
import { CompanyInfoContainer } from "./company-info.container";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardMemberComponent } from "./board-member/board-member.component";
import { SharedModule } from "app/shared/shared.module";

const COMPONENTS: any = [BoardMemberComponent, CompanyInfoContainer, CompanyInfoComponent];
const COMPANY_INFO_ROUTES: Routes = [
    {
        path: "",
        outlet: "sidebar-outlet",
        component: CompanyInfoContainer
    }
];
@NgModule({
    imports: [SharedModule, RouterModule.forChild(COMPANY_INFO_ROUTES)],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyInfoModule {}
