import { AfterContentInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import { axisLeft as d3_axisLeft, selectAll as d3_selectAll } from "d3";
import * as _ from "lodash";
import { revenueMock2 } from "../../../company-dashboard/financials-data";
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
    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;
    public activeStyle: string;

    historicalData: any[];
    projectedData: any[];
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
        this.categoryAccessor = (v) => `${v.quarter}Q${v.year}`;
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.yAxisTickValues = [0, 300, 450, 600, 750];
        this.data = revenueMock2.series;
        this.activeStyle = "not-visible";
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
        this.actualsPresentValue = this.actuals.filter((p) => this.categoryAccessor(p) === this.dateSelected);
        this.historicalData = this.actuals.filter((v) => v.projected === false);
        this.projectedData = this.actuals.filter((v) => v.projected === true);
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
            .domain(d3.extent(this.actuals, this.yAccessor) as [number, number])
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

        this.xAxisBottom = d3.axisBottom(this.xScale);

        this.xAccessorScaled = (d) => this.xScale(this.categoryAccessor(d));
        this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
        this.budgetAccessorScaled = (d) => this.budgetScale(this.yAccessor(d));
        this.forecastAccessorScaled = (d) => this.forecastScale(this.yAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
        this.y0BudgetAccessorScaled = this.budgetScale(this.budgetScale.domain()[0]);
        this.y0ForecastAccessorScaled = this.forecastScale(this.budgetScale.domain()[0]);
        this.yAxisGrid = d3_axisLeft(this.yAccessorScaled)
            .tickSize(-this.dimensions.boundedWidth)
            .tickFormat("")
            .ticks(6);

        const svg = d3_selectAll("#micro-timeline")
            .select("svg")
            .append("g");
        const line = d3
            .line()
            .x((d) => this.xAccessor)
            .y((d) => this.yAccessor);

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
