import { ActivatedRoute } from "@angular/router";
import { appRoutePaths } from "@app/app.routes";
import { CoreCompanyContainer } from "@shared/company/core-company.container";
import { CloseTakeawaysPanel } from "@core/state/flow/flow.actions";
import { Company } from "@core/domain/company.model";
import { Component, OnInit } from "@angular/core";
import { getSelectedCompany } from "@core/state";
import { Logger } from "app/util/logger";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";

@Component({
    selector: "sbp-takeaways-container",
    template: `
        <sbp-takeaways [company]="company$ | async" (closePanel)="onClose()"> </sbp-takeaways>
    `
})
export class TakeawaysContainer extends CoreCompanyContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TakeawaysContainer");

    /**
     * The Company in context
     */
    public company$: Observable<Company>;

    /**
     * Constructor.
     * @param store$
     * @param route$
     */
    constructor(protected store$: Store<any>, protected route$: ActivatedRoute) {
        super(store$, route$, appRoutePaths.companyInfo);
        TakeawaysContainer.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        super.ngOnInit();
        TakeawaysContainer.logger.debug(`constructor()`);
        this.company$ = this.store$.pipe(select(getSelectedCompany));
    }

    /**
     * Handles the close of the panel
     */
    public onClose(): void {
        TakeawaysContainer.logger.debug(`onClose()`);
        this.store$.dispatch(new CloseTakeawaysPanel("1"));
    }
}
