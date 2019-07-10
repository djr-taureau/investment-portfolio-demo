import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Company, TeamMember, TeamMemberGroup } from "@core/domain/company.model";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-team-member-list-item",
    templateUrl: "./team-member-list-item.component.html",
    styleUrls: ["./team-member-list-item.component.scss"]
})
export class TeamMemberListItemComponent {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TeamMemberListItemComponent");

    @Input()
    public member: TeamMember;

    @Input()
    public group: TeamMemberGroup;

    @Input()
    public company: Company;

    @Output()
    public goToDetail = new EventEmitter<any>();

    /**
     * Handles clicks to view member details
     * @param member
     * @param group
     */
    public goToMemberDetail(member: TeamMember, group: TeamMemberGroup): void {
        TeamMemberListItemComponent.logger.debug(`goToMemberDetail() detail for ${member.id} ${group.category}`);
        this.goToDetail.emit({ member, group, companyId: this.company.id });
    }
}
