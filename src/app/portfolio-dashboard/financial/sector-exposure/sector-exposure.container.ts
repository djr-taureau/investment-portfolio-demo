import { Component, Input, OnInit } from "@angular/core";
import { PortfolioExposure } from "@core/domain/portfolio.model";
import { getAllPortfolioRevenueSectorExposures } from "@core/state/portfolio-dashboard";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-sector-exposure-container",
    template: `
        <sbp-portfolio-exposure
            [exposures]="exposures$ | async"
            [basedOn]="'Unrealized Value'"
            [currSymbol]="'$'"
            [exposureType]="'Sector'"
            [scale]="'B'"
        ></sbp-portfolio-exposure>
    `
})
export class SectorExposureContainer implements OnInit {
    public exposures$: Observable<PortfolioExposure[]>;

    constructor(private store$: Store<any>) {}

    public ngOnInit(): void {
        this.exposures$ = this.store$.pipe(select(getAllPortfolioRevenueSectorExposures));
    }
}
