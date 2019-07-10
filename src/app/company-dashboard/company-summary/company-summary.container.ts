import { Component, OnInit } from "@angular/core";
import { OpenCompanyInfoPanel, OpenTakeawaysPanel, OpenTeamMemberListPanel } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Company, Tag, TeamMember, ValuationValue } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as fromState from "@core/state";
import * as FlowActions from "@core/state/flow/portfolio-flow.actions";
import * as TeamActions from "@core/state/team/team.actions";
import * as fromCompanyDashboardLayout from "@core/state/company/dashboard";
import * as TestUtil from "@util/test.util";

@Component({
    selector: "sbp-company-summary-container",
    template: `
        <sbp-company-summary-collapsed
            *ngIf="collapsed$ | async"
            [company]="company$ | async"
            [teamMembers]="teamMembers$ | async"
            [currentValuation]="currentValuation$ | async"
            [yearPlusOneValuation]="yearPlusOneValuation$ | async"
            [exitValuation]="exitValuation$ | async"
            (seeMoreCompanyInfo)="seeMoreCompanyInfo($event)"
            (seeAllTeamMembers)="seeAllTeamMembers($event)"
        >
        </sbp-company-summary-collapsed>

        <sbp-company-summary-expanded
            *ngIf="expanded$ | async"
            [company]="company$ | async"
            [teamMembers]="teamMembers$ | async"
            [tags]="tags$ | async"
            [takeaways]="takeaways$ | async"
            [currentValuation]="currentValuation$ | async"
            [yearPlusOneValuation]="yearPlusOneValuation$ | async"
            [exitValuation]="exitValuation$ | async"
            (seeAllTakeaways)="seeAllTakeaways($event)"
            (seeMoreCompanyInfo)="seeMoreCompanyInfo($event)"
            (seeAllTeamMembers)="seeAllTeamMembers($event)"
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
     * The selected company observable.
     */
    public selectedCompany$: Observable<Company>;

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
    public takeaways$: Observable<string[]>;

    /**
     * The current valuation.
     */
    public currentValuation$: Observable<ValuationValue>;

    /**
     * The current valuation.
     */
    public yearPlusOneValuation$: Observable<ValuationValue>;

    /**
     * The current valuation.
     */
    public exitValuation$: Observable<ValuationValue>;

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
        this.company$ = this.store$.pipe(select(fromState.getSelectedCompany));
        this.takeaways$ = this.store$.pipe(select(fromState.getSelectedCompanyTakeaways));
        this.currentValuation$ = this.store$.pipe(select(fromState.getSelectedCompanyCurrentValuation));
        this.yearPlusOneValuation$ = this.store$.pipe(select(fromState.getSelectedCompanyYearPlusOneValuation));
        this.exitValuation$ = this.store$.pipe(select(fromState.getSelectedCompanyYearExitValuation));

        // TODO: Need to get this from API
        this.teamMembers$ = of([
            TestUtil.getMock(TestUtil.getTeamMemberDefault, { firstName: "Tom", lastName: "Brady", initials: "TB" }),
            TestUtil.getMock(TestUtil.getTeamMemberDefault, { firstName: "Julian", lastName: "Edleman", initials: "JE" }),
            TestUtil.getMock(TestUtil.getTeamMemberDefault, { firstName: "Rob", lastName: "Gronkowski", initials: "RB" })
        ]);

        // TODO: Need to get this from API
        this.tags$ = of([
            TestUtil.getMock(TestUtil.getTagDefault, { name: "Private" }),
            TestUtil.getMock(TestUtil.getTagDefault, { name: "Real Estate" })
        ]);
    }

    /**
     * Fires off action to see all takeaways.
     * @param id
     */
    public seeAllTakeaways(id: string): void {
        CompanySummaryContainer.logger.debug(`seeAllTakeaways( Company ID: ${id} )`);
        this.store$.dispatch(new OpenTakeawaysPanel(id));
    }

    /**
     * Fires off action to see all takeaways.
     * @param id
     */
    public seeMoreCompanyInfo(id: string): void {
        CompanySummaryContainer.logger.debug(`seeMoreCompanyInfo( Company ID: ${id} )`);
        this.store$.dispatch(new OpenCompanyInfoPanel(id));
    }

    /**
     * Fires off action to see all takeaways.
     * @param id
     */
    public seeAllTeamMembers(id: string): void {
        CompanySummaryContainer.logger.debug(`seeAllTeamMembers( Company ID: ${id} )`);
        // this.store$.dispatch(new TeamActions.GetAll(id));
        this.store$.dispatch(new OpenTeamMemberListPanel(id));
    }
}
