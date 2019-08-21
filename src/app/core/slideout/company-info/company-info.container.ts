import { ActivatedRoute } from "@angular/router";
import { appRoutePaths } from "@app/app.routes";
import { Company, TeamMember } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { CloseCompanyInfoPanel } from "@core/state/flow/company-flow.actions";
import { CoreCompanyContainer } from "@shared/company/core-company.container";
import { default as fromState, getSelectedCompany, getSelectedCompanyBoardMembers, getSelectedOwnershipChartData } from "@core/state";
import { Logger } from "@util/logger";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";

@Component({
    selector: "sbp-company-info-container",
    template: `
        <sbp-company-info
            [company]="company$ | async"
            [boardMembers]="boardMembers$ | async"
            (closePanel)="onClose()"
            [chartData]="percentOwnershipChartData$ | async"
        >
        </sbp-company-info>
    `
})
export class CompanyInfoContainer extends CoreCompanyContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyInfoContainerComponent");

    /**
     * The Company in context
     */
    public company$: Observable<Company>;

    /**
     * Board members for theh company
     */
    public boardMembers$: Observable<TeamMember[]>;

    public percentOwnershipChartData$: Observable<any[]>;
    /**
     * Handles the close of the panel
     */
    public onClose(): void {
        this.store$.dispatch(new CloseCompanyInfoPanel("1"));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.company$ = this.store$.pipe(select(getSelectedCompany));
        this.boardMembers$ = this.store$.pipe(select(getSelectedCompanyBoardMembers));
        this.percentOwnershipChartData$ = this.store$.pipe(select(getSelectedOwnershipChartData));
        super.ngOnInit();
    }

    constructor(protected store$: Store<any>, protected route$: ActivatedRoute) {
        super(store$, route$, appRoutePaths.companyInfo);
    }
}
