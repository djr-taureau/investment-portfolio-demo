import { numberToSignedString } from "./string.utli";
import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3";
import { Logger } from "@util/logger";
@Component({
    selector: "sbp-kpi-summary",
    templateUrl: "./kpi-summary.component.html",
    styleUrls: ["./kpi-summary.component.scss"]
})
export class KpiSummaryComponent implements OnInit {
    private static logger: Logger = Logger.getLogger("KpiSummaryComponent");

    parseDate = d3.timeParse("%m/%d/%Y");
    dateAccessor: any;
    financialsAccessor: any;
    yAccessor: any;
    categoryAccessor: any;
    projectedAccessor: any;
    pyAccessor: any;
    icAccessor: any;
    fillColor;
    display;
    timelineId: string;
    barId: string;
    bar2Id: string;

    /**
     * The title for the widget
     */
    @Input() data: any[];

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
    public value: number;

    /**
     * Label for the py chart value
     */
    @Input()
    public pyLabel?: string;

    @Input()
    set pyValue(value: number) {
        this.pyString = numberToSignedString(value);
        this.py = value;
    }
    public py?: number;
    public pyString?: string;

    @Input()
    public icLabel?: string;

    @Input()
    set icValue(value: number) {
        this.icString = numberToSignedString(value);
        this.ic = value;
    }
    public ic?: number;
    public icString?: string;

    constructor() {
        KpiSummaryComponent.logger.debug(`constructor()`);
    }

    ngOnInit() {
        KpiSummaryComponent.logger.debug(`ngOnInit()`);
        this.dateAccessor = (v) => this.parseDate(v.date);
        this.categoryAccessor = (v) => `${v.quarter}Q${v.year}`;
        this.financialsAccessor = (v) => v.value;
        this.projectedAccessor = (v) => v.projected;
        this.pyAccessor = (v) => v.PY;
        this.icAccessor = (v) => v.IC;
        this.yAccessor = (v) => v.amountInUSD;
    }
}
