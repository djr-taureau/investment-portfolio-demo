import { Component, Input, OnChanges, SimpleChanges, OnInit, AfterContentInit } from "@angular/core";
import * as d3 from "d3";
import { curveLinear } from "d3-shape";

@Component({
    selector: "[appLine]",
    template: `
        <svg:path
            [ngClass]="type"
            [attr.d]="lineString"
            [ngClass]="{
                projected: condition,
                line: !condition
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
    @Input() colorAccessor: any;
    @Input() y0Accessor?: any;
    @Input() interpolation?: any;
    @Input() fill?: string;
    lineString: any;
    condition = false;

    updateLineString(): void {
        this.interpolation = curveLinear;
        const lineGenerator = d3[this.type]()
            .x(this.xAccessor)
            .y(this.yAccessor)
            .curve(this.interpolation);
        // todo : figure out how to get the area from the line instance.
        // if (this.type == "area") {
        //   lineGenerator.y0(this.y0Accessor).y1(this.yAccessor);
        // }
        this.lineString = lineGenerator(this.data);
        // this.lineString.y0(this.y0Accessor).y1(this.yAccessor);
    }

    ngAfterContentInit() {
        console.log("fill", this.fill);
        this.condition = true;
    }
    ngOnChanges(changes: SimpleChanges): void {
        this.updateLineString();
    }
}
