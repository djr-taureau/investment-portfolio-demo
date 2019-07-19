import { ChartColor } from "@core/domain/chart-data.model";
import { Component, OnInit } from "@angular/core";
import { OpenCompanyInfoPanel, OpenTakeawaysPanel, OpenTeamMemberListPanel, OpenValuationPanel } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Company, Tag, TeamMember, Valuation } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as fromState from "@core/state";
import * as FlowActions from "@core/state/flow/portfolio-flow.actions";
import * as TeamActions from "@core/state/team/team.actions";
import * as fromCompanyDashboardLayout from "@core/state/company/dashboard";
import * as TestUtil from "@util/test.util";
import * as _ from "lodash";

@Component({
    selector: "sbp-company-summary-container",
    template: `
        <sbp-company-summary-collapsed
            *ngIf="collapsed$ | async"
            [company]="company$ | async"
            [teamMembers]="teamMembers$ | async"
            [currentIrr]="currentIrr"
            [currentMoic]="currentMoic"
            [currentTotalValue]="currentTotalValue"
            [plusOneIrr]="plusOneIrr"
            [plusOneMoic]="plusOneMoic"
            [plusOneTotalValue]="plusOneTotalValue"
            [exitIrr]="exitIrr"
            [exitMoic]="exitMoic"
            [exitTotalValue]="exitTotalValue"
            [currentInvested]="currentInvested"
            [currentApproved]="currentApproved"
            (seeMoreCompanyInfo)="seeMoreCompanyInfo($event)"
            (seeAllTeamMembers)="seeAllTeamMembers($event)"
            (seeValuations)="seeValuations($event)"
        >
        </sbp-company-summary-collapsed>

        <sbp-company-summary-expanded
            *ngIf="expanded$ | async"
            [company]="company$ | async"
            [teamMembers]="teamMembers$ | async"
            [tags]="tags$ | async"
            [takeaways]="takeaways$ | async"
            [currentIrr]="currentIrr"
            [currentMoic]="currentMoic"
            [currentTotalValue]="currentTotalValue"
            [plusOneIrr]="plusOneIrr"
            [plusOneMoic]="plusOneMoic"
            [plusOneTotalValue]="plusOneTotalValue"
            [exitIrr]="exitIrr"
            [exitMoic]="exitMoic"
            [exitTotalValue]="exitTotalValue"
            [currentInvested]="currentInvested"
            [currentApproved]="currentApproved"
            [amountDeployedChartData]="amountDeployedChartData"
            (seeAllTakeaways)="seeAllTakeaways($event)"
            (seeMoreCompanyInfo)="seeMoreCompanyInfo($event)"
            (seeAllTeamMembers)="seeAllTeamMembers($event)"
            (seeValuations)="seeValuations($event)"
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
    public valuation$: Observable<Valuation>;

    /**
     * Valuation props
     */
    public currentTotalValue = 0;
    public currentMoic = 0;
    public currentIrr = 0;
    public plusOneTotalValue = 0;
    public plusOneMoic = 0;
    public plusOneIrr = 0;
    public exitTotalValue = 0;
    public exitMoic = 0;
    public exitIrr = 0;
    public currentInvested = 0;
    public currentApproved = 0;
    public amountDeployedChartData: any[];

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
        this.valuation$ = this.store$.pipe(select(fromState.getSelectedValuation));
        this.valuation$.subscribe((value) => {
            if (value) {
                this.currentIrr = _.get(value, "topLineValuations.current.irr", 0);
                this.currentMoic = _.get(value, "topLineValuations.current.moic", 0);
                this.currentTotalValue = _.get(value, "topLineValuations.current.totalValue", 0) / 1000000;
                this.plusOneIrr = _.get(value, "topLineValuations.yearPlus1.irr", 0);
                this.plusOneMoic = _.get(value, "topLineValuations.yearPlus1.moic", 0);
                this.plusOneTotalValue = _.get(value, "topLineValuations.yearPlus1.totalValue", 0) / 1000000;
                this.exitIrr = _.get(value, "topLineValuations.exit.irr", 0);
                this.exitMoic = _.get(value, "topLineValuations.exit.moic", 0);
                this.exitTotalValue = _.get(value, "topLineValuations.exit.totalValue", 0) / 1000000;
                this.currentInvested = _.get(value, "valuationDetail.actual.invested", 0) / 1000000;
                this.currentApproved = _.get(value, "valuationDetail.actual.approved", 0) / 1000000;
                this.amountDeployedChartData = [
                    { value: this.currentInvested, color: ChartColor.lightNavy },
                    { value: this.currentApproved - this.currentInvested, color: ChartColor.lightPeriwinkle }
                ];
            }
        });

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

    /**
     * Fires off action to see all valuations.
     * @param id
     */
    public seeValuations(id: string): void {
        CompanySummaryContainer.logger.debug(`seeValuations( Company ID: ${id} )`);
        // this.store$.dispatch(new TeamActions.GetAll(id));
        this.store$.dispatch(new OpenValuationPanel(id));
    }
}
