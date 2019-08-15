import { AfterContentInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import { axisLeft as d3_axisLeft, selectAll as d3_selectAll } from "d3";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";

@Component({
    selector: "sbp-micro-timeline",
    templateUrl: "./micro-timeline.component.html",
    styleUrls: ["./micro-timeline.component.scss"]
})
export class MicroTimelineComponent implements OnInit, AfterContentInit, OnChanges {
    private static logger: Logger = Logger.getLogger("MicroTimelineComponent");

    @Input() id: string;
    @Input() label: string;
    @Input() newData: any;
    @Input() xAccessor?: any;
    @Input() yAccessor?: any;
    @Input() keyAccessor?: any;
    @Input() categoryAccessor?: any;
    @Input() projectedAccessor?: any;
    @Input() valueAccessor?: any;
    @Input() yLabelVisible?: boolean;

    @Input()
    public set data(value: any[]) {
        if (value) {
            // this._data = value;
            this._apiData = value;
            this.update();
        }
    }
    public get data(): any[] {
        return this._apiData;
    }
    private _data: any[];
    private _apiData: RevenueSeriesData[];

    @Input()
    public set barChartData1(value: RevenueSeriesData[]) {
        if (value) {
            this._barChartData1 = value;
            // this.update();
        }
    }
    public get barChartData1(): RevenueSeriesData[] {
        return this._barChartData1;
    }
    private _barChartData1: RevenueSeriesData[];

    @Input()
    public set barChartData2(value: RevenueSeriesData[]) {
        if (value) {
            this._barChartData2 = value;
            // this.update();
        }
    }
    public get barChartData2(): RevenueSeriesData[] {
        return this._barChartData2;
    }
    private _barChartData2: RevenueSeriesData[];

    @ViewChild("container") container: ElementRef;

    public timePeriods: any[];
    public actualsObj;
    public budgetObj;
    public forecastObj;
    public actuals;
    public budget;
    public forecast;
    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;
    public activeStyle: string;

    historicalData: any[];
    projectedData: any[];
    dimensions: DimensionsType;
    xScale: any;
    yScale: ScaleType;
    xAccessorScaled: any;
    yAccessorScaled: any;
    y0AccessorScaled: any;

    display = false;
    xAxisVisible = false;
    selectedValue = false;
    formatCategory = d3.tickFormat(d3.format(","));
    formatDate = d3.timeFormat("%m/%d/%Y");
    gradientId: string = getUniqueId("Timeline-gradient");
    gradientColors: string[] = ["rgb(226, 222, 243)", "#f8f9fa"];
    xAxisBottom;
    yAxisGrid;
    dateSelected;
    actualsPresentValue;
    el: HTMLElement;

    constructor(elementRef: ElementRef) {
        MicroTimelineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 15,
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
        this.el = elementRef.nativeElement;
    }

    updateDimensions() {
        const width = this.container.nativeElement.offsetWidth;
        this.dimensions.width = this.container.nativeElement.offsetWidth;
        this.dimensions.boundedWidth = Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0);
        this.updateScales();
    }

    ngOnInit() {
        MicroTimelineComponent.logger.debug(`ngOnInit()`);
    }

    private update(): void {
        this.categoryAccessor = (v) => `${v.financialQuarter}Q${v.date.substr(2, 2)}`;
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.activeStyle = "not-visible";
        this.timePeriods = [];
        // TODO:: djr  This needs to removed and taken from as of selector
        this.dateSelected = "4Q18";
        this.data.map((v) => {
            if (this.categoryAccessor && this.categoryAccessor(v) === this.dateSelected) {
                this.selectedValue = true;
            }
            this.timePeriods = this.timePeriods.concat(this.categoryAccessor(v));
        });
        this.actualsPresentValue = this.data.filter((p) => this.categoryAccessor(p) === this.dateSelected);
        this.historicalData = this.data.filter((v) => v.projection === false);
        this.projectedData = this.data.filter((v) => v.projection === true);
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
        if (!this.timePeriods) {
            return;
        }

        this.xScale = d3
            .scaleBand<string, number>()
            .domain(this.timePeriods)
            .rangeRound([0, this.dimensions.boundedWidth])
            .padding(0.5);

        this.yScale = d3
            .scaleLinear()
            .domain(d3.extent(this.data, this.yAccessor) as [number, number])
            .range([this.dimensions.boundedHeight, 0])
            .nice();

        this.xAxisBottom = d3.axisBottom(this.xScale);
        this.xAccessorScaled = (d) => this.xScale(this.categoryAccessor(d));
        this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);

        this.yAxisGrid = d3_axisLeft(this.yAccessorScaled)
            .tickSize(-this.dimensions.boundedWidth)
            .tickFormat("")
            .ticks(6);

        const svg = d3
            .select(this.el)
            .selectAll("#micro-timeline")
            .select("svg")
            .append("g");
        // const line = d3
        //     .line()
        //     .x((d) => this.xAccessor)
        //     .y((d) => this.yAccessor);

        svg.append("line")
            .attr("x1", this.xScale(this.dateSelected))
            .attr("y1", this.dimensions.boundedHeight + 2)
            .attr("x2", this.xScale(this.dateSelected))
            .attr("y2", this.dimensions.marginTop - 10)
            .attr("class", "select-line")
            .style("stroke-width", 1)
            .style("stroke", "#99a8bf");
    }
}
