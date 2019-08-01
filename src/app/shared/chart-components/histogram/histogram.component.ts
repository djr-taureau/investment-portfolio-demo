import { Component, Input, ViewChild, ElementRef, AfterContentInit, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import * as d3 from "d3";
import { axisBottom as d3_axisBottom, axisLeft as d3_axisLeft, scaleLinear as d3_scaleLinear, select as d3_select } from "d3";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";
import { revenue, ebitda, cashburn, revenueArr, revenueMock, revenueMock2 } from "../../../company-dashboard/financials-data";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import * as _ from "lodash";

@Component({
    selector: "sbp-histogram",
    templateUrl: "./histogram.component.html",
    styleUrls: ["./histogram.component.scss"]
})
export class HistogramComponent implements OnInit, AfterContentInit, OnChanges {
    @Input() data: any[];
    @Input() label: string;
    @Input() xAccessor: any;
    dimensions: DimensionsType;
    xAccessorScaled: any;
    yAccessorScaled: any;
    xScale: ScaleType;
    yScale: ScaleType;
    widthAccessorScaled: any;
    heightAccessorScaled: any;
    keyAccessor: any;
    bins: any;
    numberOfThresholds;
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
    barWidth;
    historicalData: TimelineDataPointFin[];
    projectedData: TimelineDataPointFin[];

    budgetScale: ScaleType;
    forecastScale: ScaleType;
    xAxisTickValues: any[];
    yAxisTickValues: any[];
    timePeriodAccessor;
    yTickValues: any[];

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
    dataSet;
    @ViewChild("container") container: ElementRef;

    constructor() {
        this.dimensions = {
            marginTop: 40,
            marginRight: 30,
            marginBottom: 75,
            marginLeft: 75,
            height: 500,
            width: 600
        };
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
    }

    ngOnInit() {
        this.dataSet = [3, 4, 2, -1, 2, 4];
        this.barWidth = (this.dimensions.width - this.data.length) / this.data.length;
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
        this.actuals.map((v) => {
            const timePart = `${v.quarter}Q${v.year}`;
            this.timePeriods = this.timePeriods.concat(timePart);
        });
        // if (this.projectedAccessor) {
        //     this.historicalData = this.data.filter((v) => v.projected === false);
        //     this.projectedData = this.data.filter((v) => v.projected === true);
        // }
    }

    updateDimensions() {
        const width = this.container.nativeElement.offsetWidth;
        this.dimensions.width = this.container.nativeElement.offsetWidth;
        this.dimensions.boundedWidth = Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0);
        this.updateScales();
    }

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
            const numberOfThresholds = 9;
        }

        this.xScale = d3
            .scaleBand<string, number>()
            .domain(this.timePeriods)
            .range([0, this.dimensions.boundedWidth]);
        this.yScale = d3_scaleLinear()
            .domain([d3.min(this.dataSet), d3.max(this.dataSet)])
            .range([this.dimensions.height, 0]);

        // const binsGenerator = d3
        //     .histogram()
        //     .domain(this.xScale.domain())
        //     .value(this.xAccessor)
        //     .thresholds(this.xScale.ticks(this.numberOfThresholds));

        // this.bins = binsGenerator(this.data);

        // const yAccessor = (d) => d.length;

        const barPadding = 2;

        this.xAccessorScaled = (d) => this.xScale(d.x0) + barPadding;
        // this.yAccessorScaled = (d) => this.yScale(d);
        this.yAccessorScaled = (d) => (d > 0 ? this.yScale(d) : this.yScale(0));
        this.heightAccessorScaled = (d) => Math.abs(this.yScale(d) - this.yScale(0));
        // this.widthAccessorScaled = (d) => this.xScale(d.x1) - this.xScale(d.x0) - barPadding;
        // this.heightAccessorScaled = (d) => this.dimensions.boundedHeight - this.yScale(yAccessor(d));
        // this.keyAccessor = (i) => i;
    }
}

export interface SeriesItem {
    name: string;
    data: number[];
}
