import { Component } from "@angular/core";
import { TeamMember } from "@core/domain/company.model";
import { Initiative, InitiativeStatusEnum } from "@core/domain/initiative.model";
import { Observable } from "rxjs";

@Component({
    selector: "sbp-company-initiatives-summary-container",
    template: `
        <sbp-company-initiatives-summary
            [initiatives]="initiatives$ | async"
            [owners]="ownerFilters$ | async"
            [status]="statusFilters$ | async"
        ></sbp-company-initiatives-summary>
    `,
    styleUrls: ["./company-initiatives-summary.component.scss"]
})
export class CompanyInitiativesSummaryContainer {
    public initiatives$: Observable<Initiative[]>;

    public statusFilters$: Observable<InitiativeStatusEnum[]>;

    public ownerFilters$: Observable<TeamMember[]>;

    constructor() {}
}
