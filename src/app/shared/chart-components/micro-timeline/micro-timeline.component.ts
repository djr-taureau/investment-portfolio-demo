import { Component, Input, ViewChild, ElementRef, AfterContentInit, OnChanges, OnInit, SimpleChanges, HostListener } from "@angular/core";
import * as d3 from "d3";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";
import { TimelineDataPoint, TimelineDataPointFin } from "../interfaces/types";

@Component({
    selector: "app-micro-timeline",
    templateUrl: "./micro-timeline.component.html",
    styleUrls: ["./micro-timeline.component.scss"]
})
export class MicroTimelineComponent implements OnInit, AfterContentInit, OnChanges {
    @Input() data: any[];
    @Input() label: string;

    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() projectedAccessor: any;

    dimensions: DimensionsType;
    xScale: ScaleType;
    yScale: ScaleType;
    //  colorScale: any;

    xAccessorScaled: any;
    yAccessorScaled: any;
    colorAccessorScaled: any;
    y0AccessorScaled: any;
    formatDate = d3.timeFormat("%-b %-d");
    gradientId = getUniqueId("Timeline-gradient");
    gradientColors = ["rgb(226, 222, 243)", "#47a2d6"];
    // projectedStyleId = getUniqueId("Timeline-projected");
    // projectedStyle = "#47a2d6";
    @ViewChild("container") container: ElementRef;
    fillColor;
    display = false;
    // * expermenting with margins and dimensions

    constructor() {
        this.dimensions = {
            marginTop: 20,
            marginRight: 11,
            marginBottom: 37.5,
            marginLeft: 3,
            height: 150,
            width: 300
        };
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
        console.log("data", this.data);
    }

    updateDimensions() {
        const width = this.container.nativeElement.offsetWidth;
        this.dimensions.width = this.container.nativeElement.offsetWidth;
        this.dimensions.boundedWidth = Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0);
        console.log("data", this.data);
        this.updateScales();
    }

    ngOnInit() {
        this.updateDimensions();
    }

    ngAfterContentInit() {
        this.data.map((v) => {
            let idx = 0;
            idx = idx + 1;
            if (v.projected) {
                console.log("dotted");
                this.fillColor = "light-grey";
                this.display = true;
            }
        });
        this.updateDimensions();
    }

    @HostListener("window:resize", ["$event"])
    onResize() {
        this.updateDimensions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateScales();
    }

    updateScales() {
        this.xScale = d3
            .scaleTime()
            .domain(d3.extent(this.data, this.xAccessor) as [Date, Date])
            .range([0, this.dimensions.boundedWidth])
            .nice();

        this.yScale = d3
            .scaleLinear()
            .domain(d3.extent(this.data, this.yAccessor) as [number, number])
            .range([this.dimensions.boundedHeight, 0])
            .nice();

        this.xAccessorScaled = (d) => this.xScale(this.xAccessor(d));
        this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
    }
}
