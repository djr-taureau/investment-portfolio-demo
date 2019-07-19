import { Component, Input, ElementRef, ViewChild } from "@angular/core";
import { select } from "d3-selection";
import { scaleLinear, ScaleBand, scaleBand } from "d3-scale";
import * as d3 from "d3";
import { DimensionsType } from "../interfaces/types";

@Component({
    selector: "sbp-chart",
    template: `
        <svg [attr.height]="dimensions.height" [attr.width]="dimensions.width">
            <svg:g>
                <ng-content></ng-content>
            </svg:g>
        </svg>
    `,
    styleUrls: ["./chart.component.scss"]
})
export class ChartComponent {
    @Input() dimensions: DimensionsType;
    @ViewChild("container") container: ElementRef<HTMLElement>;
    el: HTMLElement;

    constuctor() {
        this.el = this.container.nativeElement;
        const svg = select(this.el)
            .select("svg")
            .append("svg")
            .attr("width", this.dimensions.width)
            .attr("height", this.dimensions.height);
        svg.append("g").attr("translate(", this.dimensions.marginLeft, "px, ", this.dimensions.marginTop, "px)");
    }
}
