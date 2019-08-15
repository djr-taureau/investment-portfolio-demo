import { AfterContentInit, Component, ElementRef, Input, OnInit } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import * as d3 from "d3";
import { axisLeft as d3_axisLeft, selectAll as d3_selectAll } from "d3";
import { select } from "d3-selection";
import * as _ from "lodash";
import { DimensionsType, getUniqueId } from "../chart/utils";
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
    budgetAccessorScaled: any;
    forecastAccessorScaled: any;
    y0AccessorScaled: any;
    y0BudgetAccessorScaled: any;
    y0ForecastAccessorScaled: any;
    xAxisBottom: any;
    yAxisGrid: any;
    indexSelected: number;
    dataValues;
    y;
    barId: string = getUniqueId("bar-chart");

    private width: number;
    private height: number;

    constructor(elementRef: ElementRef) {
        this.dimensions = {
            marginTop: 3,
            marginRight: 5,
            marginBottom: 3,
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
        this.buildChart();
        this.updateScales();
    }

    private update(): void {
        this.categoryAccessor = (v) => `${v.financialQuarter}Q${v.date.substr(2, 2)}`;
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
    }

    ngAfterContentInit() {
        this.buildChart();
        this.updateScales();
    }

    updateScales() {
        const dataset = this.dataValues || [];
        this.xScale = d3
            .scaleBand<string, number>()
            .domain(this.timePeriods)
            .range([0, this.dimensions.boundedWidth]);
        this.yScale = d3
            .scaleLinear()
            .domain([d3.min(dataset), d3.max(dataset)])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.xAxisBottom = d3.axisBottom(this.xScale);
        this.xAccessorScaled = (d) => this.xScale(this.categoryAccessor(d));
        this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
        this.yAxisGrid = d3_axisLeft(this.yAccessorScaled)
            .tickSize(-this.dimensions.boundedWidth)
            .tickFormat("")
            .ticks(6);
        const svg = d3_selectAll("#hist")
            .select("svg")
            .append("g");
        const line = d3
            .line()
            .x((d) => this.xAccessor)
            .y((d) => this.yAccessor);
        svg.append("line")
            .attr("x1", this.xScale(this.dateSelected))
            .attr("y1", this.dimensions.marginTop)
            .attr("x2", this.xScale(this.dateSelected))
            .attr("y2", this.yScale(0))
            .attr("class", "select-line")
            .style("stroke-width", 2)
            .style("stroke", "#dbe3f1");
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", this.yScale(0))
            .attr("x2", this.dimensions.width)
            .attr("y2", this.yScale(0))
            .style("stroke-dasharray", "10, 2")
            .style("opacity", "0.5")
            .style("stroke", "#68758c");
        svg.append("g")
            .attr("transform", "translate(0," + this.dimensions.height + ")")
            .call(d3.axisBottom(this.xScale));
    }

    buildChart() {
        const dataset = this.dataValues || [];
        const maxHeight = d3.max(dataset, (d) => {
            return d;
        });
        const svg = select(this.el)
            .selectAll("#hist")
            .append("svg")
            .attr("width", this.dimensions.width)
            .attr("height", this.dimensions.height);
        const barpadding = 2;
        const bars = svg
            .selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect");
        bars.attr("x", (d, i) => {
            return i * (this.dimensions.width / dataset.length);
        })
            .attr("y", (d) => {
                if (d > 0) {
                    return this.dimensions.height / 2 - 10 * d;
                } else {
                    return this.dimensions.height / 2;
                }
            })
            .style("stroke-linecap", "round")
            .attr("width", 10)
            .attr("height", (d) => {
                return Math.abs(10 * d);
            });
        bars.attr("fill", (d) => {
            if (d < 0) {
                return "#eb643f";
            } else {
                return "#20a187";
            }
        });
        bars.attr("opacity", (d, i) => {
            if (i > this.indexSelected) {
                return "0.25";
            } else {
                return "1";
            }
        });
        bars.attr("stroke", (d, i) => {
            if (i === this.indexSelected) {
                return "#115449";
            } else {
                return "none";
            }
        });
        const tags = svg
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text");
        tags.attr("x", (d, i) => {
            return i * (this.dimensions.width / dataset.length) + 6;
        }).attr("y", (d) => {
            if (d > 0) {
                return this.dimensions.height / 2 - 10 * d + 6;
            } else {
                return this.dimensions.height / 2 + 10 * Math.abs(d) - 6;
            }
        });
    }
}
