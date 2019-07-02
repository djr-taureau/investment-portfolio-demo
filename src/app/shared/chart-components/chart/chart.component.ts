import { Component, Input } from "@angular/core";
import { DimensionsType } from "../interfaces/types";

@Component({
    selector: "sbp-chart",
    templateUrl: "./chart.component.html",
    styleUrls: ["./chart.component.scss"]
})
export class ChartComponent {
    @Input() dimensions: DimensionsType;
}
