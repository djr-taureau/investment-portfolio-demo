import { Component, Input, AfterContentInit, OnInit } from "@angular/core";
import { useAccessor } from "../utils";

@Component({
    selector: "[sbpBars]",
    template: `
        <ng-container *ngFor="let bar of data; trackBy: keyAccessor">
            <svg:rect
                [attr.x]="accessorFunction(xAccessor, bar)"
                [attr.y]="accessorFunction(yAccessor, bar)"
                [attr.width]="max(accessorFunction(widthAccessor, bar), 0)"
                [attr.height]="max(accessorFunction(heightAccessor, bar), 0)"
                [attr.stroke-width]="'3'"
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
    @Input() keyAccessor: any;
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() projectedAccessor: any;
    @Input() projected: boolean;
    @Input() widthAccessor: any;
    @Input() heightAccessor: any;
    @Input() boundedHeight: any;
    @Input() fill?: string;
    accessorFunction = useAccessor;
    projectedValue: boolean;
    positiveValue: boolean;
    newYAccessor: any;

    max = Math.max;
    min = Math.min;
    barStyle = "historical-negative";
    barStylePositive = "historical-negative";

    constructor() {}

    ngOnInit() {
        this.heightAccessor = (d) => Math.abs(this.yAccessor(d) - this.yAccessor(0));
        this.newYAccessor = (d) => (d > 0 ? this.yAccessor(d) : this.yAccessor(0));
    }

    ngAfterContentInit() {
        this.data.map((v) => {
            if (this.projectedAccessor) {
                if (this.projectedAccessor(v)) {
                    this.projectedValue = this.projectedAccessor(v);
                } else {
                    this.projectedValue = this.projectedAccessor(v);
                }
            }
            if (v.date > Date.now().toString()) {
                const projected = true;
            }
        });
    }
}
