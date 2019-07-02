import { getSelectedCompany } from "@core/state";
import { Company } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import { CloseCompanyInfoPanel } from "@core/state/flow/flow.actions";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-team-member-detail-container",
    template: `
        <sbp-team-member-detail [company]="company$ | async" (closePanel)="onClose()"></sbp-team-member-detail>
    `
})
export class TeamMemberDetailContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TeamMemberDetailContainer");

    /**
     * The Company in context
     */
    public company$: Observable<Company>;

    /**
     * Handles the close of the panel
     */
    public onClose(): void {
        this.store$.dispatch(new CloseCompanyInfoPanel("1"));
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        this.company$ = this.store$.pipe(select(getSelectedCompany));
    }

    constructor(private store$: Store<any>) {}
}
