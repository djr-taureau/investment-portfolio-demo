import { Component, Input, OnInit } from "@angular/core";
import * as fromCompanyRevenue from "@core/state/company/revenue";
import { getSelectedCurrency, getSelectedPeriod } from "@core/state/company/dashboard";
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
                [selectedPeriod]="selectedPeriod$ | async"
                [actuals]="revenueSummaryLineChartData$ | async"
                [budget]="revenueBudgetLineChartData$ | async"
                [forecast]="revenueForecastLineChartData$ | async"
                [revenueTableDataHeaders]="revenueTableDataHeaders$ | async"
                [revenueTableDataAsOf]="revenueTableDataAsOf$ | async"
                [revenueTableDataVsBud]="revenueTableDataVsBud$ | async"
                [revenueTableDataVsPq]="revenueTableDataVsPq$ | async"
            ></sbp-company-kpi-detail-component>
        </sbp-expandable-panel>
    `,
    styleUrls: ["./company-revenue-detail.container.scss"],
    animations: [expandOutFromTop]
})
export class CompanyRevenueDetailContainer implements OnInit {
    public isExpanded$: Observable<boolean>;
    public selectedPeriod$: Observable<any>;
    public revenueSummaryLineChartData$: Observable<RevenueSeriesData[]>;
    public revenueBudgetLineChartData$: Observable<RevenueSeriesData[]>;
    public revenueForecastLineChartData$: Observable<RevenueSeriesData[]>;
    public revenueTableDataHeaders$: Observable<string[]>;
    public revenueTableDataAsOf$: Observable<number[]>;
    public revenueTableDataVsBud$: Observable<number[]>;
    public revenueTableDataVsPq$: Observable<number[]>;

    constructor(private store$: Store<any>) {}

    public onClose(): void {
        this.store$.dispatch(new ToggleRevenueDetail());
    }
    public ngOnInit(): void {
        this.isExpanded$ = this.store$.pipe(select(getShowRevenueDetail));
        this.selectedPeriod$ = this.store$.pipe(select(getSelectedPeriod));
        //  Revenue Detail Chart Data
        this.revenueSummaryLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getSummaryLineChartData));
        this.revenueBudgetLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getBudgetLineChartData));
        this.revenueForecastLineChartData$ = this.store$.pipe(select(fromCompanyRevenue.getForecastLineChartData));

        // Table data
        this.revenueTableDataHeaders$ = this.store$.pipe(select(fromCompanyRevenue.getTableDataHeaders));
        this.revenueTableDataAsOf$ = this.store$.pipe(select(fromCompanyRevenue.getTableDataRevenueAsOf));
        this.revenueTableDataVsBud$ = this.store$.pipe(select(fromCompanyRevenue.getTableDataRevenueVsBud));
        this.revenueTableDataVsPq$ = this.store$.pipe(select(fromCompanyRevenue.getTableDataRevenueVsPq));
    }
}
