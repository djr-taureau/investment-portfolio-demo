import {
    Component,
    Input,
    ViewChild,
    ElementRef,
    AfterContentInit,
    OnChanges,
    OnInit,
    SimpleChanges,
    HostListener,
    ViewEncapsulation
} from "@angular/core";
import * as d3 from "d3";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";
import { TimelineDataPointFin } from "../interfaces/types";
import { Logger } from "@util/logger";
@Component({
    selector: "sbp-micro-timeline",
    templateUrl: "./micro-timeline.component.html",
    styleUrls: ["./micro-timeline.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class MicroTimelineComponent implements OnInit, AfterContentInit, OnChanges {
    private static logger: Logger = Logger.getLogger("MicroTimelineComponent");

    @Input() data: any[];
    @Input() label: string;
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() projectedAccessor: any;
    @ViewChild("container") container: ElementRef;

    keyAccessor: any;
    dimensions: DimensionsType;
    xScale: ScaleType;
    yScale: ScaleType;

    xAccessorScaled: any;
    yAccessorScaled: any;
    colorAccessorScaled: any;
    y0AccessorScaled: any;
    formatDate = d3.timeFormat("%-b %-d");
    gradientId = getUniqueId("Timeline-gradient");
    gradientColors = ["rgb(226, 222, 243)", "#47a2d6"];

    fillColor;
    display = false;
    xAxisVisible = false;
    // TODO:: these will be replaced soon with the real data
    historicalData: TimelineDataPointFin[];
    projectedData: TimelineDataPointFin[];

    constructor() {
        MicroTimelineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 20,
            marginRight: 11,
            marginBottom: 37.5,
            marginLeft: 1,
            height: 110,
            width: 120
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

    ngOnInit() {
        MicroTimelineComponent.logger.debug(`ngOnInit()`);

        if (this.projectedAccessor) {
            this.historicalData = this.data.filter((v) => v.projected === false);
            this.projectedData = this.data.filter((v) => v.projected === true);
        }
        this.updateDimensions();
    }

    ngAfterContentInit() {
        MicroTimelineComponent.logger.debug(`ngAfterContentInit()`);
        this.updateDimensions();
    }

    // TODO:: This is not working on the micro charting components
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
