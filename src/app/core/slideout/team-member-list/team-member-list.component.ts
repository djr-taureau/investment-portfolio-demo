import { Logger } from "app/util/logger";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { Company, Team, TeamMember, TeamMemberGroup } from "@core/domain/company.model";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "sbp-team-member-list",
    templateUrl: "./team-member-list.component.html",
    styleUrls: ["./team-member-list.component.scss"]
})
export class TeamMemberListComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TeamMemberListComponent");

    // Local props
    public companyName = "";
    public teamMemberCount = 0;
    public titleText = `All Team Members`;

    /**
     * Dispatched when user clicks a member to view the detail page
     */
    @Output()
    public goToDetail = new EventEmitter<string>();

    /**
     * The Company Groups
     */
    @Input()
    public set teams(theTeams: TeamMemberGroup[]) {
        if (theTeams) {
            this._teams = theTeams;
            theTeams.forEach((team) => {
                this.teamMemberCount += team.members.length;
                team.members.forEach((member) => (member.isLead = member.position === "LEAD"));
            });
            // TODO: do we need to filter the groups so they are ordered by group category in any way?
        }
    }
    public get teams(): TeamMemberGroup[] {
        return this._teams;
    }
    private _teams: TeamMemberGroup[];
    /**
     * The Company in context
     */
    @Input()
    public set company(theCompany: Company) {
        if (theCompany) {
            this.companyName = theCompany.name;
        }
    }
    public get company(): Company {
        return this._company;
    }
    private _company: Company;

    /**
     * Dispatched when the user closes the slider
     */
    @Output()
    public closePanel: EventEmitter<any> = new EventEmitter();

    /**
     * Handles the close of the slider by dispatching an event
     */
    public onClose(): void {
        TeamMemberListComponent.logger.debug(`onClose()`);
        this.closePanel.emit();
    }

    public goToMemberDetail(member: TeamMember): void {
        TeamMemberListComponent.logger.debug(`goToMemberDetail() detail for ${member.id}`);
        this.goToDetail.emit(member.id);
    }
    constructor() {}

    ngOnInit() {}
}
