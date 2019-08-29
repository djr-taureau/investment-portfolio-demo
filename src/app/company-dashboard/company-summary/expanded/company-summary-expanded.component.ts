import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ChartColor } from "@core/domain/chart-data.model";
import { Company, Tag, Takeaway, TeamMember, TeamMemberGroup, Valuation } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as _ from "lodash";

@Component({
    selector: "sbp-company-summary-expanded",
    templateUrl: "./company-summary-expanded.component.html",
    styleUrls: ["./company-summary-expanded.component.scss"]
})
export class CompanySummaryExpandedComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanySummaryExpandedComponent");

    /**
     * The Company in context.
     */
    @Input()
    public set company(value: Company) {
        if (value) {
            this._company = value;
        }
    }
    public get company(): Company {
        return this._company;
    }
    private _company: Company;

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
     * List of tags.
     */
    @Input()
    public tags: Tag[] = [];

    /**
     * List of takeaways.
     */
    @Input()
    public takeaways: string[] = [];

    /**
     * The total amount of takeaways for the selected company
     */
    @Input()
    public takeawayCount = 0;

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
    @Input()
    public amountDeployedChartData: any[];
    /**
     * The percent owned chart data.
     */
    @Input()
    public percentOwnershipChartData: any[];

    /**
     * Request to see all takeaways.
     */
    @Output()
    public seeMoreCompanyInfo: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Request to see all team members.
     */
    @Output()
    public seeAllTeamMembers: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Request to see individual team member.
     */
    @Output()
    public seeTeamMember: EventEmitter<{ id: string; companyId: string }> = new EventEmitter<{ id: string; companyId: string }>();

    /**
     * Request to see all takeaways.
     */
    @Output()
    public seeAllTakeaways: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Request to see valuations.
     */
    @Output()
    public seeValuations: EventEmitter<string> = new EventEmitter<string>();

    /**
     * Constructor.
     */
    constructor() {
        CompanySummaryExpandedComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanySummaryExpandedComponent.logger.debug(`ngOnInit()`);
    }

    /**
     * Handles click of see all takeaways.
     * @param id
     */
    public onSeeAllTakeaways(id: string): void {
        CompanySummaryExpandedComponent.logger.debug(`onSeeAllTakeaways( Company ID: ${id} )`);
        this.seeAllTakeaways.emit(id);
    }

    /**
     * Handles click of see more company info.
     * @param id
     */
    public onSeeMoreCompanyInfo(id: string): void {
        CompanySummaryExpandedComponent.logger.debug(`onSeeMoreCompanyInfo( Company ID: ${id} )`);
        this.seeMoreCompanyInfo.emit(id);
    }

    /**
     * Handles click of individual Team Member.
     * @param id
     * @param companyId
     */
    public onTeamMemberClick(id: string, companyId: string): void {
        CompanySummaryExpandedComponent.logger.debug(`onTeamMemberClick( Team member ID: ${id} )`);
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
        CompanySummaryExpandedComponent.logger.debug(`onAllTeamMembersClick( Company ID: ${id} )`);
        this.seeAllTeamMembers.emit(id);
    }

    /**
     * Handles click of the valuation container area
     * @param id
     */
    public onValuationClick(id: string): void {
        CompanySummaryExpandedComponent.logger.debug(`onValuationClick( Company ID: ${id} )`);
        this.seeValuations.emit(id);
    }

    /**
     * Creates the percent ownership chart data.
     * @param company
     */
    // private createPercentOwnershipChartData(company: Company): any[] {
    //     return [
    //
    //             ];
    //     //     { value: company.fdOwnership, color: ChartColor.lightNavy },
    //     //     { value: 1 - company.fdOwnership, color: ChartColor.lightPeriwinkle }
    //     // ];
    // }

    /**
     * Creates the amount deployed chart data.
     * @param company
     */
    private createAmountDeployedChartData(company: Company): any[] {
        return [{ value: this.currentInvested, color: ChartColor.lightNavy }, { value: this.currentApproved, color: ChartColor.lightPeriwinkle }];
    }
}
