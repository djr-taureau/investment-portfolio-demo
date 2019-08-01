import { Component, Input, OnInit } from "@angular/core";
import { getShowRevenueDetail } from "@core/state/company/dashboard";
import { ToggleRevenueDetail } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { expandOutFromTop } from "@shared/animations/slide.animations";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-company-revenue-detail-container",
    template: `
        <sbp-expandable-panel (close)="onClose()" [visible]="isExpanded$ | async"><h1>Hello!</h1></sbp-expandable-panel>
    `,
    styleUrls: ["./company-revenue-detail.container.scss"],
    animations: [expandOutFromTop]
})
export class CompanyRevenueDetailContainer implements OnInit {
    public isExpanded$: Observable<boolean>;

    constructor(private store$: Store<any>) {}

    public onClose(): void {
        this.store$.dispatch(new ToggleRevenueDetail());
    }
    public ngOnInit(): void {
        this.isExpanded$ = this.store$.pipe(select(getShowRevenueDetail));
    }
}
