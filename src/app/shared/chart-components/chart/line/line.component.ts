import { Component, Input, OnChanges, SimpleChanges, OnInit, AfterContentInit, ViewEncapsulation } from "@angular/core";
import * as d3 from "d3";
import { curveLinear } from "d3-shape";

@Component({
    selector: "[sbpLine]",
    template: `
        <svg:path
            [ngClass]="type"
            [ngClass]="projectedAccessor"
            [attr.d]="lineString"
            [ngClass]="{
                projected: projectedValue,
                line: !projectedValue
            }"
        ></svg:path>
    `,
    styleUrls: ["./line.component.scss"]
})
export class LineComponent implements OnChanges, AfterContentInit {
    @Input() type: "area" | "line" = "line";
    @Input() fillColor: string;
    @Input() data: any[];
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() projectedAccessor?: any;
    @Input() colorAccessor: any;
    @Input() y0Accessor?: any;
    @Input() interpolation?: any;
    @Input() fill?: string;
    lineString: any;
    projectedValue = null;
    stroke = null;
    lineStyle: string;
    line;

    updateLineString(): void {
        this.interpolation = curveLinear;
        const lineGenerator = d3[this.type]()
            .x(this.xAccessor)
            .y(this.yAccessor)
            .curve(this.interpolation);

        if (this.type === "area") {
            lineGenerator.y0(this.y0Accessor).y1(this.yAccessor);
        }

        if (this.type === "line") {
            this.data.map((v) => {
                if (this.projectedAccessor) {
                    if (this.projectedAccessor(v)) {
                        this.projectedValue = this.projectedAccessor(v);
                    } else {
                        this.projectedValue = this.projectedAccessor(v);
                    }
                }
            });
        }
        this.lineString = lineGenerator(this.data);
    }

    ngAfterContentInit() {
        // TODO:: Still working on this
        // this.historical = this.data.filter((v) => v.projected === false);
        // this.projected = this.data.filter((v) => v.projected === true);
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.updateLineString();
    }
}
