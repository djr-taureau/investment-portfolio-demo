import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Company, Tag, Takeaway, TeamMember } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as fromCompanyDashboardLayout from "@core/state/company/dashboard";
import * as TestUtil from "@util/test.util";

@Component({
    selector: "sbp-company-summary-container",
    template: `
        <sbp-company-summary-collapsed *ngIf="collapsed$ | async" [company]="company$ | async" [teamMembers]="teamMembers$ | async">
        </sbp-company-summary-collapsed>

        <sbp-company-summary-expanded
            *ngIf="expanded$ | async"
            [company]="company$ | async"
            [teamMembers]="teamMembers$ | async"
            [tags]="tags$ | async"
            [takeaways]="takeaways$ | async"
        >
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
     * The team members observable.
     */
    public teamMembers$: Observable<TeamMember[]>;

    /**
     * The tags observable.
     */
    public tags$: Observable<Tag[]>;

    /**
     * The takeaways observable.
     */
    public takeaways$: Observable<Takeaway[]>;

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

        this.company$ = of(
            TestUtil.getCompanyMock({
                name: "WeWork",
                description:
                    "WeWork is a platform for creators that transforms buildings into dynamic environments for creativity, focus, and collaboration.",
                percentOwnership: 0.122,
                deployed: 80,
                deployedTotal: 300,
                valuation: {
                    id: "valuationId-1234567890",
                    name: "valuation-name",
                    desc: "valuation-desc",
                    entry: 0,
                    current: {
                        value: 110.0,
                        moic: 1.0,
                        irr: 0
                    },
                    yearOne: {
                        value: 160.5,
                        moic: 1.5,
                        irr: 38.5
                    },
                    yearTwo: {
                        value: 110.0,
                        moic: 1.0,
                        irr: 0
                    },
                    yearThree: {
                        value: 110.0,
                        moic: 1.0,
                        irr: 0
                    },
                    exit: {
                        value: 1873.2,
                        moic: 4.4,
                        irr: 42.5
                    }
                }
            })
        );

        this.teamMembers$ = of([
            TestUtil.getMock(TestUtil.getTeamMemberDefault, { firstName: "Tom", lastName: "Brady", initials: "TB" }),
            TestUtil.getMock(TestUtil.getTeamMemberDefault, { firstName: "Julian", lastName: "Edleman", initials: "JE" }),
            TestUtil.getMock(TestUtil.getTeamMemberDefault, { firstName: "Rob", lastName: "Gronkowski", initials: "RB" })
        ]);

        this.tags$ = of([
            TestUtil.getMock(TestUtil.getTagDefault, { name: "Private" }),
            TestUtil.getMock(TestUtil.getTagDefault, { name: "Real Estate" })
        ]);

        this.takeaways$ = of([
            TestUtil.getMock(TestUtil.getTakeawayDefault, { content: "In the middle of closing Series J fundraising." }),
            TestUtil.getMock(TestUtil.getTakeawayDefault, {
                content: "With $500M in funding, WeWork will be expanding their core business as well as launching into fintect / O2O."
            }),
            TestUtil.getMock(TestUtil.getTakeawayDefault, {
                content: "SoftBank should connect WeWork and PayTM to help WeWork develop compresensive financial infrastructure in Korea Market."
            })
        ]);
    }
}
