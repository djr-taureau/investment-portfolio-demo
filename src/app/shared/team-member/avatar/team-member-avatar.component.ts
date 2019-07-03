import * as _ from "lodash";
import { Component, Input } from "@angular/core";
import { TeamMember } from "@core/domain/company.model";

@Component({
    selector: "sbp-team-member-avatar",
    templateUrl: "./team-member-avatar.component.html",
    styleUrls: ["./team-member-avatar.component.scss"]
})
export class TeamMemberAvatarComponent {
    @Input()
    public teamMember: TeamMember;

    public hasAvatar() {
        return !_.isNil(_.get(this, "teamMember.avatar", null));
    }
    constructor() {}
}
