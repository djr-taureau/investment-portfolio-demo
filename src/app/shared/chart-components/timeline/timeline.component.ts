import { AfterContentInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import { axisLeft as d3_axisLeft, select as d3_select } from "d3";
import * as _ from "lodash";
import { revenueMock2 } from "../../../company-dashboard/financials-data";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";

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
    @Input() categoryAccessor?: any;
    @Input() projectedAccessor?: any;
    @Input() valueAccessor?: any;
    @Input() yLabelVisible?: boolean;

    @ViewChild("container") container: ElementRef;

    public timePeriods: any[];
    public actualsObj;
    public budgetObj;
    public forecastObj;
    public actuals;
    public budget;
    public forecast;
    public seriesData: SeriesItem[];
    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;

    el: HTMLElement;
    historicalData: TimelineDataPointFin[];
    projectedData: TimelineDataPointFin[];
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

    constructor(elementRef: ElementRef) {
        TimelineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 40,
            marginRight: 30,
            marginBottom: 75,
            marginLeft: 75,
            height: 300,
            width: 679
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
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.yAxisTickValues = [0, 300, 450, 600, 750];
        this.data = revenueMock2.series;
        this.actualsObj = _.find(this.data, (v) => v.id === "actuals");
        this.budgetObj = _.find(this.data, (v) => v.id === "budget");
        this.forecastObj = _.find(this.data, (v) => v.id === "forecast");
        this.actuals = _.get(this.actualsObj, ["values"]);
        this.budget = _.get(this.budgetObj, ["values"]);
        this.forecast = _.get(this.forecastObj, ["values"]);
        this.timePeriods = [];
        this.dateSelected = "4Q2018";
        this.actuals.map((v) => {
            const timePart = `${v.quarter}Q${v.year}`;
            if (this.categoryAccessor && this.categoryAccessor(v) === this.dateSelected) {
                this.selectedValue = true;
            }
            this.timePeriods = this.timePeriods.concat(timePart);
        });
        this.historicalData = this.actuals.filter((v) => v.projected === false);
        this.projectedData = this.actuals.filter((v) => v.projected === true);
        this.actualsPresentValue = this.actuals.filter((p) => this.categoryAccessor(p) === this.dateSelected);
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
        console.log(changes);
    }

    updateScales() {
        if (!this.data) {
            return;
        }
        this.xScale = d3
            .scaleBand()
            .domain(this.timePeriods)
            .range([0, this.dimensions.boundedWidth])
            .padding(0.3);

        this.yScale = d3
            .scaleLinear()
            .domain([d3.min(this.actuals, this.yAccessor), 750])
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
        this.y0ForecastAccessorScaled = this.forecastScale(this.budgetScale.domain()[0]);
        this.yAxisGrid = d3_axisLeft(this.yScale)
            .tickSize(-this.dimensions.boundedWidth, 10, 40)
            .tickFormat("")
            .ticks(5);
        const yAxis = d3_axisLeft(this.yScale).ticks(5);
        const svg = d3_select("#multi-timeline").select("svg");

        svg.append("g")
            .attr("class", "axis-grid")
            .call(
                this.make_y_gridlines()
                    .tickSize(-this.dimensions.boundedWidth, 40)
                    .tickValues(null)
                    .tickFormat("")
            );
        svg.append("g")
            .attr("class", "axis y-axis")
            .call(yAxis);
    }

    make_y_gridlines() {
        return d3_axisLeft(this.yScale).ticks(6);
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

export interface SeriesItem {
    name: string;
    data: number[];
}
