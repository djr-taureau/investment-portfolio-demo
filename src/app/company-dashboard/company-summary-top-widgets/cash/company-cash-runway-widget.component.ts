import { Component, OnInit, Input } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-company-cash-runway-widget",
    templateUrl: "./company-cash-runway-widget.component.html",
    styleUrls: ["./company-cash-widget.scss", "../../../shared/chart-components/summary-widget/summary-widget.component.scss"]
})
export class CompanyCashRunwayWidgetComponent implements OnInit {
    /**
     * Logger
     */
    private static logger: Logger = Logger.getLogger("CompanyCashRunwayWidgetComponent");

    /**
     * The amount of months the cash will last for a given company.
     */
    @Input() runwayInMonths = 0;

    /**
     * Flag indicating if the widget is selected.
     */
    @Input() public selected = false;

    /**
     * Constructor.
     */
    constructor() {
        CompanyCashRunwayWidgetComponent.logger.debug(`constructor()`);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyCashRunwayWidgetComponent.logger.debug(`ngOnInit()`);
    }
}
