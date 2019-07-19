import { Component, Input, ViewChild, ElementRef, OnInit, AfterContentInit, OnChanges, SimpleChanges, HostListener } from "@angular/core";
import * as d3 from "d3";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";
import { Logger } from "@util/logger";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import { revenue, ebitda, cashburn, revenueArr, revenueMock, revenueMock2 } from "../../../company-dashboard/financials-data";
import * as _ from "lodash";
@Component({
    selector: "sbp-timeline",
    templateUrl: "./timeline.component.html",
    styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements OnInit, AfterContentInit, OnChanges {
    private static logger: Logger = Logger.getLogger("TimelineComponent");

    @Input() data: any[];
    @Input() label: string;
    @Input() newData: any;
    @Input() xAccessor?: any;
    @Input() yAccessor?: any;
    @Input() keyAccessor?: any;
    @Input() projectedAccessor?: any;
    @Input() valueAccessor?: any;
    public timePeriods: any[];
    public actualsArr;
    public budgetArr;
    public forecastArr;
    public actuals;
    public budget;
    public forecast;
    public seriesData: SeriesItem[];

    historicalData: TimelineDataPointFin[];
    projectedData: TimelineDataPointFin[];
    dimensions: DimensionsType;
    xScale: ScaleType;
    yScale: ScaleType;

    timePeriodAccessor;
    xAccessorScaled: any;
    yAccessorScaled: any;
    budgetedAccessorScaled: any;
    forecastAccessorScaled: any;
    y0AccessorScaled: any;
    formatDate = d3.timeFormat("%-y %-b");
    gradientId: string = getUniqueId("Timeline-gradient");
    gradientColors: string[] = ["rgb(226, 222, 243)", "#f8f9fa"];
    categories;

    @ViewChild("container") container: ElementRef;

    constructor() {
        TimelineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 40,
            marginRight: 30,
            marginBottom: 75,
            marginLeft: 75,
            height: 300,
            width: 600
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
        TimelineComponent.logger.debug(`ngOnInit()`);

        const data = revenueMock;
        const dataSeries = revenueMock;
        this.data = revenueMock;
        const seriesData = revenueMock2.series;
        const dataTest = seriesData;
        const testData = dataSeries;
        this.categories = _.map(testData, "name");
        this.actualsArr = _.find(testData, (v) => v.id === "actuals");
        this.budgetArr = _.find(testData, (v) => v.id === "budget");
        this.forecastArr = _.find(testData, (v) => v.id === "forecast");
        this.actuals = _.get(this.actualsArr, ["data"]);
        this.budget = _.get(this.budgetArr, ["data"]);
        this.forecast = _.get(this.forecastArr, ["data"]);
        this.timePeriods = this.actuals.map((v) => v.date);

        if (this.projectedAccessor) {
            this.historicalData = this.data.filter((v) => v.projected === false);
            this.projectedData = this.data.filter((v) => v.projected === true);
        }
    }

    ngAfterContentInit() {
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
            .domain(d3.extent(this.timePeriods) as [Date, Date])
            .range([0, this.dimensions.boundedWidth]);
        this.yScale = d3
            .scaleLinear()
            .domain(d3.extent(this.data, this.yAccessor) as [number, number])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.xAccessorScaled = (d) => this.xScale(this.xAccessor(d));
        this.yAccessorScaled = (d) => this.yScale(this.valueAccessor(d));
        this.budgetedAccessorScaled = (d) => this.yScale(this.valueAccessor(d));
        this.forecastAccessorScaled = (d) => this.yScale(this.valueAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
    }
}

export interface SeriesItem {
    name: string;
    data: number[];
}
