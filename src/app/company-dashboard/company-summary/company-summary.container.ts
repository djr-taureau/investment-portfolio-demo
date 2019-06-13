import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Company, TeamMember } from "../../core/domain/company.model";
import * as fromCompanyDashboardLayout from "../../core/state/company/dashboard";
import { Logger } from "../../util/logger";
import * as TestUti from "../../util/test.util";

@Component({
    selector: "sbp-company-summary-container",
    template: `
        <sbp-company-summary-collapsed *ngIf="collapsed$ | async" [company]="company$ | async" [teamMembers]="teamMembers$ | async">
        </sbp-company-summary-collapsed>
        <sbp-company-summary-expanded *ngIf="expanded$ | async" [company]="company$ | async" [teamMembers]="teamMembers$ | async">
        </sbp-company-summary-expanded>
    `
})
export class CompanySummaryContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanySummaryContainer");

    /**
     * Boolean indicating if the summary is collapsed.
     */
    public collapsed$: Observable<boolean>;

    /**
     * Boolean indicating if the summary is expanded.
     */
    public expanded$: Observable<boolean>;

    /**
     * The teamMembers observable.
     */
    public teamMembers$: Observable<TeamMember[]>;

    /**
     * The selected company observable.
     */
    public company$: Observable<Company>;

    /**
     * Constructor.
     */
    constructor(private store$: Store<any>) {
        CompanySummaryContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanySummaryContainer.logger.debug(`ngOnInit()`);

        this.collapsed$ = this.store$.pipe(select(fromCompanyDashboardLayout.getCollapsed));
        this.expanded$ = this.store$.pipe(select(fromCompanyDashboardLayout.getExpanded));

        this.company$ = of(TestUti.getCompanyMock({ name: "Foo, Inc." }));

        this.teamMembers$ = of([
            TestUti.getMock(TestUti.getTeamMemberDefault, { name: "Tom Brady" }),
            TestUti.getMock(TestUti.getTeamMemberDefault, { name: "Julian Edleman" }),
            TestUti.getMock(TestUti.getTeamMemberDefault, { name: "Rob Gronkowski" })
        ]);
    }
}
