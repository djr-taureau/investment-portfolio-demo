import { Component, Input, OnInit } from "@angular/core";
import { getShowEBITDADetail } from "@core/state/company/dashboard";
import { ToggleEBITDADetail } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { expandOutFromTop } from "@shared/animations/slide.animations";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-company-EBITDA-detail-container",
    template: `
        <sbp-expandable-panel (close)="onClose()" [visible]="isExpanded$ | async">
            <sbp-company-kpi-detail-component [data]=""></sbp-company-kpi-detail-component>
        </sbp-expandable-panel>
    `,
    styleUrls: ["./company-EBITDA-detail.container.scss"],
    animations: [expandOutFromTop]
})
export class CompanyEBITDADetailContainer implements OnInit {
    public isExpanded$: Observable<boolean>;

    constructor(private store$: Store<any>) {}

    public onClose(): void {
        this.store$.dispatch(new ToggleEBITDADetail());
    }
    public ngOnInit(): void {
        this.isExpanded$ = this.store$.pipe(select(getShowEBITDADetail));
    }
}
