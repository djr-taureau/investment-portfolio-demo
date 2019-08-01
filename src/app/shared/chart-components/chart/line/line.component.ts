import { Component, Input, OnChanges, SimpleChanges, OnInit } from "@angular/core";
import * as d3 from "d3";
import { curveLinear } from "d3-shape";

@Component({
    selector: "[sbpLine]",
    template: `
        <svg:path [ngClass]="pathStyles" [attr.d]="lineString"></svg:path>
    `,
    styleUrls: ["./line.component.scss"]
})
export class LineComponent implements OnChanges, OnInit {
    @Input() type: "area" | "line" = "line";
    @Input() valueType: string;
    @Input() fillColor: string;
    @Input() data: any[];
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() projectedAccessor?: any;
    @Input() colorAccessor: any;
    @Input() y0Accessor?: any;
    @Input() interpolation?: any;
    @Input() fill?: string;
    @Input() visible: boolean | true;

    visibleToggle: string | "visible";
    lineString: any;
    projectedValue = null;
    stroke = null;
    line;
    pathStyles;
    projectedStyles;
    historicalData;
    projectedData;

    constructor() {}

    ngOnInit() {
        this.historicalData = this.data.filter((v) => v.projected === false);
        this.projectedData = this.data.filter((v) => v.projected === true);
    }

    updateLineString(): void {
        console.log("micro", this.data);
        this.interpolation = curveLinear;
        const lineGenerator = d3[this.type]()
            .x(this.xAccessor)
            .y(this.yAccessor)
            .curve(this.interpolation);
        if (this.type === "area") {
            lineGenerator.y0(this.y0Accessor).y1(this.yAccessor);
            this.pathStyles = ["area"];
        }
        if (this.type === "line") {
            this.pathStyles = [`line ${this.valueType}`];
        }
        if (!this.visible && this.type !== "area") {
            this.visibleToggle = "not-visible";
            this.pathStyles = [`line ${this.valueType} ${this.visibleToggle}`];
        }
        this.lineString = lineGenerator(this.data);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateLineString();
    }
}
