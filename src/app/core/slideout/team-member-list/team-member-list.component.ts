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
    public goToDetail = new EventEmitter<any>();

    /**
     * The Company Groups
     */
    @Input()
    public set teams(theTeams: TeamMemberGroup[]) {
        if (theTeams) {
            theTeams.forEach((team) => {
                this.teamMemberCount += team.members.length;
                // TODO: REMOVE THIS
                team.members.forEach((member) => {
                    member.avatar = "assets/image/slack.png";
                });
            });
            this._teams = theTeams;
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
            this._company = theCompany;
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

    public goToMemberDetail(event: { member; group; companyId }): void {
        TeamMemberListComponent.logger.debug(`goToMemberDetail() detail for ${event.member.id} ${event.group.category}`);
        this.goToDetail.emit(event);
        // this.closePanel.emit();
    }
    constructor() {}

    ngOnInit() {}
}
