import { AfterContentInit, Component, Input, OnInit } from "@angular/core";
import { Logger } from "@util/logger";
import { useAccessor } from "../utils";

@Component({
    selector: "[sbpCircles]",
    template: `
        <ng-container *ngFor="let circle of data; trackBy: keyAccessor">
            <svg:circle
                *ngIf="circle || visible"
                [attr.cx]="accessorFunction(xAccessor, circle)"
                [attr.cy]="accessorFunction(yAccessor, circle)"
                [attr.r]="radius"
                [ngClass]="circleStyles"
            ></svg:circle>
        </ng-container>
    `,
    styleUrls: ["./circles.component.scss"]
})
export class CirclesComponent implements AfterContentInit, OnInit {
    private static logger: Logger = Logger.getLogger("CirclesComponent");
    @Input() data: any[];
    @Input() selectedPeriod: any;
    @Input() valueType: string;
    @Input() keyAccessor: any;
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() radius?: 5 | null;
    @Input() circleStyles: any[];
    @Input() visible: boolean | true;
    accessorFunction = useAccessor;
    visibleToggle: string;
    dateSelected: string;

    constructor() {}

    ngOnInit() {
        if (!this.data) {
            return;
        }
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
