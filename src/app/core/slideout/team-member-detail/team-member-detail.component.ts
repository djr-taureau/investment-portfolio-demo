import { TeamMemberGroup, TeamMember, CompanyRelationshipTypes } from "@core/domain/company.model";
import { Logger } from "app/util/logger";
import { EventEmitter } from "@angular/core";
import { Output } from "@angular/core";
import { Company } from "@core/domain/company.model";
import { Input } from "@angular/core";
import { Component, OnInit } from "@angular/core";

export interface Relationship {
    name: string;
    logo: string;
}
@Component({
    selector: "sbp-team-member-detail",
    templateUrl: "./team-member-detail.component.html",
    styleUrls: ["../team-member-list/team-member-list-item.component.scss", "./team-member-detail.component.scss"]
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
    public companiesCovered: Relationship[] = [];
    public boardSeats: Relationship[] = [];
    public bioExists = false;

    /**
     * Dispatched when user clicks a member to view the detail page
     */
    @Output()
    public goToList: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Dispatched when the user closes the slider
     */
    @Output()
    public closePanel: EventEmitter<any> = new EventEmitter();

    /**
     * The TeamMember in context
     */
    @Input()
    public set member(theMember: TeamMember) {
        if (theMember) {
            this.bioExists = !!theMember.bio;
            theMember.companyRelationships.forEach((relationship) => {
                if (relationship.relationship === CompanyRelationshipTypes.BOARD_SEAT) {
                    this.boardSeatsCount++;
                    // TODO: REMOVE THIS
                    relationship.companyLogo = "assets/image/slack.png";
                    this.boardSeats.push({ name: relationship.companyName, logo: relationship.companyLogo });
                } else if (relationship.relationship === CompanyRelationshipTypes.COMPANY_COVERED) {
                    this.companiesCoveredCount++;
                    // TODO: REMOVE THIS
                    relationship.companyLogo = "assets/image/slack.png";
                    this.companiesCovered.push({ name: relationship.companyName, logo: relationship.companyLogo });
                }
            });
            this._member = theMember;
        }
    }
    public get member(): TeamMember {
        return this._member;
    }
    private _member: TeamMember;

    /**
     * The TeamGroup for this Team member
     */
    @Input()
    public set teamGroup(theTeamGroup: TeamMemberGroup) {
        if (theTeamGroup) {
            theTeamGroup.members.forEach((member) => {
                this.teamGroupMemberCount++;
            });
            this._teamGroup = theTeamGroup;
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
        this._company = theCompany;
    }
    public get company(): Company {
        return this._company;
    }
    private _company: Company;

    /**
     * Handles the close of the slider by dispatching an event
     */
    public onClose(): void {
        TeamMemberDetailComponent.logger.debug(`onClose()`);
        this.closePanel.emit();
    }

    /**
     * Determines if the team member is lead for this company
     */
    public isLead(): boolean {
        const leads = this.member.companyRelationships.filter((rel) => {
            return rel.companyId.toString() === this.company.id && rel.relationship === CompanyRelationshipTypes.LEAD;
        });
        return (leads || []).length > 0;
    }

    /**
     * Handles clicking on the go back to all team memebers
     */
    public onBackToTeamMembersClick(): void {
        TeamMemberDetailComponent.logger.debug(`onBackToTeamMembersClick()`);
        this.goToList.emit(this.company.id);
    }
    constructor() {}

    ngOnInit() {}
}
