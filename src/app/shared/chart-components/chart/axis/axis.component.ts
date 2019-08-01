import { Component, Input, SimpleChanges, OnInit, OnChanges, AfterContentInit, ElementRef, ViewChild } from "@angular/core";
import * as d3 from "d3";
import { DimensionsType, ScaleType } from "../../interfaces/types";
import { select } from "d3-selection";

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
    @Input() xAxisTickValues?: any[];
    @Input() yAxisTickValues?: any[];
    @Input() numberOfTicks?: any;
    @Input() yAxisGrid?: any;
    @Input() xAxisBottom?: any;

    @ViewChild("axisBottom") axisBottom: ElementRef;
    el: HTMLElement;
    yAxisStyles: any[];
    xAxisStyles: any[];
    ticks: any;
    tickColorStyle: string;
    textAnchor: string;

    constructor(private elementRef: ElementRef) {
        this.dimension = "x";
        this.formatTick = d3.format(",");
        this.textAnchor = "start";
        const dateSelected = "4Q2018";

        if (this.xAxisVisible) {
            this.xAxisStyles = ["label label-display tick-display"];
        } else {
            this.xAxisStyles = ["label tick not-visible"];
        }
        if (this.yAxisVisible) {
            this.yAxisStyles = ["label label-display tick-display"];
        } else {
            this.yAxisStyles = ["label tick not-visible"];
        }
    }

    updateTicks() {
        const dateSelected = "4Q2018";
        if (!this.dimensions || !this.scale) {
            return;
        }
        if (this.numberOfTicks) {
            this.ticks = this.scale.ticks(this.numberOfTicks);
        }
    }

    ngAfterContentInit() {
        this.updateTicks();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateTicks();
    }
}
