import { TeamMemberGroup, TeamMember, CompanyRelationshipTypes } from "./../../domain/company.model";
import { Logger } from "app/util/logger";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { Company } from "@core/domain/company.model";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "sbp-team-member-detail",
    templateUrl: "./team-member-detail.component.html",
    styleUrls: ["./team-member-detail.component.scss"]
})
export class TeamMemberDetailComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TeamMemberDetailComponent");

    // Local props
    public companyName = "";
    public teamGroupMemberCount = 0;
    public companiesCoveredCount = 0;
    public boardSeatsCount = 0;
    public titleText = `All Team Members`;

    /**
     * Dispatched when user clicks a member to view the detail page
     */
    @Output()
    public goToList = new EventEmitter<void>();

    /**
     * The TeamMember in context
     */
    @Input()
    public set member(theMember: TeamMember) {
        if (theMember) {
            this._member = theMember;
            theMember.companyRelationships.forEach((relationship) => {
                if (relationship.relationship === CompanyRelationshipTypes.BOARD_SEAT) {
                    this.boardSeatsCount++;
                } else if (relationship.relationship === CompanyRelationshipTypes.COMPANY_COVERED) {
                    this.companiesCoveredCount++;
                }
            });
        }
    }
    public get member(): TeamMember {
        return this._member;
    }
    private _member: TeamMember;

    /**
     * The compaines covered for the team member in context
     */
    @Input()
    public set companiesCovered(theCompanies: Company[]) {
        if (theCompanies) {
            this._companiesCovered = theCompanies;
            this.companiesCoveredCount = theCompanies.length;
        }
    }
    public get companiesCovered(): Company[] {
        return this._companiesCovered;
    }
    private _companiesCovered: Company[];

    /**
     * The board seats for the team member in context
     */
    @Input()
    public set boardSeats(theCompanies: Company[]) {
        if (theCompanies) {
            this._boardSeats = theCompanies;
            this.boardSeatsCount = theCompanies.length;
        }
    }
    public get boardSeats(): Company[] {
        return this._boardSeats;
    }
    private _boardSeats: Company[];

    /**
     * The TeamGroup for this Team member
     */
    @Input()
    public set teamGroup(theTeamGroup: TeamMemberGroup) {
        if (theTeamGroup) {
            this._teamGroup = theTeamGroup;
            theTeamGroup.members.forEach((member) => {
                this.teamGroupMemberCount++;
            });
        }
    }
    public get teamGroup(): TeamMemberGroup {
        return this._teamGroup;
    }
    private _teamGroup: TeamMemberGroup;

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
        TeamMemberDetailComponent.logger.debug(`onClose()`);
        this.closePanel.emit();
    }

    public onBackToTeamMembersClick(): void {
        TeamMemberDetailComponent.logger.debug(`onBackToTeamMembersClick()`);
        this.goToList.emit();
    }
    constructor() {}

    ngOnInit() {}
}
