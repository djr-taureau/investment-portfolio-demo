import { Component, Input, SimpleChanges, OnInit, OnChanges, AfterContentInit } from "@angular/core";
import * as d3 from "d3";
import { DimensionsType, ScaleType } from "../../interfaces/types";
import { quarter } from "../utils";

@Component({
    selector: "[sbpAxis]",
    templateUrl: "./axis.component.html",
    styleUrls: ["./axis.component.scss"]
})
export class AxisComponent implements OnChanges, AfterContentInit {
    @Input() dimensions: DimensionsType;
    @Input() dimension: "x" | "y";
    @Input() scale: ScaleType;
    @Input() label: string;
    @Input() projectedAccessor: any;
    @Input() formatTick: any;
    @Input() yAxisVisible: boolean;
    @Input() xAxisVisible: boolean;

    axisStyles: any[];
    ticks: any;
    tickColorStyle: string;

    constructor() {
        this.dimension = "x";
        this.formatTick = d3.format(",");
        if (this.xAxisVisible) {
            console.log(this.xAxisVisible);
            this.axisStyles = ["label-display tick-display"];
        } else {
            this.axisStyles = ["label tick not-visible"];
        }
    }

    updateTicks() {
        if (!this.dimensions || !this.scale) {
            return;
        }
        this.ticks = this.scale.ticks(6);
    }

    ngAfterContentInit() {
        if (this.xAxisVisible) {
            this.axisStyles = ["label-display tick-display"];
        } else {
            this.axisStyles = ["label tick not-visible"];
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateTicks();
    }
}
