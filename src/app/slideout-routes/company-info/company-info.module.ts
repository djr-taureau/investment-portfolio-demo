import { SlideoutModule } from "../../shared/slideout/slideout.module";
import { CompanyInfoComponent } from "./company-info.component";
import { CompanyInfoContainerComponent } from "./company-info.container.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BoardMemberComponent } from "./board-member/board-member.component";
import { SharedModule } from "app/shared/shared.module";

const COMPONENTS: any = [BoardMemberComponent, CompanyInfoContainerComponent, CompanyInfoComponent];
const COMPANY_INFO_ROUTES: Routes = [
    {
        path: "",
        outlet: "sidebar-outlet",
        component: CompanyInfoContainerComponent
    }
];
@NgModule({
    imports: [SharedModule, RouterModule.forChild(COMPANY_INFO_ROUTES), SlideoutModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class CompanyInfoModule {}
