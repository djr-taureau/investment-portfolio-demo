import { NgModule } from "@angular/core";
import { SlideoutInfrastructureModule } from "@core/slideout/slideout-infrastructure.module";
import { CompanyInfoComponent } from "./company-info.component";
import { CompanyInfoContainer } from "./company-info.container";
import { BoardMemberComponent } from "./board-member/board-member.component";
import { SharedModule } from "@shared/shared.module";

const MODULES = [SharedModule, SlideoutInfrastructureModule];
const COMPONENTS: any = [BoardMemberComponent, CompanyInfoContainer, CompanyInfoComponent];
@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class CompanyInfoModule {}
