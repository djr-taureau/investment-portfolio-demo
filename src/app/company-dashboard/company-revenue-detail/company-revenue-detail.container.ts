import { Component, Input, OnInit } from "@angular/core";
import * as fromCompanyRevenue from "@core/state/company/revenue";
import { getShowRevenueDetail } from "@core/state/company/dashboard";
import { RevenueSeriesData } from "@core/domain/company.model";
import { ToggleRevenueDetail } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { expandOutFromTop } from "@shared/animations/slide.animations";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-company-revenue-detail-container",
    template: `
        <sbp-expandable-panel (close)="onClose()" [visible]="isExpanded$ | async">
            <sbp-company-kpi-detail-component
                *ngIf="revenueSummaryLineChartData$ && revenueBudgetLineChartData$ && revenueForecastLineChartData$"
                [title]="'REVENUE'"
                [actuals]="revenueSummaryLineChartData$ | async"
                [budget]="revenueBudgetLineChartData$ | async"
                [forecast]="revenueForecastLineChartData$ | async"
            ></sbp-company-kpi-detail-component>
        </sbp-expandable-panel>
    `,
    styleUrls: ["./company-revenue-detail.container.scss"],
    animations: [expandOutFromTop]
})
export class CompanyRevenueDetailContainer implements OnInit {
    public isExpanded$: Observable<boolean>;
    public revenueSummaryLineChartData$: Observable<RevenueSeriesData[]>;
    public revenueBudgetLineChartData$: Observable<RevenueSeriesData[]>;
    public revenueForecastLineChartData$: Observable<RevenueSeriesData[]>;

    constructor(private store$: Store<any>) {}

    public onClose(): void {
        this.store$.dispatch(new ToggleRevenueDetail());
    }
    public ngOnInit(): void {
        this.isExpanded$ = this.store$.pipe(select(getShowRevenueDetail));
        //  Revenue Detail Chart Data
        this.revenueSummaryLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getSummaryLineChartData));
        this.revenueBudgetLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getBudgetLineChartData));
        this.revenueForecastLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getForecastLineChartData));
    }
}
