import { Component, Input, AfterContentInit, OnInit } from "@angular/core";
import { useAccessor } from "../utils";

@Component({
    selector: "[sbpBars]",
    template: `
        <svg:rect
            *ngFor="let bar of data; trackBy: keyAccessor"
            [attr.x]="accessorFunction(xAccessor, bar)"
            [attr.y]="accessorFunction(yAccessor, bar, $index)"
            [attr.width]="max(accessorFunction(widthAccessor, bar, $index), 0)"
            [attr.height]="max(accessorFunction(heightAccessor, bar, $index), 0)"
            [attr.stroke-width]="'5'"
            [ngClass]="{
                'projected-positive': condition,
                'projected-negative': !condition
            }"
        ></svg:rect>
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
    @Input() fill?: string;
    accessorFunction = useAccessor;
    max = Math.max;
    barStyle = "projected-positive";
    barStylePositive = "historical-negative";
    barStyle3 = "blinking";
    blink = false;
    condition = true;

    constructor() {}

    ngOnInit() {}

    ngAfterContentInit() {}
}
