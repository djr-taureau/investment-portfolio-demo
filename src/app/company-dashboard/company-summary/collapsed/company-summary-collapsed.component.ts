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
     * Currently selected company.
     */
    @Input()
    public company: Company = null;

    /**
     * List of team members.
     */
    @Input()
    public teamMembers: TeamMember[] = null;

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
