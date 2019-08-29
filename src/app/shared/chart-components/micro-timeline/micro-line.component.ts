import { AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import { curveLinear } from "d3-shape";
import * as _ from "lodash";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";

@Component({
    selector: "sbp-micro-line",
    template: `
        <svg id="micro-line" width="120" height="110"></svg>
    `,
    styleUrls: ["./micro-timeline.component.scss"]
})
export class MicroLineComponent implements OnInit, AfterContentInit, OnChanges {
    private static logger: Logger = Logger.getLogger("MicroLineComponent");

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
    @Input() selectedPeriod: any;

    @Input()
    public set data(value: RevenueSeriesData[]) {
        if (value) {
            this._data = value;
            // this._apiData = value;
            this.update();
        }
    }
    public get data(): RevenueSeriesData[] {
        return this._data;
    }
    private _data: RevenueSeriesData[];
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
    public timePeriods: any[];
    // public actualsObj;
    // public budgetObj;
    // public forecastObj;
    public actuals: any;
    public budget: any;
    public forecast: any;
    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;
    public activeStyle: string;
    parseDate: any;
    historicalData: any[];
    projectedData: any[];
    dimensions: DimensionsType;
    xScale: any;
    yScale: ScaleType;
    xAccessorScaled: any;
    yAccessorScaled: any;
    y0AccessorScaled: any;
    projectedAccessorScaled: any;
    projectedScale;
    categorySelected: any;

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
    indexSelected;
    dateAccessor;
    el: HTMLElement;

    constructor(elementRef: ElementRef) {
        MicroLineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 15,
            marginRight: 11,
            marginBottom: 20,
            marginLeft: 1,
            height: 130,
            width: 140
        };
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
        this.el = elementRef.nativeElement;
    }

    // updateDimensions() {
    //     const width = this.container.nativeElement.offsetWidth;
    //     this.dimensions.width = this.container.nativeElement.offsetWidth;
    //     this.dimensions.boundedWidth = Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0);
    //     this.updateScales();
    // }

    ngOnInit() {
        MicroLineComponent.logger.debug(`ngOnInit()`);
    }

    private update(): void {
        if (!this.data) {
            return;
        }
        console.log(this.data);
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.activeStyle = "not-visible";
        this.timePeriods = [];
        const objSelected = _.find(this.data, (v) => v.date === this.selectedPeriod.date);
        this.dateSelected = _.get(this, "selectedPeriod.date", null);
        this.data.map((v) => {
            if (this.categoryAccessor && v.date === this.dateSelected) {
                this.selectedValue = true;
            }
            this.timePeriods = this.timePeriods.concat(this.categoryAccessor(v));
        });
        this.actualsPresentValue = this.data.filter((p) => p.date === this.selectedPeriod.date);
        this.historicalData = this.data.filter((v) => v.projection === false);
        this.projectedData = this.data.filter((v) => v.projection === true);
        this.categorySelected = this.categoryAccessor(objSelected);
        this.indexSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
        this.updateScales();
    }

    ngAfterContentInit() {
        if (this.data) {
            // this.updateDimensions();
            // this.updateScales();
        }
    }

    // @HostListener("window:resize", ["$event"])
    // onResize() {
    //     this.updateDimensions();
    // }

    ngOnChanges(changes: SimpleChanges): void {
        // this.updateScales();
    }

    updateScales() {
        if (!this.timePeriods && !this.data) {
            return;
        }

        d3.select(this.el)
            .selectAll("line.select-timeline")
            .remove();
        console.log(this.historicalData.map((v) => this.xAccessor(v)));

        const actualsXMin = d3.min(this.historicalData.map((v) => this.xAccessor(v)));
        const actualsXMax = d3.max(this.historicalData.map((v) => this.xAccessor(v)));
        const projectedXMin = d3.min(this.projectedData.map((v) => this.xAccessor(v)));
        const projectedXMax = d3.max(this.projectedData.map((v) => this.xAccessor(v)));
        const actualsYMin = d3.min(this.historicalData.map((v) => this.yAccessor(v)));
        const actualsYMax = d3.max(this.historicalData.map((v) => this.yAccessor(v)));
        const projectedYMin = d3.min(this.projectedData.map((v) => this.yAccessor(v)));
        const projectedYMax = d3.max(this.projectedData.map((v) => this.yAccessor(v)));

        const xScale = d3
            .scaleTime()
            .domain([actualsXMin, projectedXMax])
            .range([0, this.dimensions.width])
            .nice();

        const yScale = d3
            .scaleLinear()
            .domain([actualsYMin, projectedYMax])
            .range([this.dimensions.height, 0])
            .nice();

        // const xScaleProjected = d3.scaleTime()
        //    .domain([projectedXMin, projectedXMax])
        //    .rangeRound([0, this.dimensions.width])
        //    .nice();

        // const yScaleProjected = d3.scaleLinear()
        //    .domain([projectedYMin, projectedYMax])
        //    .rangeRound([this.dimensions.height, 0])
        //    .nice();

        // this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);

        const svg = d3.select(this.el).selectAll("#micro-line");
        svg.append("text")
            .attr("x", this.dimensions.width / 2)
            .attr("y", -30)
            .attr("dy", ".35em")
            .attr("font-size", 18)
            .attr("font-weight", "bold")
            .attr("fill", "black")
            .style("text-anchor", "middle")
            .text("Revenue");

        const xAxis = d3.axisBottom(xScale);
        const yAxis = d3.axisLeft(yScale);
        svg.append("g")
            .attr("transform", "translate(" + 0 + "," + this.dimensions.boundedHeight + ")")
            .attr("class", "x-axis")
            .style("display", "none")
            .call(xAxis);
        svg.append("g")
            .attr("transform", "translate(" + 33 + "," + 0 + ")")
            .attr("class", "y-axis")
            .style("display", "none")
            .call(yAxis);
        // d3.select(this.el)
        //     .selectAll("g.line.actuals")
        //     .remove();

        svg.append("line")
            .attr("x1", xScale(this.xAccessor(this.dateSelected)))
            .attr("y1", this.dimensions.boundedHeight)
            .attr("x2", xScale(this.xAccessor(this.dateSelected)))
            .attr("y2", this.dimensions.marginTop - 10)
            .attr("class", "select-timeline")
            .style("stroke-width", 1)
            .style("stroke", "#99a8bf");

        svg.append("g")
            .attr("id", "x-axis-label")
            .append("text")
            .attr("class", "label")
            .attr("x", this.dimensions.width)
            .attr("y", this.dimensions.height + 10)
            .attr("font-size", 12)
            .attr("font-style", "italic")
            .style("text-anchor", "end")
            .text("Quarter");

        svg.append("g")
            .attr("id", "y-axis-label")
            .append("text")
            .attr("class", "label")
            .attr("x", 0)
            .attr("y", -10)
            .attr("transform", "rotate(-90)")
            .attr("font-size", 12)
            .attr("font-style", "italic")
            .style("text-anchor", "end")
            .text("revenue");

        d3.select(this.el)
            .selectAll("circle.selected-value")
            .remove();

        svg.append("circle") // change the as-of line
            .attr("cx", xScale(this.xAccessor(this.dateSelected)))
            .attr("cy", yScale(this.yAccessor(this.actualsPresentValue)))
            .attr("class", "dot selected-value")
            .style("stroke-width", 2)
            .style("stroke", "#124f8c");

        // const circleVal = d3.select(this.el).selectAll("circle.selected-value");

        // svg.append("g")
        //     .selectAll(".dot")
        //     .data(this.historicalData)
        //     .enter()
        //     .append("circle")
        //     .attr("r", 3)
        //     .attr("cx", (d) => xScale(this.xAccessor(d)))
        //     .attr("cy", (d) => yScale(this.yAccessor(d)));

        d3.selectAll("circle").style("fill", "#124f8c");

        const line = d3
            .line()
            .x((d) => xScale(this.xAccessor(d)))
            .y((d) => yScale(this.yAccessor(d)));
        // .curve(curveLinear);

        console.log("data?", this.historicalData);
        svg.append("g")
            .append("path")
            .datum(this.historicalData)
            .attr("fill", "none")
            .attr("stroke", "#124f8c")
            .attr("class", "dot actuals")
            .attr("stroke-width", 2)
            .attr("d", line);

        console.log("data?", this.projectedData);
        svg.append("g")
            .append("path")
            .datum(this.projectedData)
            .attr("fill", "none")
            .attr("stroke", "#99a8bf")
            .attr("width", "30px")
            .attr("height", "11.7px")
            .attr("opacity", "0.8")
            .attr("class", "dot projected")
            .attr("stroke-width", 2)
            .attr("d", line);

        const area = d3
            .area()
            .defined((d) => !isNaN(d.amountInNative))
            .x((d) => xScale(d.date))
            .y0(yScale(0))
            .y1((d) => yScale(d.amountInNative));

        svg.append("path")
            .datum(this.historicalData.filter(area.defined()))
            .attr("class", "area")
            .attr("fill", "#eee")
            .attr("d", area);

        svg.append("path")
            .datum(this.historicalData)
            .attr("class", "area")
            .attr("d", area);
        console.log("data?", this.dateSelected);
        svg.select(".dot") // change the as-of line
            .attr("cx", xScale(this.xAccessor(this.dateSelected)))
            .attr("cy", yScale(this.yAccessor(this.actualsPresentValue)))
            .attr("class", "selected-value")
            .style("stroke-width", 2)
            .style("stroke", "#124f8c");
        // const line = d3
        //     .line()
        //     .defined((d) => d.projection === true)
        //     .x((d) => this.xScale(this.categoryAccessor(d)))
        //     .y((d) => this.yScale(this.yAccessor(d)))
        //     .curve(curveLinear);

        // svg.selectAll("path.actuals")
        //     .datum(this.data)
        //     .enter()
        //     .append("path");

        // const lineActuals = svg
        //     // .select(this.el)
        //     // .selectAll("g.line.actuals")
        //     .append("path")
        //     .attr("d", line(this.data.filter((d) =>  d.projection === false)))
        //     .attr("class", "line actuals")
        //     .attr("stroke", "steelblue")
        //     .attr("stroke-width", 2)
        //     .attr("fill", "none");
        // const lineProjected = svg
        //     // .select(this.el)
        //     //   .selectAll("g.line.actuals")
        //     .append("path")
        //     .attr("d", line(this.data.filter((d) => d.projection === true)))
        //     .attr("class", "line projected")
        //     .attr("stroke", "red")
        //     .attr("stroke-width", 2)
        //     .attr("fill", "none");
        // d3.select(this.el).selectAll("g.line.actuals")
        //       .append("path")
        //       .datum(this.projectedData)
        //       .attr("class", "line projected")
        //       .attr("fill", "none")
        //       .attr("stroke", "steelblue")
        //       .attr("stroke-width", 2)
        //       .attr("stroke", (d) => (d.projection === true ? "red" : "steelblue"))
        //       .attr("d", line);
        // svg.append("path")
        //     .classed("line", true)
        //     .attr("d", (d) => line(this.data))
        //     .style("stroke-width", (d) => d.projection === true ? 5 : 0.5);
    }
}
