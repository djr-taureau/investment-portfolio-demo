import { Component, Input, SimpleChanges, OnChanges } from "@angular/core";
import * as d3 from "d3";
import { DimensionsType, ScaleType } from "../../interfaces/types";

@Component({
    selector: "[sbpAxis]",
    templateUrl: "./axis.component.html",
    styleUrls: ["./axis.component.scss"]
})
export class AxisComponent implements OnChanges {
    @Input() dimensions: DimensionsType;
    @Input() dimension: "x" | "y";
    @Input() scale: ScaleType;
    @Input() label: string;
    @Input() formatTick = d3.format(",");
    ticks: any;

    constructor() {
        this.dimension = "x";
        this.formatTick = d3.format(",");
    }

    updateTicks() {
        if (!this.dimensions || !this.scale) {
            return;
        }
        // todo: djr-taureau figure out if we still need this
        // const numberOfTicks =
        //     this.dimension === "x"
        //         ? this.dimensions.boundedWidth < 600
        //             ? this.dimensions.boundedWidth / 200
        //             : this.dimensions.boundedWidth / 250
        //         : this.dimensions.boundedHeight / 80;

        this.ticks = this.scale.ticks(5);
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateTicks();
    }
}
