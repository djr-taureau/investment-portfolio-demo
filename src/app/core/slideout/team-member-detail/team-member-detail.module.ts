import { NgModule } from "@angular/core";
import { TeamMemberDetailContainer } from "./team-member-detail.container";
import { TeamMemberDetailComponent } from "./team-member-detail.component";
import { SharedModule } from "@app/shared/shared.module";
import { SlideoutInfrastructureModule } from "../slideout-infrastructure.module";

const MODULES = [SharedModule, SlideoutInfrastructureModule];
const COMPONENTS: any = [TeamMemberDetailContainer, TeamMemberDetailComponent];

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class TeamMemberDetailModule {}
