import { Component, Input, OnInit } from "@angular/core";
import { PortfolioExposure } from "@core/domain/portfolio.model";
import { getAllPortfolioRevenueFxExposures } from "@core/state/portfolio-dashboard";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-fx-exposure-container",
    template: `
        <sbp-portfolio-exposure
            [exposures]="exposures$ | async"
            [basedOn]="'Unrealized Value'"
            [currSymbol]="'$'"
            [exposureType]="'FX'"
            [scale]="'B'"
        ></sbp-portfolio-exposure>
    `
})
export class FxExposureContainer implements OnInit {
    public exposures$: Observable<PortfolioExposure[]>;

    constructor(private store$: Store<any>) {}

    public ngOnInit(): void {
        this.exposures$ = this.store$.pipe(select(getAllPortfolioRevenueFxExposures));
    }
}
