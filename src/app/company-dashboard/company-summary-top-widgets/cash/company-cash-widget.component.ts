import { Component, OnInit, Input } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-company-cash-widget",
    templateUrl: "./company-cash-widget.component.html",
    styleUrls: ["./company-cash-widget.scss", "../../../shared/chart-components/summary-widget/summary-widget.component.scss"]
})
export class CompanyCashWidgetComponent implements OnInit {
    /**
     * Logger
     */
    private static logger: Logger = Logger.getLogger("CompanyCashWidgetComponent");

    /**
     * The amount of cash available for a given company.
     */
    @Input() public cash = 0;

    /**
     * Flag indicating if the widget is selected.
     */
    @Input() public selected = false;

    /**
     * Constructor.
     */
    constructor() {
        CompanyCashWidgetComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyCashWidgetComponent.logger.debug(`ngOnInit()`);
    }
}
