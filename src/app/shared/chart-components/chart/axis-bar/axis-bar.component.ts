import { Component, Input, SimpleChanges, OnChanges, AfterContentInit } from "@angular/core";
import * as d3 from "d3";
import { DimensionsType, ScaleType } from "../../interfaces/types";
import { quarter } from "../utils";

@Component({
    selector: "[sbpAxisBar]",
    templateUrl: "./axis-bar.component.html",
    styleUrls: ["./axis-bar.component.scss"]
})
export class AxisBarComponent implements OnChanges, AfterContentInit {
    @Input() dimensions: DimensionsType;
    @Input() dimension: "x" | "y";
    @Input() scale: ScaleType;
    @Input() tickFormat: any;
    @Input() orient: string;
    @Input() label: string;
    @Input() projectedAccessor: any;
    @Input() formatTick: any;
    ticks: any;
    tickColorStyle: string;

    constructor() {
        this.dimension = "x";
        this.formatTick = d3.format(",");
    }

    updateTicks() {
        if (!this.dimensions || !this.scale) {
            return;
        }
        this.ticks = this.scale.ticks(6);
    }

    ngAfterContentInit() {
        if (this.projectedAccessor) {
            // todo hold for testing
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateTicks();
    }
}

// svg.append("line")
//     .attr("x1", -6)
//     .attr("y1", y(0))//so that the line passes through the y 0
//     .attr("x2", width)
//     .attr("y2", y(0))//so that the line passes through the y 0
//     .style("stroke", "black");
