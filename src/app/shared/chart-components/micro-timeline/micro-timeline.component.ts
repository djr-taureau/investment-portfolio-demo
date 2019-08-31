import { AfterContentInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import { curveLinear } from "d3-shape";
import * as _ from "lodash";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";

@Component({
    selector: "sbp-micro-timeline",
    // template: `<svg id="micro-line"></svg>`,
    templateUrl: "./micro-timeline.component.html",
    styleUrls: ["./micro-timeline.component.scss"]
})
export class MicroTimelineComponent implements OnInit, OnChanges {
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
    @Input() selectedPeriod: any;
    @Input() yAccessorValue: string;

    @Input()
    public set data(value: any[]) {
        if (value && value.length > 0) {
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

    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;
    public activeStyle: string;

    historicalData: any[];
    projectedData: any[];
    dimensions: DimensionsType = {
        marginTop: 15,
        marginRight: 11,
        marginBottom: 20,
        marginLeft: 1,
        height: 110,
        width: 120
    };
    xScale: any;
    yScale: ScaleType;
    xAccessorScaled: any;
    yAccessorScaled: any;
    y0AccessorScaled: any;
    projectedAccessorScaled: any;
    projectedScale;
    indexDateSelected;

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
    el: HTMLElement;

    private setDimensions() {
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
    }

    constructor(elementRef: ElementRef) {
        MicroTimelineComponent.logger.debug(`constructor()`);

        this.el = elementRef.nativeElement;
    }

    ngOnInit() {
        MicroTimelineComponent.logger.debug(`ngOnInit()`);

        this.setDimensions();
        this.projectedAccessor = (v) => v.projection;
        d3.select(this.el)
            .selectAll("line.select-timeline")
            .remove();
        d3.select(this.el)
            .selectAll("g.line.actuals")
            .remove();
    }

    private update(): void {
        if ((this.data || []).length < 1 || !this.selectedPeriod) {
            return;
        }

        this.yAccessor = (v) => v.value;
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
        this.projectedData = _.takeRight(this.data, 1);
        this.indexSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
        this.updateScales();
    }

    ngOnChanges(changes: SimpleChanges): void {}

    updateScales() {
        if ((this.timePeriods || []).length < 1 || (this.data || []).length < 1 || _.isNil(this.dateSelected)) {
            return;
        }

        const actualsXMin = d3.min(this.historicalData.map((v) => this.xAccessor(v)));
        const actualsXMax = d3.max(this.historicalData.map((v) => this.xAccessor(v)));
        const projectedXMin = d3.min(this.projectedData.map((v) => this.xAccessor(v)));
        const projectedXMax = d3.max(this.projectedData.map((v) => this.xAccessor(v)));
        const actualsYMin = d3.min(this.historicalData.map((v) => this.yAccessor(v)));
        const actualsYMax = d3.max(this.historicalData.map((v) => this.yAccessor(v)));
        const projectedYMin = d3.min(this.projectedData.map((v) => this.yAccessor(v)));
        const projectedYMax = d3.max(this.projectedData.map((v) => this.yAccessor(v)));

        this.xScale = d3
            .scaleTime()
            .domain([actualsXMin, projectedXMax])
            .range([0, 90])
            .nice();

        this.yScale = d3
            .scaleLinear()
            .domain([actualsYMin, projectedYMax])
            .range([60, 0])
            .nice();
        // this.xScale = d3
        //     .scaleBand<string, number>()
        //     .domain(this.timePeriods)
        //     .rangeRound([0, this.dimensions.boundedWidth])
        //     .padding(0.5);

        // this.yScale = d3
        //     .scaleLinear()
        //     .domain(d3.extent(this.historicalData, this.yAccessor) as [number, number])
        //     .range([this.dimensions.boundedHeight, 0])
        //     .nice();

        // this.xAxisBottom = d3.axisBottom(this.xScale);
        this.xAccessorScaled = (d) => this.xScale(this.xAccessor(d));
        this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
        // this.projectedAccessorScaled = (d) => this.projectedScale(this.yAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);

        const svg = d3
            .select(this.el)
            .selectAll("#micro-timeline")
            .select("svg")
            .append("g");

        svg.append("line")
            .attr("x1", this.xAccessorScaled(this.dateSelected))
            .attr("y1", this.dimensions.boundedHeight)
            .attr("x2", this.xAccessorScaled(this.dateSelected))
            .attr("y2", this.dimensions.marginTop - 10)
            .attr("class", "select-timeline")
            .style("stroke-width", 1)
            .style("stroke", "#99a8bf");

        d3.select(this.el)
            .selectAll("circle.selected-value")
            .remove();

        d3.select(this.el)
            .selectAll("line.y-line")
            .remove();

        svg.append("circle") // change the as-of line
            .attr("cx", this.xAccessorScaled(this.dateSelected))
            .attr("cy", this.yAccessorScaled(this.indexSelected))
            .attr("class", "dot selected-value")
            .style("stroke-width", 2)
            .style("stroke", "#124f8c");

        const circleVal = d3.select(this.el).selectAll("circle.selected-value");

        const line = d3
            .line()
            .defined((d) => !isNaN(this.yAccessor(d)))
            .x((d) => this.xAccessorScaled(d))
            .y((d) => this.yAccessorScaled(d))
            .curve(curveLinear);

        d3.select(this.el)
            .selectAll("#micro-timeline")
            .append("path")
            .datum(this.historicalData)
            .attr("class", "line historical")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            // .attr("stroke", (d) => (d.projection === true ? "red" : "steelblue"))
            .attr("d", line);
        d3.select(this.el)
            .selectAll("#micro-timeline")
            .append("path")
            .datum(this.projectedData)
            .attr("class", "line projected")
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2)
            .attr("d", line);
    }
}
