import { Component, OnInit } from "@angular/core";
import { TeamMember } from "@core/domain/company.model";
import { Initiative, InitiativeStatusEnum } from "@core/domain/initiative.model";
import * as fromState from "@core/state/company/dashboard";
import { FilterInitiativesByOwner, FilterInitiativesByStatus, ViewAllInitiatives } from "@core/state/flow/company-flow.actions";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-company-initiatives-summary-container",
    template: `
        <sbp-company-initiatives-summary
            [initiatives]="initiatives$ | async"
            [owners]="ownerFilters$ | async"
            [status]="statusFilters$ | async"
            (filterByOwner)="onFilterByOwner($event)"
            (filterByStatus)="onFilterByStatus($event)"
            (seeMore)="onSeeMore($event)"
        ></sbp-company-initiatives-summary>
    `,
    styleUrls: ["./company-initiatives-summary.component.scss"]
})
export class CompanyInitiativesSummaryContainer implements OnInit {
    public initiatives$: Observable<Initiative[]>;

    public statusFilters$: Observable<InitiativeStatusEnum[]>;

    public ownerFilters$: Observable<TeamMember[]>;

    public initiativeCount$: Observable<number>;

    public onFilterByOwner($event) {
        this.store$.dispatch(new FilterInitiativesByOwner($event));
    }

    public onFilterByStatus($event) {
        this.store$.dispatch(new FilterInitiativesByStatus($event));
    }

    public onSeeMore($event) {
        this.store$.dispatch(new ViewAllInitiatives($event));
    }

    constructor(private store$: Store<any>) {}

    public ngOnInit(): void {
        this.initiativeCount$ = this.store$.pipe(select(fromState.getInitiativeCount));
        this.initiatives$ = this.store$.pipe(select(fromState.getTopInitiativesByCompanyId));
    }
}
