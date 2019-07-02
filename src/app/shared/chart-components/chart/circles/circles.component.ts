import { Component, Input, AfterContentInit } from "@angular/core";
import { useAccessor } from "../utils";

@Component({
    selector: "[appCircles]",
    template: `
        <svg:circle
            *ngFor="let circle of data; trackBy: keyAccessor"
            [attr.cx]="xAccessor(circle, $index)"
            [attr.cy]="yAccessor(circle, $index)"
            [attr.r]="radius"
            [ngClass]="{
                projected: condition,
                dot: !condition
            }"
        ></svg:circle>
    `,
    styleUrls: ["./circles.component.scss"]
})
export class CirclesComponent implements AfterContentInit {
    @Input() data: any[];
    @Input() keyAccessor: any;
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() radius?: 5 | null;
    accessorFunction = useAccessor;
    borderStyleProp = "border";
    borderStyleValue = "#124f8c";
    circleStyles = ["present-value"];
    condition = true;

    ngAfterContentInit(): void {
        // Called after ngOnInit when the component's or directive's content has been initialized.
        // Add 'implements AfterContentInit' to the class.
        this.condition = false;
    }
}
