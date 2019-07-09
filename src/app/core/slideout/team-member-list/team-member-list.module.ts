import { NgModule } from "@angular/core";
import { TeamMemberListItemComponent } from "@core/slideout/team-member-list/team-member-list-item.component";
import { TeamMemberListContainer } from "./team-member-list.container";
import { TeamMemberListComponent } from "./team-member-list.component";
import { SharedModule } from "@app/shared/shared.module";
import { SlideoutInfrastructureModule } from "../slideout-infrastructure.module";

const MODULES = [SharedModule, SlideoutInfrastructureModule];
const COMPONENTS: any = [TeamMemberListContainer, TeamMemberListComponent, TeamMemberListItemComponent];

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class TeamMemberListModule {}
