import { AfterContentInit, Component, ElementRef, Input, OnInit } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import * as d3 from "d3";
import { axisLeft as d3_axisLeft, selectAll as d3_selectAll } from "d3";
import { select } from "d3-selection";
import * as _ from "lodash";
import { DimensionsType, getUniqueId } from "../chart/utils";
import { roundedRect } from "./shape.helper";
@Component({
    selector: "sbp-micro-bar",
    template: `
        <svg id="hist" width="71" height="60"></svg>
    `,
    styleUrls: ["./micro-bar.component.scss"]
})
export class MicroBarComponent implements OnInit, AfterContentInit {
    private margin: any = { top: 4, bottom: 75, left: 85, right: 30 };
    private chart: any;

    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() categoryAccessor: any;
    @Input() projectedAccessor: any;
    @Input() title: string;

    @Input()
    public set data(value: RevenueSeriesData[]) {
        if (value) {
            this._data = value;
            this.update();
        }
    }
    public get data(): RevenueSeriesData[] {
        return this._data;
    }
    private _data: RevenueSeriesData[];

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

    xScale: any;
    yScale: any;
    xRoundBands = 0.2;
    xAxisScale;
    yAxisTickValues: any[];
    actualsPresentValue;
    dateSelected;
    selectedValue: boolean;
    dimensions: DimensionsType;
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
    dataValues;
    sourceValues;
    indexSource;
    edges: boolean[];
    y;
    barId: string = getUniqueId("bar-chart");
    barTitle: string;

    private width: number;
    private height: number;

    constructor(elementRef: ElementRef) {
        this.dimensions = {
            marginTop: 3,
            marginRight: 5,
            marginBottom: 5,
            marginLeft: 2,
            height: 60,
            width: 71,
            boundedHeight: 60,
            boundedWidth: 71
        };

        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
        this.el = elementRef.nativeElement;
    }

    ngOnInit() {
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.yAxisTickValues = [0.2, 0, 80];
        this.dateSelected = "4Q18";
        this.timePeriods = [];
        if (this.data) {
            this.data.map((v) => {
                const timePart = `${v.financialQuarter}Q${v.date.substr(2, 2)}`;
                this.timePeriods = this.timePeriods.concat(timePart);
            });
        }
        this.indexSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
        this.barTitle = `.${this.title}-bar`;
    }

    private update(): void {
        this.categoryAccessor = (v) => `${v.financialQuarter}Q${v.date.substr(2, 2)}`;
        this.sourceTypeAccessor = (d) => d.sourceType;
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.yAxisTickValues = [0, 300, 450, 600, 750];
        this.timePeriods = [];
        // TODO:: djr after demo replace this with selector value
        this.dateSelected = "4Q18";
        this.data.map((v) => {
            if (this.categoryAccessor && this.categoryAccessor(v) === this.dateSelected) {
                this.selectedValue = true;
            }
            this.timePeriods = this.timePeriods.concat(this.categoryAccessor(v));
        });
        this.dataValues = _.map(this.data, _.property("valueInNative"));
        this.sourceValues = _.map(this.data, _.property("sourceType"));
        this.indexSource = _.indexOf(this.sourceValues, "B", 0);
    }

    ngAfterContentInit() {
        if (this.data) {
            this.updateScales();
        }
    }

    updateScales() {
        const BAR_WIDTH = (this.dimensions.width - this.dataValues.length) / this.dataValues.length;
        const y0 = Math.max(Math.abs(d3.min(this.dataValues)), Math.abs(d3.max(this.dataValues)));
        const x = d3
            .scaleLinear()
            .domain([0, this.dataValues.length])
            .range([0, this.dimensions.width]);
        const y = d3
            .scaleLinear()
            .domain([-y0 - 0.4, y0 + 0.4])
            .range([this.dimensions.height, 0]);
        const xAccessor = (d, i) => x(i);
        this.edges = [false, false, false, false];
        const edgesAccessor = (d): boolean[] => {
            if (Math.sign(d) === 1) {
                return [true, true, false, false];
            } else {
                return [false, false, true, true];
            }
        };
        const yAccessor = (d) => (d > 0 ? y(d) : y(0));
        const heightAccessor = (d) => Math.abs(y(d) - y(0));
        const radius = Math.min(this.dimensions.height, 3);
        // TODO:: possible solution for rounded corners currently not working
        const path = (d, i) => roundedRect(xAccessor(d, i), yAccessor(d), heightAccessor(d), BAR_WIDTH, radius, edgesAccessor(d));
        const svg = d3
            .select(this.el)
            .selectAll("#hist")
            .append("svg")
            .attr("width", this.dimensions.width)
            .attr("height", this.dimensions.height)
            .append("g");
        svg.append("line")
            .attr("x1", x(this.indexSource - 1) + 5)
            .attr("y1", this.dimensions.marginTop - 20)
            .attr("x2", x(this.indexSource - 1) + 5)
            .attr("y2", y(0))
            // .attr("y2", d3.min(y(0), y(this.indexSource - 1))
            .attr("class", "select-line")
            .style("stroke-width", 2)
            .style("stroke", "#dbe3f1");
        svg.selectAll(".bar")
            .data(this.dataValues)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => x(i))
            .attr("y", (d) => (d > 0 ? y(d) : y(0)))
            .attr("width", 10)
            .attr("height", (d) => Math.abs(y(d) - y(0)))
            .attr("fill", (d) => (d > 0 ? "#20a187" : "#eb643f"))
            .attr("opacity", (d, i) => (this.sourceValues[i] === "B" ? "0.25" : "1"))
            .attr("stroke", (d, i) => {
                if (this.timePeriods[i] === this.dateSelected && d > 0) {
                    return "#115449";
                } else if (this.timePeriods[i] === this.dateSelected && d < 0) {
                    return "#6b291d";
                } else {
                    return;
                }
            });
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", y(0))
            .attr("x2", this.dimensions.width)
            .attr("y2", y(0))
            .style("stroke-dasharray", "10, 2")
            .style("opacity", "0.5")
            .style("stroke", "#68758c");
        svg.append("g")
            .attr("transform", "translate(-1," + this.dimensions.height + ")")
            .call(d3.axisBottom(x));
    }
}
