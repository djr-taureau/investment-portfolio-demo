import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-portfolio-dashboard-financial",
    templateUrl: "./portfolio-dashboard-financial.component.html",
    styleUrls: ["./portfolio-dashboard-financial.component.scss"]
})
export class PortfolioDashboardFinancialComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardFinancialComponent");

    // REVENUE
    @Input()
    public revenueTotalValue;

    @Input()
    public revenueSummaryLineChartData;

    @Input()
    public revenueSeries1BarChartData;

    @Input()
    public revenueSeries2BarChartData;

    @Input()
    public revenueSeries1Label = "vs PY";

    @Input()
    public revenueSeries2Label = "vs Bud";

    @Input()
    public revenueSeries1Value;

    @Input()
    public revenueSeries2Value;

    @Input()
    public revenueTitle = "Revenue";

    @Input()
    public revenueDenomination = "USD";

    @Input()
    public revenueCurrencySymbol = "$";

    // EBITDA
    @Input()
    public ebitdaTotalValue;

    @Input()
    public ebitdaSummaryLineChartData;

    @Input()
    public ebitdaSeries1BarChartData;

    @Input()
    public ebitdaSeries2BarChartData;

    @Input()
    public ebitdaSeries1Label = "vs PY";

    @Input()
    public ebitdaSeries2Label = "vs Bud";

    @Input()
    public ebitdaSeries1Value;

    @Input()
    public ebitdaSeries2Value;

    @Input()
    public ebitdaTitle = "ebitda";

    @Input()
    public ebitdaDenomination = "USD";

    @Input()
    public ebitdaCurrencySymbol = "$";

    // OUTPUTS
    @Output()
    public ebitdaClick: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public revenueClick: EventEmitter<any> = new EventEmitter<any>();

    // HANDLERS
    public onEbitdaClick($event) {
        this.ebitdaClick.emit($event);
    }

    public onRevenueClick($event) {
        this.revenueClick.emit($event);
    }

    /**
     * Constructor.
     */
    constructor() {}

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}
}
