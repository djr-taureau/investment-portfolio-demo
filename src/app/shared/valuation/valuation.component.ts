import { Component, Input, OnInit } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-valuation",
    templateUrl: "./valuation.component.html",
    styleUrls: ["./valuation.component.scss"]
})
export class ValuationComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("ValuationComponent");

    /**
     * The string header label for the component.
     */
    @Input()
    public header = "";

    /**
     * The value.
     */
    @Input()
    public value;

    /**
     * Teh MOIC value.
     */
    @Input()
    public moic;

    /**
     * The gross IRR value.
     */
    @Input()
    public grossIrr;

    /**
     * Controls display of the moic and irr values based upon collapsed or expanded
     */
    @Input()
    public columnar = false;

    /**
     * Constructor.
     */
    constructor() {
        ValuationComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        ValuationComponent.logger.debug(`ngOnInit()`);
    }
}
