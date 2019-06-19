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
    public value = 0;

    /**
     * Teh MOIC value.
     */
    @Input()
    public moic = 0;

    /**
     * The gross IRR value.
     */
    @Input()
    public grossIrr = 0;

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
