import { ActivatedRoute } from "@angular/router";
import { getShowCashDetail, getShowEBITDADetail, getShowRevenueDetail } from "@core/state/company/dashboard";
import { Logger } from "@util/logger";
import { appRoutePaths } from "../app.routes";
import { Component, OnInit } from "@angular/core";
import { CoreCompanyContainer } from "@shared/company/core-company.container";
import { select, Store } from "@ngrx/store";

@Component({
    selector: "sbp-company-documents-container",
    template: `
        <sbp-company-documents></sbp-company-documents>
    `
})
export class CompanyDocumentsContainer extends CoreCompanyContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyDocumentsContainer");

    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        super(store$, route$, appRoutePaths.companyDocuments);
    }

    public ngOnInit() {
        super.ngOnInit();
        CompanyDocumentsContainer.logger.debug(`ngOnInit()`);
    }
}
