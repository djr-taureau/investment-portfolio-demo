import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";

import { Company, Takeaway } from "@core/domain/company.model";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-takeaways",
    templateUrl: "./takeaways.component.html",
    styleUrls: ["./takeaways.component.scss"]
})
export class TakeawaysComponent {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("TakeawaysComponent");

    /**
     * The Company in context
     */
    @Input()
    public set company(value: Company) {
        if (value) {
            this._company = value;
        }
    }
    public get company(): Company {
        return this._company;
    }
    private _company: Company;

    /**
     * List of takeaways.
     */
    @Input()
    public takeaways: Takeaway[] = [];

    /**
     * Dispatched when the user closes the slider.
     */
    @Output()
    public close: EventEmitter<void> = new EventEmitter<void>();

    /**
     * Constructor.
     * @param store$
     * @param route$
     */
    constructor(protected store$: Store<any>, protected route$: ActivatedRoute) {
        TakeawaysComponent.logger.debug(`constructor()`);
    }

    /**
     * Handles the close of the slider by dispatching an event
     */
    public onClose(event: any): void {
        TakeawaysComponent.logger.debug(`onClose()`);
        this.close.emit();
    }
}
