import { Component, Input, SimpleChanges, OnChanges, AfterContentInit } from "@angular/core";
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
