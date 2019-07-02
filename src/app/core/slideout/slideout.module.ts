import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { CompanyInfoModule } from "@core/slideout/company-info/company-info.module";
import { SlideoutInfrastructureModule } from "@core/slideout/slideout-infrastructure.module";
import { TakeawaysModule } from "@core/slideout/takeaways/takeaways.module";
import { MaterialModule } from "@shared/material/material.module";
import { TeamMemberListModule } from "./team-member-list/team-member-list.module";
import { TeamMemberDetailModule } from "./team-member-detail/team-member-detail.module";

const IMPORTS = [
    CommonModule,
    CompanyInfoModule,
    FlexLayoutModule,
    MaterialModule,
    RouterModule,
    TakeawaysModule,
    TeamMemberListModule,
    TeamMemberDetailModule
];

const EXPORTS = [SlideoutInfrastructureModule];

@NgModule({
    imports: IMPORTS,
    exports: EXPORTS
})
export class SlideoutModule {}
