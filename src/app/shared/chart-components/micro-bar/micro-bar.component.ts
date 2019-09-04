import { AfterContentInit, Component, ElementRef, Input, OnInit, OnChanges } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import * as d3 from "d3";
import * as _ from "lodash";
import moment from "moment";
import { DimensionsType, getUniqueId } from "../chart/utils";
@Component({
    selector: "sbp-micro-bar",
    template: `
        <div id="hist"></div>
    `,
    styleUrls: ["./micro-bar.component.scss"]
})
export class MicroBarComponent implements OnInit {
    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() title: string;
    @Input() selectedPeriod: any;
    @Input() availablePeriods: any[];
    @Input() yAccessorValue: string;

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

    public timePeriods: any[];

    xScale: any;
    yScale: any;
    xRoundBands = 0.2;
    xAxisScale: any;
    yAxisTickValues: any[];
    actualsPresentValue: any;
    dateSelected;
    lineY1: any;
    lineY2: any;
    selectedValue: boolean;
    dimensions: DimensionsType = {
        marginTop: 3,
        marginRight: 5,
        marginBottom: 15,
        marginLeft: 2,
        height: 60,
        width: 71,
        boundedHeight: 60,
        boundedWidth: 71
    };
    el: HTMLElement;

    timePeriodAccessor;
    yTickValues: any[];
    xAccessorScaled: any;
    yAccessorScaled: any;
    sourceTypeAccessor: any;
    budgetAccessorScaled: any;
    forecastAccessorScaled: any;
    y0AccessorScaled: any;
    y0BudgetAccessorScaled: any;
    y0ForecastAccessorScaled: any;
    xAxisBottom: any;
    yAxisGrid: any;
    indexSelected: number;
    dataValues: any;
    sourceValues;
    indexSource;
    indexDateSelected;
    historicalData;
    projectedData;
    edges: boolean[];
    y;
    svg;
    barId: string = getUniqueId("bar-chart");
    barTitle: string;

    private setDimensions() {
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
    }

    constructor(elementRef: ElementRef) {
        this.el = elementRef.nativeElement;
        // this.svg = d3
        // this.svg = d3
        //     .select(this.el)
        //     .select("#hist")
        //     .append("svg")
        //     .attr("width", this.dimensions.width)
        //     .attr("height", this.dimensions.height)
        //     .append("g");
    }

    ngOnInit() {
        this.setDimensions();
        this.svg = d3
            .select(this.el)
            .selectAll("#hist")
            .append("svg")
            .attr("width", this.dimensions.width)
            .attr("height", this.dimensions.height)
            .append("g");
        this.yAccessor = (v) => v.value;
    }

    private update(): void {
        if ((this.data || []).length < 1 || !this.yAccessorValue) {
            return;
        }

        const dateToday = moment().format("YYYY-MM-DD");
        this.updateAccessorValue(this.yAccessorValue);
        this.sourceTypeAccessor = (d) => d.sourceType;
        this.timePeriods = [];
        this.dateSelected = _.get(this, "selectedPeriod.date", null);
        if (this.data) {
            this.data.map((v) => {
                if (v.date !== null && v.date !== undefined && v.date === this.dateSelected) {
                    this.selectedValue = true;
                }
            });
            this.timePeriods = _.map(this.data, _.property("date"));
            this.dataValues = _.map(this.data, _.property(`${this.yAccessorValue}`));
            this.sourceValues = _.map(this.data, _.property("sourceType"));
            this.indexDateSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
            this.indexSource = _.indexOf(this.sourceValues, "B", 0);
        }
        this.historicalData = _.take(this.data, this.data.length - 1);
        this.projectedData = _.takeRight(this.data, 1);
        this.indexSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
        this.dataValues = _.map(this.data, _.property(`${this.yAccessorValue}`));
        this.sourceValues = _.map(this.data, _.property("sourceType"));
        this.indexSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
        this.indexSource = _.indexOf(this.sourceValues, "B", 0);
        console.log(this.data);
        this.updateScales();
    }

    updateAccessorValue(value: string) {
        switch (value) {
            case "valueInUSD": {
                this.yAccessor = (v) => v.valueInUSD;
                break;
            }
            case "valueInNative": {
                this.yAccessor = (v) => v.valueInNative;
                break;
            }
        }
    }

    updateScales() {
        const dataLength = (this.dataValues || []).length;
        const dimensionWith = _.get(this, "dimensions.width", 0);
        const BAR_WIDTH = Math.max((dimensionWith - dataLength) / dataLength - 1, 1);
        this.svg.selectAll("line.select-barline").remove();
        this.svg.selectAll(".bar").remove();
        this.svg.selectAll(".y-line").remove();

        const y0 = d3.max(d3.extent(this.dataValues).map((d) => Math.abs(d)));

        this.xScale = d3
            .scaleLinear()
            .domain([0, (this.dataValues || []).length])
            .range([0, 90])
            .nice();

        this.yScale = d3
            .scaleLinear()
            .domain([-y0 - 0.4, y0 + 0.4])
            .range([60, 0])
            .nice();

        this.svg
            .selectAll(".bar")
            .data(this.dataValues)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => this.xScale(i))
            .attr("y", (d) => (d > 0 && d !== null ? this.yScale(d) : this.yScale(0)))
            .attr("width", BAR_WIDTH)
            .attr("height", (d) => Math.abs(this.yScale(d) - this.yScale(0)) + 0.5)
            .attr("fill", (d) => (d > 0 ? "#20a187" : "#eb643f"))
            .attr("opacity", (d, i) => {
                if (d === 0) {
                    return "0.5";
                } else {
                    return this.sourceValues[i] === "B" ? "0.35" : "1";
                }
            })
            .attr("stroke", (d, i) => {
                if (this.timePeriods[i] === this.dateSelected && d >= 0) {
                    this.lineY2 = this.yScale(d);
                    return "#115449";
                } else if (this.timePeriods[i] === this.dateSelected && d < 0) {
                    this.lineY2 = this.yScale(0);
                    return "#6b291d";
                } else {
                    return "#68758c";
                }
            });

        this.svg
            .append("line")
            .attr("x1", this.xScale(this.indexSelected) + Math.max(BAR_WIDTH / 2, 1))
            .attr("y1", 0)
            .attr("x2", this.xScale(this.indexSelected) + Math.max(BAR_WIDTH / 2, 1))
            .attr("y2", this.lineY2)
            .attr("class", "select-barline")
            .style("stroke-width", 2)
            .style("stroke", "#dbe3f1");
    }
}
