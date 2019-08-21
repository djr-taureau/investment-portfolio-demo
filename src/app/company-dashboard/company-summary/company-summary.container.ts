import { ChartColor } from "@core/domain/chart-data.model";
import { Component, OnInit } from "@angular/core";
import { OpenCompanyInfoPanel, OpenTakeawaysPanel, OpenTeamMemberListPanel, OpenValuationPanel } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { Observable, of } from "rxjs";
import { Company, Tag, TeamMember, Valuation, TeamMemberGroup } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as fromState from "@core/state";
import * as fromTeamActions from "@core/state/team/team.actions";
import * as fromTeamMemberActions from "@core/state/team-member/team-member.actions";
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
            [teamGroup]="teamGroup$ | async"
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
            (seeTeamMember)="seeTeamMember($event)"
            (seeAllTeamMembers)="seeAllTeamMembers($event)"
            (seeValuations)="seeValuations($event)"
            [chartData]="percentOwnershipChartData$ | async"
        >
        </sbp-company-summary-collapsed>

        <sbp-company-summary-expanded
            *ngIf="expanded$ | async"
            [company]="company$ | async"
            [teamMembers]="teamMembers$ | async"
            [teamGroup]="teamGroup$ | async"
            [tags]="tags$ | async"
            [takeaways]="takeaways$ | async"
            [takeawayCount]="takeawayCount$ | async"
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
            (seeTeamMember)="seeTeamMember($event)"
            (seeAllTeamMembers)="seeAllTeamMembers($event)"
            (seeValuations)="seeValuations($event)"
            [percentOwnershipChartData]="percentOwnershipChartData$ | async"
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
     * The team group observable.
     */
    public teamGroup$: Observable<TeamMemberGroup>;

    /**
     * The tags observable.
     */
    public tags$: Observable<Tag[]>;

    /**
     * The takeaways observable.
     */
    public takeaways$: Observable<string[]>;

    /**
     * The takeaways count observable.
     */
    public takeawayCount$: Observable<number>;

    /**
     * The current valuation.
     */
    public valuation$: Observable<Valuation>;

    public percentOwnershipChartData$: Observable<any[]>;

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

        this.percentOwnershipChartData$ = this.store$.pipe(select(fromState.getSelectedOwnershipChartData));
        this.collapsed$ = this.store$.pipe(select(fromCompanyDashboardLayout.getCollapsed));
        this.expanded$ = this.store$.pipe(select(fromCompanyDashboardLayout.getExpanded));
        this.company$ = this.store$.pipe(select(fromState.getSelectedCompany));
        this.takeaways$ = this.store$.pipe(select(fromState.getSelectedCompanyTopTakeaways));
        this.takeawayCount$ = this.store$.pipe(select(fromState.getSelectedCompanyTakeawayCount));
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

        this.teamGroup$ = this.store$.pipe(select(fromState.getDealTeamGroup));
        this.teamMembers$ = this.store$.pipe(select(fromState.getDealTeamMembers));

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
     * Launches the team member detail slide out panel.
     * @param event
     */
    public seeTeamMember(event: any): void {
        const { id, group, companyId } = event;
        CompanySummaryContainer.logger.debug(`goToMemberDetail( ID ${id}, category ${group.category} )`);
        this.store$.dispatch(new fromTeamActions.SetSelectedTeamMemberGroup(group));
        this.store$.dispatch(new fromTeamMemberActions.GetTeamMember({ memberId: id, companyId }));
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
