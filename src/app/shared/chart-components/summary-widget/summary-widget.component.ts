import { Component, OnInit, OnChanges, Input } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Unknown } from "@core/domain/enum/unknown.enum";
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
    dateAccessor: any;
    yAccessor: any;
    fillColor;
    display;
    isPositivePY: boolean;
    isPositiveIC: boolean;

    /**
     * Flag indicating if the widget is selected.
     */
    @Input()
    public selected = false;

    @Input() selectedPeriod: any;

    @Input()
    public availablePeriods: any[];

    /**
     * Represents the M,B,T,Q value in the widget title
     * EG: REVENUE ($M) => <title> (<currencySymbol><scale>)
     */
    public scale: string;

    /**
     * The line chart data.
     */
    @Input() lineChartData: RevenueSeriesData[];

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
     * Value for the denomination indicator in the title row
     */
    @Input()
    public denomination: string;

    @Input()
    public currencySymbol: string;
    /**
     * Value for the line graphs to display
     */
    @Input()
    public set value(val: number | string) {
        // TODO: set the MBTQ scale value here
        this._value = val;
        if (val <= 999999999) {
            this.scale = "M";
        } else if (val > 999999999 && val <= 999999999999) {
            this.scale = "B";
        } else if (val > 999999999999 && val <= 999999999999999) {
            this.scale = "T";
        }
    }
    public get value(): number | string {
        return this._value;
    }
    private _value: number | string = 0;

    /**
     * Label for the py chart value
     */
    @Input()
    public pyLabel?: string;

    @Input()
    public set pyValue(value: number) {
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

    public isUnknownValue = Unknown.isUnknownValue;

    constructor() {
        SummaryWidgetComponent.logger.debug(`constructor()`);
    }

    ngOnInit() {
        SummaryWidgetComponent.logger.debug(`ngOnInit()`);
        this.dateAccessor = (v) => this.parseDate(v.date);
        this.yAccessor = (v) => v.value;
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
