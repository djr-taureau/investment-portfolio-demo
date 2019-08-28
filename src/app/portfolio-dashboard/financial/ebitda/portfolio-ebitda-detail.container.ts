import { Component, OnInit } from "@angular/core";
import { getShowEBITDADetail } from "@core/state/portfolio-dashboard";
import { select, Store } from "@ngrx/store";
import { expandOutFromTop } from "@shared/animations/slide.animations";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-portfolio-EBITDA-detail-container",
    template: `
        <sbp-expandable-panel (close)="onClose()" [visible]="isExpanded$ | async">
            <h2>Hello World</h2>
        </sbp-expandable-panel>
    `,
    animations: [expandOutFromTop]
})
export class PortfolioEbitdaDetailContainer implements OnInit {
    public isExpanded$: Observable<boolean>;

    public onClose() {}

    constructor(private store$: Store<any>) {}

    public ngOnInit(): void {
        this.isExpanded$ = this.store$.pipe(select(getShowEBITDADetail));
    }
}
