import { ActivatedRoute } from "@angular/router";
import { appRoutePaths } from "@app/app.routes";
import { CoreCompanyContainer } from "@shared/company/core-company.container";
import { CloseTakeawaysPanel } from "@core/state/flow/flow.actions";
import { Company, Takeaway } from "@core/domain/company.model";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { getSelectedCompany } from "@core/state";
import { Logger } from "@util/logger";
import * as TestUtil from "@util/test.util";
import { Observable, of } from "rxjs";
import { Store, select } from "@ngrx/store";

@Component({
    selector: "sbp-takeaways-container",
    template: `
        <sbp-takeaways [company]="company$ | async" [takeaways]="takeaways$ | async" (close)="onClose($event)"> </sbp-takeaways>
    `
})
export class TakeawaysContainer extends CoreCompanyContainer implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TakeawaysContainer");

    /**
     * Dispatched when the user closes the slider.
     */
    @Output()
    public close: EventEmitter<any> = new EventEmitter<any>();

    /**
     * The Company in context
     */
    public company$: Observable<Company>;

    /**
     * The takeaways observable.
     */
    public takeaways$: Observable<Takeaway[]>;

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

        this.takeaways$ = of([
            TestUtil.getMock(TestUtil.getTakeawayDefault, { content: "In the middle of closing Series J fundraising." }),
            TestUtil.getMock(TestUtil.getTakeawayDefault, {
                content: "With $500M in funding, WeWork will be expanding their core business as well as launching into fintect / O2O."
            }),
            TestUtil.getMock(TestUtil.getTakeawayDefault, {
                content: "SoftBank should connect WeWork and PayTM to help WeWork develop compresensive financial infrastructure in Korea Market."
            })
        ]);
    }

    /**
     * Handles the close of the panel.
     */
    public onClose(event: any): void {
        TakeawaysContainer.logger.debug(`onClose()`);
        this.close.emit(new CloseTakeawaysPanel("1"));
    }
}
