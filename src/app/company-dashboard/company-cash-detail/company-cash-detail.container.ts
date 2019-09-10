import { Component, Input, OnInit } from "@angular/core";
import { getShowCashDetail } from "@core/state/company/dashboard";
import { ToggleCashDetail } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { expandOutFromTop } from "@shared/animations/slide.animations";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-company-cash-detail-container",
    template: `
        <sbp-expandable-panel (close)="onClose()" [visible]="isExpanded$ | async">
            <sbp-company-detail-widget-component [data]=""></sbp-company-detail-widget-component>
        </sbp-expandable-panel>
    `,
    styleUrls: ["./company-cash-detail.container.scss"],
    animations: [expandOutFromTop]
})
export class CompanyCashDetailContainer implements OnInit {
    public isExpanded$: Observable<boolean>;

    constructor(private store$: Store<any>) {}

    public onClose(): void {
        this.store$.dispatch(new ToggleCashDetail());
    }
    public ngOnInit(): void {
        this.isExpanded$ = this.store$.pipe(select(getShowCashDetail));
    }
}
