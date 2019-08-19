import { AfterContentInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import * as d3Tip from "d3-tip";
import { axisLeft as d3_axisLeft, axisBottom as d3_axisBottom, selectAll as d3_selectAll } from "d3";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";
import * as _ from "lodash";

@Component({
    selector: "sbp-timeline",
    templateUrl: "./timeline.component.html",
    styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements OnInit, AfterContentInit, OnChanges {
    private static logger: Logger = Logger.getLogger("TimelineComponent");

    @Input() data: any[];

    @Input()
    public set actuals(value: RevenueSeriesData[]) {
        if (value) {
            this._actuals = value;
            this.update();
        }
    }
    public get actuals(): RevenueSeriesData[] {
        return this._actuals;
    }
    private _actuals: RevenueSeriesData[];

    @Input()
    public set budget(value: RevenueSeriesData[]) {
        if (value) {
            this._budget = value;
            this.update();
        }
    }
    public get budget(): RevenueSeriesData[] {
        return this._budget;
    }
    private _budget: RevenueSeriesData[];

    @Input()
    public set forecast(value: RevenueSeriesData[]) {
        if (value) {
            this._forecast = value;
            this.update();
        }
    }
    public get forecast(): RevenueSeriesData[] {
        return this._forecast;
    }
    private _forecast: RevenueSeriesData[];

    @Input() label: string;
    @Input() newData: any;
    @Input() xAccessor?: any;
    @Input() yAccessor?: any;
    @Input() keyAccessor?: any;
    @Input() categoryAccessor?: any;
    @Input() projectedAccessor?: any;
    @Input() valueAccessor?: any;
    @Input() yLabelVisible?: boolean;

    @ViewChild("container") container: ElementRef;

    public timePeriods: any[];
    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;

    el: HTMLElement;
    historicalData: RevenueSeriesData[];
    projectedData: RevenueSeriesData[];
    dimensions: DimensionsType;
    xScale: any;
    yScale: ScaleType;
    budgetScale: ScaleType;
    forecastScale: ScaleType;
    xAxisTickValues: any[];
    yAxisTickValues: any[];
    timePeriodAccessor;
    yTickValues: any[];
    xAccessorScaled: any;
    yAccessorScaled: any;
    budgetAccessorScaled: any;
    forecastAccessorScaled: any;
    y0AccessorScaled: any;
    y0BudgetAccessorScaled: any;
    y0ForecastAccessorScaled: any;
    formatCategory = d3.tickFormat(d3.format(","));
    formatDate = d3.timeFormat("%m/%d/%Y");
    gradientId: string = getUniqueId("Timeline-gradient");
    gradientColors: string[] = ["rgb(226, 222, 243)", "#f8f9fa"];
    xAxisBottom;
    yAxisGrid;
    actualsPresentValue;
    dateSelected;
    selectedValue: boolean;
    tooltipScale: any;
    sourceValues: any;
    indexSource: any;

    constructor(elementRef: ElementRef) {
        TimelineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 25,
            marginRight: 30,
            marginBottom: 75,
            marginLeft: 75,
            height: 325,
            width: 690
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
        TimelineComponent.logger.debug(`ngOnInit()`);
        this.categoryAccessor = (v) => `${v.financialQuarter}Q${v.date.substr(2, 2)}`;
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.yAxisTickValues = [0, 300, 450, 600, 750];
        this.timePeriods = [];
        this.dateSelected = "4Q18";
        this.actuals.map((v) => {
            if (this.categoryAccessor && this.categoryAccessor(v) === this.dateSelected) {
                this.selectedValue = true;
            }
            // djr -- this has to be done because the api doesn't support the labels otherwise
            // if (v.projection === true) {
            //     const actual = 'A';
            // } else {
            //     const actual = 'E';
            // }
            this.timePeriods = this.timePeriods.concat(this.categoryAccessor(v));
        });
        this.historicalData = this.actuals.filter((v) => v.projection === false);
        this.projectedData = this.actuals.filter((v) => v.projection === true);
        this.actualsPresentValue = this.actuals.filter((p) => this.categoryAccessor(p) === this.dateSelected);
    }

    private update(): void {
        this.categoryAccessor = (v) => `${v.financialQuarter}Q${v.date.substr(2, 2)}`;

        // TODO:: djr  This needs to removed and taken from as of selector
        this.dateSelected = "4Q18";
        this.actualsPresentValue = this.actuals.filter((p) => this.categoryAccessor(p) === this.dateSelected);
        this.historicalData = this.actuals.filter((v) => v.projection === false);
        this.projectedData = this.actuals.filter((v) => v.projection === true);
        this.sourceValues = _.map(this.data, _.property("sourceType"));
        this.indexSource = _.indexOf(this.sourceValues, "B", 0);
    }

    ngAfterContentInit() {
        if (!this.data && !this.timePeriods && !this.actuals && !this.budget && !this.forecast) {
            return;
        } else {
            this.updateDimensions();
        }
    }

    @HostListener("window:resize", ["$event"])
    onResize() {
        this.updateDimensions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.data && this.timePeriods && this.actuals && this.budget && this.forecast) {
            this.updateScales();
        }
    }

    updateScales() {
        if (!this.data && !this.timePeriods && !this.actuals && !this.budget && !this.forecast) {
            return;
        }
        const series = ["Actual", "Mgmt Bud", "Mgmt Fcst"];
        const color = d3
            .scaleOrdinal()
            .domain(series)
            .range(["#124f8c", "#47a2d6", "#124f8c"]);
        this.xScale = d3
            .scaleBand()
            .domain(this.timePeriods)
            .range([0, this.dimensions.boundedWidth])
            .padding(0.3);

        this.yScale = d3
            .scaleLinear()
            .domain([d3.min(this.actuals, this.yAccessor), d3.max(this.actuals, this.yAccessor)])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.budgetScale = d3
            .scaleLinear()
            .domain(d3.extent(this.budget, this.yAccessor) as [number, number])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.forecastScale = d3
            .scaleLinear()
            .domain(d3.extent(this.forecast, this.yAccessor) as [number, number])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.xAccessorScaled = (d) => this.xScale(this.categoryAccessor(d)) + this.xScale.bandwidth() / 2;
        this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
        this.budgetAccessorScaled = (d) => this.budgetScale(this.yAccessor(d));
        this.forecastAccessorScaled = (d) => this.forecastScale(this.yAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
        this.y0BudgetAccessorScaled = this.budgetScale(this.budgetScale.domain()[0]);
        this.y0ForecastAccessorScaled = this.forecastScale(this.forecastScale.domain()[0]);
        this.yAxisGrid = d3_axisLeft(this.yScale)
            .tickSize(-this.dimensions.boundedWidth, 10, 40)
            .ticks(5);
        const yAxis = d3_axisLeft(this.yScale).tickValues(this.yScale.ticks(this.yAxisTickValues).concat(this.yScale.domain()));
        // .ticks(5);
        // yAxis.tickValues(thisscale.ticks(5).concat(scale.domain()));
        // const xAxis = d3_axisBottom(this.yScale).scale(this.xScale);

        const svg = d3_selectAll("#multi-timeline").select("svg");

        svg.append("g")
            .attr("class", "axis-grid")
            .call(
                this.make_y_gridlines()
                    .tickSize(-this.dimensions.boundedWidth, 0, 0)
                    .tickFormat(",")
            );
        svg.append("g")
            .attr("class", "axis y-axis")
            .call(yAxis);
        // svg.append("g")
        //   .attr("class", "axis x-axis")
        //    .call(xAxis);        // text label for the y axis
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - this.dimensions.marginLeft)
            .attr("x", 0 - this.dimensions.height / 2)
            .attr("dy", "1em")
            .attr("class", "y-axis-label-line")
            .style("text-anchor", "middle")
            .text("Revenue ($M)");
    }
    make_y_gridlines() {
        return d3_axisLeft(this.yScale).ticks(5);
    }

    toggleVisibilty(event) {
        switch (event) {
            case "actuals":
                this.actualsVis = !this.actualsVis;
                break;
            case "budget":
                this.budgetVis = !this.budgetVis;
                break;
            case "forecast":
                this.forecastVis = !this.forecastVis;
        }
    }
}
