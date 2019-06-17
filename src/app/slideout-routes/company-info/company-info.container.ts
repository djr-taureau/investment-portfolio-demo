import { Company } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";
import * as fromPortfolioState from "@core/state/portfolio";
import { CloseCompanyInfoPanel } from "@core/state/flow/flow.actions";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-company-info-container",
    template: `
        <sbp-company-info [company]="company$ | async" (closePanel)="onClose()"> </sbp-company-info>
    `
})
export class CompanyInfoContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyInfoContainerComponent");

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
        this.company$ = this.store$.pipe(select(fromPortfolioState.getSelectedCompany));
    }

    constructor(private store$: Store<any>) {}
}
