import { AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { ChartDataPeriod, RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import { curveLinear } from "d3-shape";
import * as _ from "lodash";
import { getUniqueId } from "../chart/utils";
import { DimensionsType } from "../interfaces/types";

@Component({
    selector: "sbp-timeline",
    templateUrl: "./timeline.component.html",
    styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements OnInit {
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

    @Input() label: string;
    @Input() newData: any;
    @Input() xAccessor?: any;
    @Input() yAccessor?: any;
    @Input() keyAccessor?: any;
    @Input() valueAccessor?: any;
    @Input() yLabelVisible?: boolean;
    @Input() selectedPeriod: any;
    @Input() availablePeriods: any[];

    @ViewChild("container") container: ElementRef;

    public timePeriods: any[];
    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;
    public icVis: boolean;

    el: HTMLElement;
    dimensions: DimensionsType;
    xScale: any;
    yScale: any;
    actualsScale: any;
    budgetScale: any;
    forecastScale: any;
    icScale: any;
    xAxisTickValues: any[];
    yAxisTickValues: any[];

    yTickValues: any[];

    y0AccessorScaled: any;
    y0BudgetAccessorScaled: any;
    y0ForecastAccessorScaled: any;
    parseDate = d3.timeParse("%Y-%m-%d");
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
    activeStyle: string;
    indexSelected: number;
    scenarioNames;
    pathStyles;
    dataSet;
    tipBox;
    actuals;
    budget;
    forecast;
    ic;
    svg;
    toolTip;
    showToolTip;
    moveToolTip;
    hideToolTip;
    show;
    move;
    hide;
    chartSeriesName: string;

    constructor(elementRef: ElementRef) {
        TimelineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 70,
            marginRight: 30,
            marginBottom: 20,
            marginLeft: 1,
            height: 280,
            width: 550
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
            .attr("width", this.dimensions.boundedWidth)
            .attr("height", this.dimensions.boundedHeight);
    }

    ngOnInit() {
        TimelineComponent.logger.debug(`ngOnInit()`);
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.yAxisTickValues = [0, 300, 450, 600, 750];
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

    private update(): void {
        if ((this.allLineChartData || []).length < 1 || !this.selectedPeriod) {
            return;
        }
        d3.select(this.el)
            .selectAll("line.select-timeline")
            .remove();
        d3.select(this.el)
            .selectAll("g.line.actuals")
            .remove();
        d3.select(this.el)
            .selectAll("g.line.budget")
            .remove();
        d3.select(this.el)
            .selectAll("g.line.forecast")
            .remove();

        this.yAccessor = (v) => v.value;
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.activeStyle = "not-visible";
        this.dateSelected = _.get(this, "selectedPeriod.date", null);

        const getData = this.allLineChartData.map((v) => _.pick(v, ["scenarioName", "data"]));
        this.scenarioNames = getData;
        let newVals = [];
        let quarters;
        const data = _.forEach(this.scenarioNames, (values) => {
            const newName = values.scenarioName;
            quarters = values.data.map((v) => v.financialQuarter);
            const vals = values.data.map((v) => v.value);
            this.timePeriods = values.data.map((v) => v.date);
            const obj = Object.assign({ name: newName }, { values: vals });
            newVals = newVals.concat(obj);
        });
        let periods = [];
        const periodStrings = _.forEach(
            _.zip(quarters, this.timePeriods),
            _.spread((q, d) => {
                periods = periods.concat(`${q}Q${d.substr(2, 2)}`);
                return periods;
            })
        );

        this.scenarioNames = newVals;
        this.dataSet = {
            series: this.scenarioNames,
            dates: this.timePeriods.map((v) => this.parseDate(v))
        };
        this.timePeriods = periods;
        this.updateScales();
    }

    updateScales() {
        this.svg.selectAll("text.y-axis-label-line").remove();
        this.svg.selectAll(".xAxis.tick").remove();
        this.svg.selectAll(".axis-grid").remove();
        this.svg.selectAll(".yAxis").remove();
        this.svg.selectAll(".yMinorAxis").remove();
        this.svg.selectAll(".yAxis.axis-grid").remove();
        this.svg.selectAll("circle.selected-value").remove();
        this.svg.selectAll(".select-timeline").remove();
        this.svg.selectAll(".projected").remove();
        this.svg.selectAll(".scenarios").remove();
        this.svg.selectAll(".actuals-path").remove();
        this.svg.selectAll(".budget-path").remove();
        this.svg.selectAll(".forecast-path").remove();
        this.svg.selectAll("circle.actuals-dot").remove();
        this.svg.selectAll("circle.budget-dot").remove();
        this.svg.selectAll("circle.forecast-dot").remove();
        this.svg.selectAll(".xAxis").remove();
        this.svg.selectAll(".tooltip").remove();
        this.xAccessor = (v) => this.parseDate(v.date);

        const seriesData = this.dataSet.series;
        const seriesNames = _.map(seriesData, "name");
        const actuals = _.find(seriesData, ["name", "actual"]);
        const budget = _.find(seriesData, ["name", "managementBudget"]);
        const fore = _.find(seriesData, ["name", "managementForecast"]);
        const actualsYMin = d3.min(actuals.values);
        const actualsYMax = d3.max(actuals.values);
        const budgetYMin = d3.min(budget.values);
        const budgetYMax = d3.max(budget.values);
        const foreYMin = d3.min(budget.values);
        const foreYMax = d3.max(budget.values);
        const minValues = [actualsYMin, budgetYMin, foreYMin];
        const maxValues = [actualsYMax, budgetYMax, foreYMax];

        this.xScale = d3
            .scaleTime()
            .domain(d3.extent(this.dataSet.dates))
            .range([this.dimensions.marginLeft, this.dimensions.boundedWidth])
            .nice();
        this.yScale = d3
            .scaleLinear()
            .domain([0, d3.max(this.dataSet.series, (d) => d3.max(d.values))])
            .nice()
            .range([this.dimensions.height - this.dimensions.marginBottom, this.dimensions.marginTop]);

        this.actualsScale = d3
            .scaleLinear()
            .domain([0, d3.max(actuals.values, (d) => Math.max(d) - 40)])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.budgetScale = d3
            .scaleLinear()
            .domain([0, d3.max(budget.values, (d) => Math.max(d) - 40)])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.forecastScale = d3
            .scaleLinear()
            .domain([0, d3.max(fore.values, (d) => Math.max(d) - 40)])
            .range([this.dimensions.boundedHeight, 0])
            .nice();

        this.svg
            .append("g")
            .attr("transform", `translate(0,${this.dimensions.height - this.dimensions.marginBottom})`)
            .attr("class", "xAxis")
            .call(
                d3
                    .axisBottom(this.xScale)
                    .tickFormat((d, i) => {
                        return this.timePeriods[i];
                    })
                    .ticks(5)
                    .tickPadding(5)
                    .tickSizeOuter(15)
                    .tickSizeInner(5)
            );
        this.svg
            .append("g")
            .attr("class", "axis-grid")
            .call(
                this.gridlines()
                    .tickSize(-this.dimensions.width)
                    .tickFormat("")
            );

        const yAxis = d3
            .axisLeft(this.yScale)
            .ticks(6)
            // .tickFormat((d, i) => {
            //     return this.yAxisTickValues[i];
            // })
            // .tickValues((d, i) => {
            //     return this.yAxisTickValues[i];
            // })
            .tickPadding(-100)
            .tickSizeOuter(200);
        // .tickSizeInner(-100);

        const yMinorAxis = d3
            .axisLeft(this.yScale)
            .ticks(5)
            .tickSize(6);

        this.svg
            .append("g")
            .attr("class", "yAxis")
            .style("opactity", "0.15")
            .attr("transform", `translate(${this.dimensions.marginLeft},0)`)
            .call(yAxis.tickSize(10))
            // .call((g) => g.select(".domain").remove())
            .call((g) =>
                g
                    .select(".tick:last-of-type text")
                    .clone()
                    .attr("x", 0 - this.dimensions.height / 2)
                    .attr("y", 0 - this.dimensions.marginLeft + 20)
                    .attr("text-anchor", "start")
                    .attr("transform", "rotate(-90)")
                    .text("KPI Detail (M)")
            );

        // this.svg
        //     .append("g")
        //     .attr("class", "yMinorAxis")
        //     .attr("transform", `translate(${this.dimensions.marginLeft},0)`)
        //     .call(yMinorAxis)
        //     .selectAll("text")
        //     .remove();

        // this.svg.selectAll(".yMinorAxis").remove();

        // const gridLine = this.dimensions.boundedHeight / 5;
        // this.svg
        //     .select(".yAxis")
        //     .append("g")
        //     .attr("class", "yAxis-grid")
        //     .style("stroke-dasharray", "2,2")
        //     .style("opacity", 0.5)
        //     .attr("transform", `translate(${this.dimensions.marginLeft}, ${gridLine})`)
        //     .call(yAxis.tickSize(-this.dimensions.width, 0, 0));
        // this.svg
        //     .append("g")
        //     .attr("class", "yAxis")
        //     .attr("id", "one")
        //     .style("opactity", "0.15")
        //     .attr("transform", `translate(${this.dimensions.marginLeft}, ${gridLine})`)
        //     .call(d3.axisLeft(this.yScale).tickSize(-this.dimensions.width, 0, 0))
        //     .call((g) => g.select(".domain").remove());
        // .call((g) =>
        //     g
        //         .select(".tick:last-of-type text")
        //         .clone()
        //         .attr("x", 3)
        //         .attr("text-anchor", "start")
        //         .attr("font-weight", "bold")
        //         .text("KPI Detail (M)")
        // );

        // this.svg
        //     .append("g")
        //     .attr("class", "yAxis axis-grid-iterate")
        //     .style("opactity", "0.15")
        //     .attr("transform", "translate(" + this.dimensions.marginLeft + "," + (this.dimensions.marginBottom - this.dimensions.marginTop) + ")");

        const line = d3
            .line()
            .x((d, i) => this.xScale(this.dataSet.dates[i]))
            .y((d) => this.yScale(d))
            .curve(curveLinear);

        this.svg
            .append("path")
            .datum(actuals.values)
            .attr("class", "actuals-path")
            .attr("fill", "none")
            .attr("stroke", "#124f8c")
            .attr("stroke-width", 2)
            .attr("d", line);

        this.svg
            .append("path")
            .datum(budget.values)
            .attr("class", "budget-path")
            .attr("fill", "none")
            .attr("stroke", "#124f8c")
            .attr("opacity", "0.5")
            .attr("stroke-width", 1)
            .attr("d", line);

        this.svg
            .append("path")
            .datum(fore.values)
            .attr("class", "forecast-path")
            .attr("fill", "none")
            .attr("stroke", "#47a2d6")
            .attr("opacity", "0.75")
            .attr("stroke-width", 1)
            .attr("d", line);

        //  TODO djr
        // this.svg
        //     .append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", 0 - this.dimensions.marginLeft)
        //     .attr("x", 0 - this.dimensions.height / 2)
        //     .attr("dy", "1em")
        //     .attr("class", "yAxis y-axis-label-line")
        //     .style("text-anchor", "middle")
        //     .text("KPI Detail (M)");
        this.svg
            .selectAll(".dot")
            .data(actuals.values)
            .enter()
            .append("circle")
            .attr("class", "actuals-dot")
            .attr("r", 4)
            .style("stroke", "#124f8c")
            .style("fill", "#124f8c")
            .style("stroke-size", "4")
            .attr("cx", (d, i) => this.xScale(this.dataSet.dates[i]))
            .attr("cy", (d) => this.yScale(d))
            .on("mouseover", this.showToolTip)
            .on("mousemove", this.moveToolTip)
            .on("mouseleave", this.hideToolTip);
        this.svg
            .selectAll(".dot")
            .data(budget.values)
            .enter()
            .append("circle")
            .attr("class", "budget-dot")
            .attr("r", 3)
            .style("stroke", "#124f8c")
            .style("fill", "white")
            .style("stroke-size", "1")
            .attr("cx", (d, i) => this.xScale(this.dataSet.dates[i]))
            .attr("cy", (d) => this.yScale(d))
            .on("mouseover", this.showToolTip)
            .on("mousemove", this.moveToolTip)
            .on("mouseleave", this.hideToolTip);
        this.svg
            .selectAll(".dot")
            .data(fore.values)
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
            .attr("cy", (d) => this.yScale(d))
            .on("mouseover", this.showToolTip)
            .on("mousemove", this.moveToolTip)
            .on("mouseleave", this.hideToolTip);

        this.svg
            .append("circle") // change the as-of line
            .attr("cx", this.xScale(this.dateSelected))
            .attr("cy", this.yScale(this.indexSelected))
            .attr("class", "dot selected-value")
            .style("stroke-width", 2)
            .style("stroke", "#124f8c");

        const div = d3
            .select(this.el)
            .append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        this.toolTip = d3
            .select("#multi-timeline")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-radius", "5px")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");
        this.showToolTip = (d) => {
            this.toolTip.transition().duration(1000);
            d3.select(d3.event.currentTarget)
                .style("stroke", "black")
                .attr("stroke-width", "2");
            this.toolTip
                .style("opacity", 1)
                .html((i) => this.dataSet.dates[i] + "  " + actuals.values[i])
                .style("left", d3.mouse(d3.event.currentTarget)[0] + 30 + "px")
                .style("top", d3.mouse(d3.event.currentTarget)[1] + 30 + "px");
        };
        this.moveToolTip = (d) => {
            this.toolTip.style("left", d3.mouse(d3.event.currentTarget)[0] + 70 + "px").style("top", d3.mouse(d3.event.currentTarget)[1] + "px");
        };
        this.hideToolTip = (d) => {
            d3.select(d3.event.currentTarget).style("stroke", "none");
            this.toolTip
                .transition()
                .duration(1000)
                .style("opacity", 0);
        };
    }

    gridlines() {
        return d3
            .axisLeft(this.yScale)
            .ticks(5)
            .tickFormat((d, i) => this.yAxisTickValues[i]);
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
                break;
            case "ic":
                this.forecastVis = !this.forecastVis;
        }
    }
}
