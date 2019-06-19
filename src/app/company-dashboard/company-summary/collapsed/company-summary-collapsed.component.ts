import { Component, Input, OnInit } from "@angular/core";
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
     * List of team members.
     */
    @Input()
    public teamMembers: TeamMember[] = null;

    /**
     * The percent owned chart data.
     */
    public chartData: any[] = [];

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
}
