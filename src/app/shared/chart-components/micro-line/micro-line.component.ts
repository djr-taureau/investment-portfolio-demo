import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import { curveLinear } from "d3-shape";
import { getUniqueId } from "../chart/utils";
import { DimensionsType } from "../interfaces/types";
import * as _ from "lodash";
import * as d3 from "d3";

@Component({
    selector: "sbp-micro-line",
    template: `
        <div id="micro-timeline"></div>
    `,
    styleUrls: ["./micro-line.component.scss"]
})
export class MicroLineComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("MicroLineComponent");

    @Input() id: string;
    @Input() label: string;
    @Input() newData: any;
    @Input() xAccessor?: any;
    @Input() yAccessor?: any;
    @Input() keyAccessor?: any;
    @Input() valueAccessor?: any;
    @Input() yLabelVisible?: boolean;
    @Input() selectedPeriod: any;
    @Input() availablePeriods: any[];

    @Input()
    public set data(value: RevenueSeriesData[]) {
        if (value && value !== this._data) {
            this._data = value;
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
            this.update();
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
            this.update();
        }
    }
    public get barChartData2(): RevenueSeriesData[] {
        return this._barChartData2;
    }
    private _barChartData2: RevenueSeriesData[];
    public timePeriods: any[];
    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;
    public activeStyle: string;
    historicalData: any[];
    projectedData: any[];
    dimensions: DimensionsType;
    xScale: any;
    yScale: any;
    xAccessorScaled: any;
    yAccessorScaled: any;
    y0AccessorScaled: any;
    parseDate = d3.timeParse("%Y-%m-%d");
    display = false;
    xAxisVisible = false;
    selectedValue = false;
    gradientId: string = getUniqueId("Timeline-gradient");
    timelineId: string = getUniqueId("Timeline-Id");
    gradientColors: string[] = ["rgb(226, 222, 243)", "#f8f9fa"];
    dateSelected;
    actualsPresentValue;
    indexSelected;
    dateAccessor;
    indexDateSelected;
    svg: any;
    el: HTMLElement;

    /**
     * Flag indicating if the component has been initialized.
     */
    private initialized = false;

    constructor(elementRef: ElementRef) {
        MicroLineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 10,
            marginRight: 11,
            marginBottom: 10,
            marginLeft: 10,
            height: 160,
            width: 130
        };
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
        this.el = elementRef.nativeElement;
        this.svg = this.createSvg();
    }

    ngOnInit() {
        MicroLineComponent.logger.debug(`ngOnInit()`);
        this.initialized = true;
        this.svg = this.createSvg();
        this.yAccessor = (v) => {
            if (!!v) {
                return v.value || 0;
            } else {
                MicroLineComponent.logger.warn(`yAccessor( Undefined value found: ${v} )`);
                return 0;
            }
        };
        this.update();
    }

    private createSvg() {
        return (
            d3
                .select(this.el)
                .selectAll("#micro-timeline")
                .append("svg")
                .attr("id", `${this.timelineId}`)
                .attr("width", this.dimensions.boundedWidth)
                // .attr("height", this.dimensions.boundedHeight)
                .attr("height", 75)
                .attr("stroke-linejoin", "round")
                .attr("stroke-linecap", "round")
                .append("g")
                .attr("transform", "translate(0, 10)")
        );
    }

    private update(): void {
        if ((this.initialized && (this.data || []).length < 1) || !this.selectedPeriod || !this.yAccessor) {
            return;
        }

        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.activeStyle = "not-visible";
        this.timePeriods = [];
        this.dateSelected = _.get(this, "selectedPeriod.date", null);
        if (this.data) {
            this.data.map((v) => {
                if (!!v.date && v.date === this.dateSelected) {
                    this.selectedValue = true;
                }
            });
            this.timePeriods = _.map(this.data, _.property("date"));
            this.indexDateSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
        }
        this.actualsPresentValue = this.data.filter((p) => p.date === this.selectedPeriod.date);
        this.historicalData = _.take(this.data, this.data.length - 1);
        this.projectedData = _.takeRight(this.data, 2);
        this.updateScales();
    }

    updateScales() {
        if ((this.timePeriods || []).length < 1 || (this.data || []).length < 1 || _.isNil(this.dateSelected)) {
            return;
        }

        const actualsXMin = d3.min(this.historicalData.map((v) => this.xAccessor(v)));
        const actualsXMax = d3.max(this.historicalData.map((v) => this.xAccessor(v)));
        const actualsYMin = d3.min(this.historicalData.map((v) => this.yAccessor(v)));
        const actualsYMax = d3.max(this.historicalData.map((v) => this.yAccessor(v)));

        // xScale is domain of min to max values for data
        this.xScale = d3
            .scaleTime()
            .domain([actualsXMin, actualsXMax])
            .range([0, 90])
            .nice();

        this.yScale = d3
            .scaleLinear()
            .domain([0, actualsYMax])
            .range([60, 0])
            .nice();
        this.xAccessorScaled = (d) => this.xScale(this.xAccessor(d));
        this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);

        //  remove all old svg elements for rer render of chart
        this.svg.selectAll("circle.selected-value").remove();
        this.svg.selectAll(".select-timeline").remove();
        this.svg.selectAll("path#projLine").remove();
        this.svg.selectAll(".projected").remove();
        this.svg.selectAll(".historical").remove();
        this.svg.selectAll(".dot").remove();

        //  draw the vertical line for as of date selected
        this.svg
            .append("line")
            .attr("x1", this.xScale(this.parseDate(this.dateSelected)))
            .attr("y1", this.yScale(0))
            .attr("x2", this.xScale(this.parseDate(this.dateSelected)))
            .attr("y2", this.yScale(actualsYMax * 3))
            .attr("class", "select-timeline")
            .style("stroke-width", 1)
            .style("stroke", "#99a8bf");

        // line definition
        const line = d3
            .line()
            .x((d) => this.xScale(this.xAccessor(d)))
            .y((d) => this.yScale(this.yAccessor(d)))
            .curve(curveLinear);
        // area defintion
        const area = d3
            .area()
            .x(line.x())
            .y1(line.y())
            .y0(this.yScale(0));
        // line definition for projected data
        const lineProjected = d3
            .line()
            .defined((d) => d.date >= this.xAccessor(this.dateSelected))
            .x((d) => this.xScale(this.xAccessor(d.date)))
            .y((d) => this.yScale(this.yAccessor(d.value)));
        // draw the path for historical data
        this.svg
            .append("path")
            .datum(this.historicalData)
            .attr("class", "line historical")
            .attr("fill", "none")
            .attr("stroke", "#124f8c")
            .attr("stroke-width", 2)
            .attr("d", line);
        // remove paths for both lines
        this.svg.selectAll("path#projLine").remove();
        this.svg.selectAll(".projected").remove();
        this.svg
            .append("path")
            .datum(this.projectedData)
            .attr("id", "projLine")
            .attr("class", "line projected")
            .attr("fill", "none")
            .attr("stroke-dasharray", 3, 3)
            .attr("width", "30px")
            .attr("height", "12px")
            .attr("stroke-width", "1")
            .attr("stroke", "#99a8bf")
            .attr("opacity", "0.8")
            .attr("d", line);
        this.svg
            .append("path")
            .datum(this.historicalData)
            .attr("class", "area historical")
            .attr("fill", "#47a2d6")
            .attr("opacity", "0.15")
            .attr("stroke", "#47a2d6")
            .attr("d", area);
        //  draw the circle for as of selected date
        this.svg
            .append("circle") // change the as-of line
            .attr("cx", this.xScale(this.parseDate(this.dateSelected)))
            .attr("cy", this.yScale(this.yAccessor(this.data[this.indexDateSelected])))
            .attr("r", 4)
            .attr("id", "selected-dot")
            .attr("class", "dot selected-value")
            .style("stroke-width", 2)
            .style("fill", "white")
            .style("stroke", "#124f8c");
    }
}
