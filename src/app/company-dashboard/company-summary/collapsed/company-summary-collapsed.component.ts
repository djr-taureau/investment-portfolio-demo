import * as _ from "lodash";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Company, TeamMember, TeamMemberGroup } from "@core/domain/company.model";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-company-summary-collapsed",
    templateUrl: "./company-summary-collapsed.component.html",
    styleUrls: ["./company-summary-collapsed.component.scss"]
})
export class CompanySummaryCollapsedComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanySummaryCollapsedComponent");

    /**
     * The Company in context.
     */
    @Input()
    public set company(theCompany: Company) {
        if (theCompany) {
            this._company = theCompany;
        }
    }
    public get company(): Company {
        return this._company;
    }
    private _company: Company;

    /**
     * Valuation props
     */
    @Input()
    public currentTotalValue = 0;
    @Input()
    public currentMoic = 0;
    @Input()
    public currentIrr = 0;
    @Input()
    public plusOneTotalValue = 0;
    @Input()
    public plusOneMoic = 0;
    @Input()
    public plusOneIrr = 0;
    @Input()
    public exitTotalValue = 0;
    @Input()
    public exitMoic = 0;
    @Input()
    public exitIrr = 0;
    @Input()
    public currentInvested = 0;
    @Input()
    public currentApproved = 0;

    /**
     * The percent owned chart data.
     */
    @Input()
    public chartData: any[] = [];

    /**
     * List of team members.
     */
    @Input()
    public teamMembers: TeamMember[] = [];

    /**
     * The team group the team members belong to.
     */
    @Input()
    public teamGroup: TeamMemberGroup;

    /**
     * Request to see all takeaways.
     */
    @Output()
    public seeMoreCompanyInfo: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Request to see individual team member.
     */
    @Output()
    public seeTeamMember: EventEmitter<{ id: string; companyId: string; group: TeamMemberGroup }> = new EventEmitter<{
        id: string;
        companyId: string;
        group: TeamMemberGroup;
    }>();

    /**
     * Request to see all team members.
     */
    @Output()
    public seeAllTeamMembers: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Request to see valuations.
     */
    @Output()
    public seeValuations: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Constructor.
     */
    constructor() {
        CompanySummaryCollapsedComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanySummaryCollapsedComponent.logger.debug(`ngOnInit()`);
    }

    /**
     * Handles click of see more company info.
     * @param id
     */
    public onSeeMoreCompanyInfo(id: string): void {
        CompanySummaryCollapsedComponent.logger.debug(`onSeeMoreCompanyInfo( Company ID: ${id} )`);
        this.seeMoreCompanyInfo.emit(id);
    }

    /**
     * Handles click of individual Team Member.
     * @param id
     * @param companyId
     */
    public onTeamMemberClick(id: string, companyId: string): void {
        CompanySummaryCollapsedComponent.logger.debug(`onTeamMemberClick( Team member ID: ${id} )`);
        const payload = {
            id,
            companyId,
            group: this.teamGroup
        };
        this.seeTeamMember.emit(payload);
    }

    /**
     * Handles click of All Team Members
     * @param id
     */
    public onAllTeamMembersClick(id: string): void {
        CompanySummaryCollapsedComponent.logger.debug(`onAllTeamMembersClick( Company ID: ${id} )`);
        this.seeAllTeamMembers.emit(id);
    }

    /**
     * Handles click of the valuation container area
     * @param id
     */
    public onValuationClick(id: string): void {
        CompanySummaryCollapsedComponent.logger.debug(`onValuationClick( Company ID: ${id} )`);
        this.seeValuations.emit(id);
    }

    public getCompanyLogo(): string {
        const defaultLogo = "https://via.placeholder.com/60/f0f4fa/3b4659?text=" + _.get(this, "company.name", "");
        return _.get(this, "company.logo", defaultLogo);
    }

    public getCompanyName(): string {
        return _.get(this, "company.name", "...");
    }

    public getCompanyOwnership(): string {
        return _.get(this, "company.fdOwnership", "--");
    }
}
