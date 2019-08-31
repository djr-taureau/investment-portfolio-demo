import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { expandOutFromTop } from "@shared/animations/slide.animations";
import { Logger } from "@util/logger";

@Component({
    selector: "sbp-portfolio-dashboard-financial",
    templateUrl: "./portfolio-dashboard-financial.component.html",
    styleUrls: ["./portfolio-dashboard-financial.component.scss"],
    animations: [expandOutFromTop]
})
export class PortfolioDashboardFinancialComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("PortfolioDashboardFinancialComponent");
    private _revenueSeries1BarChartData;
    private _revenueSeries2BarChartData;

    @Input()
    public selectedPeriod: any;

    // REVENUE
    @Input()
    public revenueTotalValue;

    @Input()
    public revenueSummaryLineChartData;

    @Input()
    public set revenueSeries1BarChartData(value) {
        PortfolioDashboardFinancialComponent.logger.debug(`revenueSeries1BarChartData:${JSON.stringify(value)}`);
        this._revenueSeries1BarChartData = value;
    }
    public get revenueSeries1BarChartData() {
        return this._revenueSeries1BarChartData;
    }

    @Input()
    public set revenueSeries2BarChartData(value) {
        PortfolioDashboardFinancialComponent.logger.debug(`revenueSeries2BarChartData:${JSON.stringify(value)}`);
        this._revenueSeries2BarChartData = value;
    }
    public get revenueSeries2BarChartData() {
        return this._revenueSeries2BarChartData;
    }

    @Input()
    public revenueSeries1Label;

    @Input()
    public revenueSeries2Label;

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

    @Input()
    public showRevenueDetail = false;

    @Input()
    public showCashDetail = false;

    @Input()
    public showEBITDADetail = false;

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
