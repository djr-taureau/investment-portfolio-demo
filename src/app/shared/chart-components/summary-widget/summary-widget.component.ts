import { Component, OnInit, OnChanges, Input, HostBinding } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";

@Component({
    selector: "sbp-summary-widget",
    templateUrl: "./summary-widget.component.html",
    styleUrls: ["./summary-widget.component.scss"]
})
export class SummaryWidgetComponent implements OnInit, OnChanges {
    private static logger: Logger = Logger.getLogger("SummaryWidgetComponent");

    parseDate = d3.timeParse("%Y-%m-%d");
    // parseDate = d3.timeParse("%YYYY-%mm-%dd");
    // X-Axis
    categoryAccessor: any;
    // X-Axis
    dateAccessor: any;
    yAccessor: any;
    projectedAccessor: any;
    fillColor;
    display;
    isPositivePY: boolean;
    isPositiveIC: boolean;

    @Input() selectedPeriod: any;
    /**
     * The line chart data.
     */
    @Input() data: RevenueSeriesData[];

    /**
     * The first bar chart's data.
     */
    @Input() barChartData1: RevenueSeriesData[];

    /**
     * The second bar chart's data.
     */
    @Input() barChartData2: RevenueSeriesData[];

    @Input()
    public title: string;

    /**
     * Value for the denomitation indicator in the title row
     */
    @Input()
    public denomination: string;

    @Input()
    public currencySymbol: string;
    /**
     * Value for the line graphs to display
     */
    @Input()
    public value: number | string;

    /**
     * Label for the py chart value
     */
    @Input()
    public pyLabel?: string;

    @Input()
    set pyValue(value: number) {
        this.py = value;
    }
    public py?: number;
    // public pyString?: string;

    @Input()
    public icLabel?: string;

    @Input()
    set icValue(value: number) {
        this.ic = value;
    }
    public ic?: number;

    public yAccessorValue: string;
    // public icString?: string;

    constructor() {
        SummaryWidgetComponent.logger.debug(`constructor()`);
    }

    ngOnInit() {
        SummaryWidgetComponent.logger.debug(`ngOnInit()`);
        this.dateAccessor = (v) => this.parseDate(v.date);
        this.yAccessor = (v) => v.amountInNative;
        this.categoryAccessor = (v) => `${v.financialQuarter}Q${v.date.substr(2, 2)}`;
        this.projectedAccessor = (v) => v.projection;
        this.checkCurrencyValue(this.denomination);
    }

    ngOnChanges() {
        if (this.py < 0) {
            this.isPositivePY = false;
        } else {
            this.isPositivePY = true;
        }
        if (this.ic < 0) {
            this.isPositiveIC = false;
        } else {
            this.isPositiveIC = true;
        }
        if (this.value === 0) {
            this.value = "NA";
        }
        this.checkCurrencyValue(this.denomination);
    }

    checkCurrencyValue(value: string) {
        if (value === "USD") {
            this.yAccessorValue = "valueInUSD";
        } else {
            this.yAccessorValue = "valueInNative";
        }
    }
}
