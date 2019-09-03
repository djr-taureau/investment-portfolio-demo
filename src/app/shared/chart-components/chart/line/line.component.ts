import { Component, Input, OnChanges, SimpleChanges, OnInit, HostBinding } from "@angular/core";
import * as d3 from "d3";
import { curveLinear } from "d3-shape";

@Component({
    selector: "[sbpLine]",
    template: `
        <svg:path [ngClass]="pathStyles" [attr.d]="lineString"></svg:path>
    `,
    styleUrls: ["./line.component.scss"]
})
export class LineComponent implements OnChanges {
    @Input() type: "area" | "line" | "projected-line";
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
    @Input() visible = true;

    @HostBinding("class.projected") projected = false;

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

    updateLineString(): void {
        if ((this.data || []).length < 1 || !this.xAccessor || !this.yAccessor) {
            return;
        }
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
        this.lineString = lineGenerator(this.data || []);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateLineString();
    }
}

export const line = d3
    .line()
    .defined((d) => !isNaN(this.yAccessor(d)) && d)
    .x((d) => this.xAccessor(d))
    .y((d) => this.yAccessor(d))
    .curve(curveLinear);
