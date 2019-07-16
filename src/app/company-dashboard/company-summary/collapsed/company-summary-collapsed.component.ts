import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Company, TeamMember } from "@core/domain/company.model";
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
            // Donut chart requires this format
            this.chartData = [{ value: theCompany.percentOwnership, color: "#124f8c" }, { value: 1 - theCompany.percentOwnership, color: "#dbe3f1" }];
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
    public chartData: any[] = [];

    /**
     * List of team members.
     */
    @Input()
    public teamMembers: TeamMember[] = null;

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
}
