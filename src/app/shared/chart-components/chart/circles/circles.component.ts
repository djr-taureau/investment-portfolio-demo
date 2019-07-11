import { DomSanitizer } from "@angular/platform-browser";
import { Component, Input, AfterContentInit, OnInit, ViewEncapsulation } from "@angular/core";
import { useAccessor } from "../utils";
import { Logger } from "@util/logger";

@Component({
    selector: "[sbpCircles]",
    template: `
        <ng-container>
            <svg:circle
                class="dot"
                *ngFor="let circle of data; trackBy: keyAccessor"
                [attr.cx]="xAccessor(circle, $index)"
                [attr.cy]="yAccessor(circle, $index)"
                [attr.r]="5"
                [ngClass]="{
                    projected: presentValue,
                    dot: !presentValue
                }"
            ></svg:circle>
        </ng-container>
    `,
    styleUrls: ["./circles.component.scss"]
})
export class CirclesComponent implements AfterContentInit, OnInit {
    private static logger: Logger = Logger.getLogger("CirclesComponent");
    @Input() data: any[];
    @Input() keyAccessor: any;
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() projectedAccessor?: any;
    @Input() radius?: 5 | null;
    accessorFunction = useAccessor;
    borderStyleProp = "border";
    borderStyleValue = "#124f8c";
    circleStyles = ["dot"];
    presentValue: boolean;

    constructor(private domSanitizer: DomSanitizer) {}

    ngOnInit() {
        CirclesComponent.logger.debug(`OnInit()`);
        // this.presentValue = true;
    }

    ngAfterContentInit(): void {
        CirclesComponent.logger.debug(`AfterContentInit()`);
        this.presentValue = true;
    }
}
