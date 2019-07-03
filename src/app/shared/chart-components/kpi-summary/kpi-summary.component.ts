import { numberToSignedString } from "./string.utli";
import { Component, OnInit, Input } from "@angular/core";
import * as d3 from "d3";
import { TimelineDataPointFin } from "../interfaces/types";

@Component({
    selector: "sbp-kpi-summary",
    templateUrl: "./kpi-summary.component.html",
    styleUrls: ["./kpi-summary.component.scss"]
})
export class KpiSummaryComponent implements OnInit {
    parseDate = d3.timeParse("%m/%d/%Y");
    dateAccessor: any;
    financialsAccessor: any;
    projectedAccessor: any;
    pyAccessor: any;
    icAccessor: any;
    fillColor;
    display;

    /**
     * The title for the widget
     */
    @Input() data: TimelineDataPointFin[];
    @Input()
    public title: string;

    /**
     * Value for the denomitation indicator in the title row
     */
    @Input()
    public denomination: string;

    /**
     * Value for the line graphs to display
     */
    @Input()
    public value: number;

    /**
     * Label for the py chart value
     */
    @Input()
    public pyLabel: string;

    /**
     * Input for the pyValue on the graph
     * creates two local props, one for evaluation
     * in view and the other for display
     */
    @Input()
    set pyValue(value: number) {
        this.pyString = numberToSignedString(value);
        this.py = value;
    }
    public py: number;
    public pyString: string;

    @Input()
    public icLabel: string;

    @Input()
    set icValue(value: number) {
        this.icString = numberToSignedString(value);
        this.ic = value;
    }
    public ic: number;
    public icString: string;

    constructor() {}

    ngOnInit() {
        this.data.map(() => {
            // todo : figure out how to get this to work
            this.dateAccessor = (v) => this.parseDate(v.date);
            this.financialsAccessor = (v) => v.value;
            this.projectedAccessor = (v) => v.projected;
            this.pyAccessor = (v) => v.PY;
            this.icAccessor = (v) => v.IC;
        });
    }
}