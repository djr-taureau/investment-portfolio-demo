import { TimelineDataPoint } from "../interfaces/types";
import { Component, Input, ViewChild, ElementRef, AfterContentInit, OnChanges, SimpleChanges, HostListener } from "@angular/core";
import * as d3 from "d3";
import { DimensionsType, getUniqueId } from "../chart/utils";
import { ScaleType } from "../interfaces/types";
import { TimelineDataPointFin } from "../interfaces/types";
@Component({
    selector: "sbp-micro-histogram",
    templateUrl: "./micro-histogram.component.html",
    styleUrls: ["./micro-histogram.component.scss"]
})
export class MicroHistogramComponent implements AfterContentInit, OnChanges {
    @Input() data: any[];
    @Input() label: string;
    @Input() xAccessor: any;
    @Input() projectedAccessor: any;
    @Input() pyAccessor?: any;
    @Input() icAccessor?: any;

    dimensions: DimensionsType;
    xAccessorScaled: any;
    yAccessorScaled: any;
    projectedAccessorScaled;
    xScale: ScaleType;
    yScale: ScaleType;
    widthAccessorScaled: any;
    heightAccessorScaled: any;
    keyAccessor: any;
    barFillStyle;

    bins: any[];
    gradientId: string = getUniqueId("Histogram-gradient");
    gradientColors: string[] = ["#9980FA", "rgb(226, 222, 243)"];
    barId: string = getUniqueId("Histogram-bar");
    barColor = "#eb643f";
    @ViewChild("container") container: ElementRef;

    constructor() {
        this.dimensions = {
            marginTop: 7.5,
            marginRight: 2.4,
            marginBottom: 3.96,
            marginLeft: 5.4,
            height: 60,
            width: 71,
            boundedHeight: 60,
            boundedWidth: 71
        };
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
    }

    updateDimensions() {
        const width = this.container.nativeElement.offsetWidth;
        this.dimensions.width = this.container.nativeElement.offsetWidth;
        this.dimensions.boundedWidth = Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0);
        this.updateScales();
    }

    @HostListener("window:resize", ["$event"])
    onResize() {
        this.updateDimensions();
    }

    ngAfterContentInit() {
        this.updateDimensions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateScales();
    }

    updateScales() {
        if (!this.data) {
            return;
        } else {
            const numberOfThresholds = 5;
            this.data.map((v) => {
                if (v.projected) {
                    this.barFillStyle = true;
                }
            });

            this.xScale = d3
                .scaleLinear()
                .domain(d3.extent(this.data, this.xAccessor) as [Date, Date])
                .range([0, this.dimensions.boundedWidth])
                .nice(numberOfThresholds);

            const binsGenerator = d3
                .histogram()
                .domain(this.xScale.domain())
                .value(this.xAccessor)
                .thresholds(this.xScale.ticks(numberOfThresholds));

            this.bins = binsGenerator(this.data);

            const yAccessor = (d) => d.length;
            this.yScale = d3
                .scaleLinear()
                // .domain([0, d3.max(this.bins, yAccessor)])
                .domain(d3.extent(this.bins, yAccessor))
                .range([this.dimensions.boundedHeight, 0])
                .nice();

            const barPadding = 2;

            this.xAccessorScaled = (d) => this.xScale(d.x0) + barPadding;
            this.yAccessorScaled = (d) => this.yScale(yAccessor(d));

            this.widthAccessorScaled = (d) => this.xScale(d.x1) - this.xScale(d.x0) - barPadding;
            this.heightAccessorScaled = (d) => this.dimensions.boundedHeight - this.yScale(yAccessor(d));
            this.keyAccessor = (i) => i;
        }
    }
}
