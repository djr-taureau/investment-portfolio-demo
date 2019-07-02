import { NgModule } from "@angular/core";
import { TeamMemberListContainer } from "./team-member-list.container";
import { TeamMemberListComponent } from "./team-member-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { SlideoutInfrastructureModule } from "../slideout-infrastructure.module";

const MODULES = [SharedModule, SlideoutInfrastructureModule];
const COMPONENTS: any = [TeamMemberListContainer, TeamMemberListComponent];

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class TeamMemberListModule {}
