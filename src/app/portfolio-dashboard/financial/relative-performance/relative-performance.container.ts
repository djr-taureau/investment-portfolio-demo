import { Component, OnInit } from "@angular/core";
import { PortfolioRelativePerformanceSeries } from "@core/domain/portfolio.model";
import { getRelativePerformanceSeries } from "@core/state/portfolio-dashboard";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-relative-performance-container",
    template: `
        <sbp-relative-performance [chartData]="relativePerformanceData$ | async"></sbp-relative-performance>
    `
})
export class RelativePerformanceContainer implements OnInit {
    public relativePerformanceData$: Observable<PortfolioRelativePerformanceSeries[]>;

    public ngOnInit(): void {
        this.relativePerformanceData$ = this.store$.pipe(select(getRelativePerformanceSeries));
    }

    constructor(private store$: Store<any>) {}
}
