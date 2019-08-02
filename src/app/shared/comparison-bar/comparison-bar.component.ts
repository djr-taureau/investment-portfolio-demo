import { Component, Input } from "@angular/core";

@Component({
    selector: "sbp-comparison-bar",
    templateUrl: "./comparison-bar.component.html",
    styleUrls: ["./comparison-bar.component.scss"]
})
export class ComparisonBarComponent {
    @Input()
    public value1 = 30;

    @Input()
    public value2 = 60;

    @Input()
    public value3 = 100;

    constructor() {}
}
