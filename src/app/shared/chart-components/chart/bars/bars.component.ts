import { Component, Input, AfterContentInit, OnInit } from "@angular/core";
import { useAccessor } from "../utils";
import * as _ from "lodash";

@Component({
    selector: "[sbpBars]",
    template: `
        <ng-container *ngFor="let bar of data; trackBy: keyAccessor">
            <svg:rect
                [attr.x]="accessorFunction(xAccessor, bar, $index)"
                [attr.y]="accessorFunction(yAccessor, bar, $index)"
                [attr.width]="10"
                [attr.height]="accessorFunction(heightAccessor, bar, $index)"
                [attr.stroke-width]="'2'"
                [ngClass]="{
                    'projected-positive': projectedValue,
                    'historical-negative': !projectedValue
                }"
            ></svg:rect>
        </ng-container>
    `,
    styleUrls: ["./bars.component.scss"]
})
export class BarsComponent implements AfterContentInit, OnInit {
    @Input() data: any[];
    @Input() sourceValues: any[];
    @Input() keyAccessor: any;
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() projectedAccessor: any;
    @Input() sourceTypeAccessor: any;
    @Input() projected: boolean;
    @Input() widthAccessor: any;
    @Input() heightAccessor: any;
    @Input() boundedHeight: any;
    @Input() fill?: string;
    accessorFunction = useAccessor;
    projectedValue: boolean;
    positiveValue: boolean;
    newYAccessor: any;
    indexSelected;

    max = Math.max;
    min = Math.min;
    barStyle = "historical-negative";
    barStylePositive = "historical-negative";

    constructor() {}

    ngOnInit() {
        // this.heightAccessor = (d) => Math.abs(this.yAccessor(d) * 10);
        // this.heightAccessor = (d) => Math.abs(this.yAccessor(d) - this.yAccessor(0));
        // this.newYAccessor = (d) => (d > 0 ? this.yAccessor(d) : this.yAccessor(0));
    }

    ngAfterContentInit() {
        this.sourceValues.map((v) => {
            if (this.sourceTypeAccessor) {
                if (this.sourceTypeAccessor(v) === "B") {
                    this.projectedValue = true;
                } else {
                    this.projectedValue = false;
                }
            }
        });
    }
}
