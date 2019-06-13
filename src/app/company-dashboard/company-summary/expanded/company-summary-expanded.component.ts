import { Component, Input, OnInit } from "@angular/core";
import { Company, TeamMember } from "../../../core/domain/company.model";
import { Logger } from "../../../util/logger";

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
        CompanySummaryExpandedComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanySummaryExpandedComponent.logger.debug(`ngOnInit()`);
    }
}
