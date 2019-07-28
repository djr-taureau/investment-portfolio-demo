import { Component, Input, AfterContentInit, OnInit, ViewEncapsulation } from "@angular/core";
import { useAccessor } from "../utils";
import { Logger } from "@util/logger";

@Component({
    selector: "[sbpCircles]",
    template: `
        <svg:circle
            *ngFor="let circle of data; trackBy: keyAccessor"
            [attr.cx]="xAccessor(circle, $index)"
            [attr.cy]="yAccessor(circle, $index)"
            [attr.r]="radius"
            [ngClass]="circleStyles"
        ></svg:circle>
    `,
    styleUrls: ["./circles.component.scss"]
})
export class CirclesComponent implements AfterContentInit, OnInit {
    private static logger: Logger = Logger.getLogger("CirclesComponent");
    @Input() data: any[];
    @Input() valueType: string;
    @Input() keyAccessor: any;
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() projectedAccessor?: any;
    @Input() radius?: 5 | null;
    @Input() circleStyles: any[];
    @Input() visible: boolean | true;
    accessorFunction = useAccessor;
    visibleToggle: string;

    constructor() {}

    ngOnInit() {
        CirclesComponent.logger.debug(`OnInit()`);
        if (!this.visible) {
            this.visibleToggle = "not-visible";
        } else {
            this.visibleToggle = "visible";
        }
        this.circleStyles = [`dot ${this.valueType} ${this.visibleToggle}`];
    }

    ngAfterContentInit(): void {
        CirclesComponent.logger.debug(`AfterContentInit()`);
    }
}
