import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TeamMemberAvatarComponent } from "@shared/team-member/avatar/team-member-avatar.component";

const COMPONENTS: any = [TeamMemberAvatarComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class TeamMemberAvatarModule {}
