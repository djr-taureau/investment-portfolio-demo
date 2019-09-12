import { AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { ChartDataPeriod, RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import { curveLinear } from "d3-shape";
import * as _ from "lodash";
import { getUniqueId } from "../chart/utils";
import { DimensionsType } from "../interfaces/types";
import * as AngularUtils from "@util//angular.util";

@Component({
    selector: "sbp-timeline",
    templateUrl: "./timeline.component.html",
    styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements OnInit, OnChanges {
    private static logger: Logger = Logger.getLogger("TimelineComponent");

    @Input()
    public set allLineChartData(value: ChartDataPeriod[]) {
        if (value) {
            this._allLineChartData = value;
            this.update();
        }
    }
    public get allLineChartData(): ChartDataPeriod[] {
        return this._allLineChartData;
    }
    private _allLineChartData: ChartDataPeriod[];

    @Input()
    public set xAxisTickValues(value: string[]) {
        if (value) {
            this._xAxisTickValues = value;
            this.update();
        }
    }
    public get xAxisTickValues(): string[] {
        return this._xAxisTickValues;
    }
    private _xAxisTickValues: string[];

    @Input() label: string;
    @Input() newData: any;
    @Input() xAccessor?: any;
    @Input() yAccessor?: any;
    @Input() keyAccessor?: any;

    @Input() selectedPeriod: any;
    @Input() selectedDatePart: any;
    @Input() availablPeriods: any[];
    @Input() title: string;

    public timePeriods: any[];
    public actualsVis = true;
    public forecastVis = true;
    public budgetVis = true;
    public icInitialVis = true;
    public icLatestVis = true;

    actualsData;
    budgetData;
    forecastData;
    icInitialData;
    icLatestData;

    el: HTMLElement;
    dimensions: DimensionsType;
    xScale: any;
    yScale: any;
    actualsScale: any;
    budgetScale: any;
    forecastScale: any;
    icLatestScale: any;
    icInitialScale: any;
    icLatestYMax;
    icInitialYMax;
    yAxisTickValues: any[];
    yTickValues: any[];
    y0AccessorScaled: any;
    datePartId: string;

    y0ForecastAccessorScaled: any;
    parseDate = d3.timeParse("%Y-%m-%d");
    formatCategory = d3.tickFormat(d3.format(","));
    formatDate = d3.timeFormat("%m/%d/%Y");
    gradientId: string = getUniqueId("Timeline-gradient");
    gradientColors: string[] = ["rgb(226, 222, 243)", "#f8f9fa"];
    dateSelected: any;
    selectedValue: boolean;
    activeStyle: string;
    indexSelected: number;
    scenarioNames;
    pathStyles;
    dataSet;
    actuals;
    budget;
    forecast;
    ic;
    svg;
    toolTip;
    showToolTip;
    moveToolTip;
    hideToolTip;
    tip;
    show;
    move;
    hide;
    dateSelectedString;
    indexDateSelected: any;
    chartSeriesName: string;

    constructor(elementRef: ElementRef) {
        TimelineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 10,
            marginRight: 20,
            marginBottom: 20,
            marginLeft: 55,
            height: 325,
            width: 606
        };

        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };

        this.el = elementRef.nativeElement;
        this.svg = d3
            .select(this.el)
            .select("#multi-timeline")
            .append("svg")
            .attr("width", this.dimensions.width)
            .attr("height", this.dimensions.height);
    }

    ngOnInit() {
        TimelineComponent.logger.debug(`ngOnInit()`);

        this.yAxisTickValues = [0, 150, 300, 450, 600, 750];
        this.timePeriods = [];
        this.xAccessor = (v) => v.date;
        this.svg = d3
            .select(this.el)
            .selectAll("#multi-timeline")
            .append("svg")
            .attr("width", this.dimensions.width)
            .attr("height", this.dimensions.height)
            .append("g");
        this.svg.append("g").attr("transform", "translate(" + this.dimensions.marginLeft + "," + this.dimensions.marginTop + ")");
    }

    ngOnChanges() {
        //  this.updateScales();
    }

    private update(): void {
        if ((this.allLineChartData || []).length < 1 || !this.selectedPeriod) {
            return;
        }
        // remove all svg element before updating data
        this.svg.selectAll("line.select-timeline").remove();
        this.svg.selectAll("path.actuals-path").remove();
        this.svg.selectAll("path.budget-path").remove();
        this.svg.selectAll("path.forecast-path").remove();
        this.svg
            .selectAll("#multi-timeline")
            .selectAll(".tooltip")
            .remove();
        this.svg.selectAll("circle.actuals-dot").remove();
        this.svg.selectAll("circle.icLatest-dot").remove();
        this.svg.selectAll("circle.icInitial-dot").remove();
        this.svg.selectAll("circle.budget-dot").remove();
        this.svg.selectAll("circle.forecast-dot").remove();

        this.yAccessor = (v) => v.value;
        this.activeStyle = "not-visible";

        this.dateSelected = _.get(this, "selectedPeriod.date", null);
        const getData = this.allLineChartData.map((v) => _.pick(v, ["scenarioName", "data"]));
        this.scenarioNames = getData;
        let newVals = [];

        // transform the data into format for passing to multi line time series
        const data = _.forEach(this.scenarioNames, (values) => {
            const newName = values.scenarioName;
            const vals = values.data.map((v) => v.value);
            this.timePeriods = values.data.map((v) => v.date);
            const obj = Object.assign({ name: newName }, { values: vals });
            newVals = newVals.concat(obj);
        });
        this.scenarioNames = newVals;
        //  create the new time series data
        this.dataSet = {
            series: this.scenarioNames,
            dates: this.timePeriods.map((v) => this.parseDate(v))
        };
        this.timePeriods = this.xAxisTickValues;
        this.indexDateSelected = _.indexOf(this.timePeriods, this.dateSelectedString, 0);
        this.updateScales();
    }

    updateScales() {
        // remove all svg elements that need to be redrawn
        this.svg.selectAll("text.y-axis-label-line").remove();
        this.svg.selectAll(".xAxis.tick").remove();
        this.svg.selectAll(".axis-grid").remove();
        this.svg.selectAll(".yAxis").remove();
        this.svg.selectAll(".yMinorAxis").remove();
        this.svg.selectAll(".yAxis.axis-grid").remove();
        this.svg.selectAll("circle.selected-dot").remove();
        this.svg.selectAll(".select-timeline").remove();
        this.svg.selectAll(".projected").remove();
        this.svg.selectAll(".scenarios").remove();
        this.svg.selectAll(".actuals-path").remove();
        this.svg.selectAll(".budget-path").remove();
        this.svg.selectAll(".icLatest-path").remove();
        this.svg.selectAll(".icInitial-path").remove();
        this.svg.selectAll(".tick-selected-value").remove();
        this.svg.selectAll(".forecast-path").remove();
        this.svg.selectAll("circle.actuals-dot").remove();
        this.svg.selectAll("circle.icLatest-dot").remove();
        this.svg.selectAll("circle.icInitial-dot").remove();
        this.svg.selectAll("circle.budget-dot").remove();
        this.svg.selectAll("circle.forecast-dot").remove();
        this.svg.selectAll(".xAxis").remove();
        this.svg
            .selectAll("#multi-timeline")
            .selectAll(".tooltip")
            .remove();
        //  d3 date parse
        this.xAccessor = (v) => this.parseDate(v.date);
        const seriesData = this.dataSet.series;
        const seriesNames = _.map(seriesData, "name");
        const actuals = _.find(seriesData, ["name", "actual"]);
        const budget = _.find(seriesData, ["name", "managementBudget"]);
        const fore = _.find(seriesData, ["name", "managementForecast"]);

        const millions = (n) => n / 1000000;
        // convert values before passing them to the d3 scaleas
        this.actualsData = _.map(actuals.values, millions);
        this.budgetData = _.map(budget.values, millions);
        this.forecastData = _.map(fore.values, millions);

        // take the min and max for each of the scales
        const actualsYMin = d3.min(this.actualsData);
        const actualsYMax = d3.max(this.actualsData);
        const budgetYMin = d3.min(this.budgetData);
        const budgetYMax = d3.max(this.budgetData);
        const foreYMin = d3.min(this.forecastData);
        const foreYMax = d3.max(this.forecastData);
        this.actualsData = _.take(this.actualsData, this.actualsData.length - 1);
        // take the min and max for the entire data set by group
        let minValues = [actualsYMin, budgetYMin, foreYMin];
        let maxValues = [actualsYMax, budgetYMax, foreYMax];
        // if the date series has more than three we want the sets for ic intial and latest
        if (_.size(seriesData) > 3) {
            const icLatest = _.find(seriesData, ["name", "icLatest"]);
            const icInitial = _.find(seriesData, ["name", "icInitial"]);
            this.icLatestData = _.map(icLatest.values, millions);
            this.icInitialData = _.map(icInitial.values, millions);
            const icLatestYMin = d3.min(this.icLatestData);
            this.icLatestYMax = d3.max(this.icLatestData);
            const icInitialYMin = d3.min(this.icInitialData);
            this.icInitialYMax = d3.max(this.icInitialData);
            minValues = [actualsYMin, budgetYMin, foreYMin, icInitialYMin, icLatestYMin];
            maxValues = [actualsYMax, budgetYMax, foreYMax, this.icInitialYMax, this.icLatestYMax];
        }
        // extend each end of the scale by 10%
        const newMax = d3.max(maxValues) * 1.1;
        const newMin = d3.min(minValues) * 0.9;
        // xscale domain dates in data set
        // from the left marging to the bounded width of the chart
        this.xScale = d3
            .scaleTime()
            .domain(d3.extent(this.dataSet.dates))
            .range([this.dimensions.marginLeft, this.dimensions.boundedWidth])
            .nice();
        // y scale is min and max of all values in seried
        this.yScale = d3
            .scaleLinear()
            .domain([newMin, newMax])
            .range([this.dimensions.height, 0]);

        this.actualsScale = d3
            .scaleLinear()
            .domain([0, 950])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.budgetScale = d3
            .scaleLinear()
            .domain([0, budgetYMax])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.forecastScale = d3
            .scaleLinear()
            .domain([0, foreYMax])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        if (this.icLatestData) {
            this.icLatestScale = d3
                .scaleLinear()
                .domain([0, this.icLatestYMax])
                .range([this.dimensions.boundedHeight, 0])
                .nice();
        }
        if (this.icInitialData) {
            this.icInitialScale = d3
                .scaleLinear()
                .domain([0, this.icInitialYMax])
                .range([this.dimensions.boundedHeight, 0])
                .nice();
        }
        const xAxis = this.svg
            .append("g")
            .attr("transform", `translate(0,${this.dimensions.height - this.dimensions.marginBottom})`)
            .attr("class", "xAxis")
            .call(
                d3
                    .axisBottom(this.xScale)
                    .tickFormat((d, i) => {
                        return this.timePeriods[i];
                    })
                    .ticks(6)
                    .tickPadding(5)
                    .tickSizeOuter(5)
                    .tickSizeInner(5)
            )
            .call((g) => g.select("g.tick.tick:nth-child(6) text").attr("class", "tick-selected-value"));

        //  draw the line above the x axis
        this.svg
            .append("line")
            .attr("class", "y0")
            .attr("stroke-width", 1)
            .attr("stroke", "#68758c")
            .attr("opacity", 0.2)
            .attr("x1", this.xScale.range()[0] + 15)
            .attr("x2", 606)
            .attr("y1", this.yScale.range()[0] - 20)
            .attr("y2", this.yScale.range()[0] - 20);

        //  draw the lines for the grid
        this.svg
            .append("g")
            .attr("class", "axis-grid")
            .attr("transform", "translate(70, 0)")
            .call(
                this.gridlines()
                    .tickSize(-this.dimensions.width)
                    .tickFormat("")
            )
            .call((g) => g.select("g.tick.tick:nth-child(2) line").attr("class", "y-axis-zero-line"));

        this.svg
            .selectAll("line.y-axis-zero-line")
            .style("fill", "#68758c")
            .style("stroke", "#68758c")
            .style("opacity", "0.8");

        // build the y axis
        const yAxis = d3
            .axisLeft(this.yScale)
            .ticks(5)
            .tickSizeOuter(20)
            .tickSizeInner(20);

        this.svg
            .append("g")
            .attr("class", "yAxis")
            .style("opactity", "0.15")
            .attr("transform", `translate(${this.dimensions.marginLeft},0)`)
            .call(yAxis.tickSize(0))
            .call((g) => g.select(".domain").remove())
            .call((g) =>
                g
                    .select(".tick:last-of-type text")
                    .clone()
                    .attr("x", 0 - this.dimensions.height / 2)
                    .attr("y", -50)
                    .attr("text-anchor", "start")
                    .attr("class", "y-axis-label")
                    .attr("transform", "rotate(-90)")
                    .text(this.title.concat(" ($M)").toLocaleUpperCase())
            );
        //  create the line used for the path of each data set
        const line = d3
            .line()
            .x((d, i) => this.xScale(this.dataSet.dates[i]))
            .y((d) => this.yScale(d))
            .curve(curveLinear);
        //  use the line to draw the path of each dataset
        this.svg
            .append("path")
            .datum(this.actualsData)
            .attr("class", "actuals-path")
            .attr("fill", "none")
            .attr("stroke", "#124f8c")
            .attr("stroke-width", 2)
            .attr("d", line);

        this.svg
            .append("path")
            .datum(this.budgetData)
            .attr("class", "budget-path")
            .attr("fill", "none")
            .attr("stroke", "#124f8c")
            .attr("opacity", "0.5")
            .attr("stroke-width", 1)
            .attr("d", line);

        this.svg
            .append("path")
            .datum(this.forecastData)
            .attr("class", "forecast-path")
            .attr("fill", "none")
            .attr("stroke", "#47a2d6")
            .attr("opacity", "0.75")
            .attr("stroke-width", 1)
            .attr("d", line);
        if (this.icLatestData) {
            this.svg
                .append("path")
                .datum(this.icLatestData)
                .attr("class", "icLatest-path")
                .attr("fill", "none")
                .attr("stroke", "#ebc034")
                .attr("opacity", "0.75")
                .attr("stroke-width", 1)
                .attr("d", line);
        }

        if (this.icInitialData) {
            this.svg
                .append("path")
                .datum(this.icInitialData)
                .attr("class", "icInitial-path")
                .attr("fill", "none")
                .attr("stroke", "#ebc034")
                .attr("opacity", "0.75")
                .attr("stroke-width", 1)
                .attr("d", line);
        }

        // draw the dots that represent the data points for each data set

        this.svg
            .selectAll(".dot")
            .data(this.actualsData)
            .enter()
            .append("circle")
            .attr("class", (d, i) => {
                if (this.timePeriods[i] === this.dateSelectedString) {
                    return "selected-dot";
                } else {
                    return "actuals-dot";
                }
            })
            .attr("r", 4)
            .style("stroke", "#124f8c")
            .style("fill", (d, i) => {
                if (this.timePeriods[i] === this.dateSelectedString) {
                    return "white";
                } else {
                    return "#124f8c";
                }
            })
            .style("stroke-size", "4")
            .attr("cx", (d, i) => this.xScale(this.dataSet.dates[i]))
            .attr("cy", (d) => this.yScale(d))
            .on("mouseover", this.showToolTip)
            .on("mousemove", this.moveToolTip)
            .on("mouseleave", this.hideToolTip);

        this.svg
            .selectAll(".dot")
            .data(this.budgetData)
            .enter()
            .append("circle")
            .attr("class", "budget-dot")
            .attr("r", 3)
            .style("stroke", "#124f8c")
            .style("fill", "white")
            .style("stroke-size", "1")
            .attr("cx", (d, i) => this.xScale(this.dataSet.dates[i]))
            .attr("cy", (d) => this.yScale(d));

        this.svg
            .selectAll(".dot")
            .data(this.forecastData)
            .enter()
            .append("circle")
            .attr("class", "forecast-dot")
            .attr("r", 3)
            .attr("width", "6px")
            .attr("height", "6px")
            .style("stroke", "#124f8c")
            .style("fill", "white")
            .style("stroke-size", "1")
            .attr("cx", (d, i) => this.xScale(this.dataSet.dates[i]))
            .attr("cy", (d) => this.yScale(d));

        if (this.icLatestData) {
            this.svg
                .selectAll(".dot")
                .data(this.icLatestData)
                .enter()
                .append("circle")
                .attr("class", "icLatest-dot")
                .attr("r", 3)
                .attr("width", "6px")
                .attr("height", "6px")
                .style("stroke", "#ebc034")
                .style("fill", "white")
                .style("stroke-size", "1")
                .attr("cx", (d, i) => this.xScale(this.dataSet.dates[i]))
                .attr("cy", (d) => this.yScale(d));
        }

        if (this.icInitialData) {
            this.svg
                .selectAll(".dot")
                .data(this.icInitialData)
                .enter()
                .append("circle")
                .attr("class", "icInital-dot")
                .attr("r", 3)
                .attr("width", "6px")
                .attr("height", "6px")
                .style("stroke", "#ebc034")
                .style("fill", "white")
                .style("stroke-size", "1")
                .attr("cx", (d, i) => this.xScale(this.dataSet.dates[i]))
                .attr("cy", (d) => this.yScale(d));
        }
    }
    // grid line function for each data set
    gridlines() {
        return d3.axisLeft(this.yScale).ticks(5);
    }

    //  visibility toggle for each data set
    toggleVisibility(event) {
        let newOpacity = 1;
        switch (event) {
            case "actuals":
                this.actualsVis = !this.actualsVis;
                newOpacity = this.actualsVis ? 1 : 0;
                this.svg.select(".actuals-path").style("opacity", newOpacity);
                this.svg.selectAll("circle.actuals-dot").style("opacity", newOpacity);
                this.svg.select("circle.selected-dot").style("opacity", newOpacity);
                break;
            case "budget":
                this.budgetVis = !this.budgetVis;
                newOpacity = this.budgetVis ? 1 : 0;
                this.svg.select(".budget-path").style("opacity", newOpacity);
                this.svg.selectAll("circle.budget-dot").style("opacity", newOpacity);
                break;
            case "forecast":
                this.forecastVis = !this.forecastVis;
                newOpacity = this.forecastVis ? 1 : 0;
                this.svg.select(".forecast-path").style("opacity", newOpacity);
                this.svg.selectAll("circle.forecast-dot").style("opacity", newOpacity);
                break;
            case "icLatest":
                this.icLatestVis = !this.icLatestVis;
                newOpacity = this.icLatestVis ? 1 : 0;
                this.svg.select(".icLatest-path").style("opacity", newOpacity);
                this.svg.selectAll("circle.icLatest-dot").style("opacity", newOpacity);
                break;
            case "icInitial":
                this.icInitialVis = !this.icInitialVis;
                newOpacity = this.icInitialVis ? 1 : 0;
                this.svg.select(".icIntial-path").style("opacity", newOpacity);
                this.svg.selectAll("circle.icInitial-dot").style("opacity", newOpacity);
                break;
        }
    }
}
