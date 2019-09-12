import { Component, OnInit } from "@angular/core";
import { PortfolioRelativePerformanceSeries } from "@core/domain/portfolio.model";
import { getRelativePerformanceSeries } from "@core/state/portfolio-dashboard";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { GoToCompanyDashboard } from "@core/state/router/router.action";
import * as TeamActions from "@app/core/state/team/team.actions";
import * as CompanyActions from "@app/core/state/company/company.actions";

@Component({
    selector: "sbp-relative-performance-container",
    template: `
        <sbp-relative-performance
            (openCompanyDashboard)="openCompanyDashboard($event)"
            [chartData]="relativePerformanceData$ | async"
        ></sbp-relative-performance>
    `
})
export class RelativePerformanceContainer implements OnInit {
    public relativePerformanceData$: Observable<PortfolioRelativePerformanceSeries[]>;

    public ngOnInit(): void {
        this.relativePerformanceData$ = this.store$.pipe(select(getRelativePerformanceSeries));
    }

    public openCompanyDashboard(companyId: string) {
        this.store$.dispatch(new CompanyActions.Get(companyId));
        this.store$.dispatch(new GoToCompanyDashboard(companyId));
        this.store$.dispatch(new TeamActions.GetAll(companyId));
    }

    constructor(private store$: Store<any>) {}
}
