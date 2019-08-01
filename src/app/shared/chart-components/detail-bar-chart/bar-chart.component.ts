import { Component, ElementRef, Input, OnChanges, OnInit } from "@angular/core";
import * as d3 from "d3";
import { range as d3_range, select as d3_select, scaleLinear as d3_scaleLinear, scaleBand as d3_scaleBand, scalePoint as d3_scalePoint } from "d3";
import * as _ from "lodash";
import { revenueMock2 } from "../../../company-dashboard/financials-data";

@Component({
    selector: "sbp-bar-chart",
    template: `
        <svg id="bar-chart" width="684" height="136">
            <clipPath id="round-corner">
                <rect x="0" y="0" width="10" height="56" rx="5" ry="5" />
            </clipPath>
        </svg>
    `,
    styleUrls: ["./detail-bar-chart.component.scss"]
})
export class BarChartComponent implements OnInit, OnChanges {
    @Input() private data: Array<any>;
    el: HTMLElement;

    @Input() yAccessor: any;
    private margin: any = { top: 40, bottom: 75, left: 75, right: 30 };
    private chart: any;
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

    yAxisTickValues: any[];

    constructor(elementRef: ElementRef) {
        this.el = elementRef.nativeElement;
    }

    ngOnInit() {
        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.yAxisTickValues = [0.2, 0, 80];
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
        const data = [3, 4, 2, -1, 2, 4];

        if (data) {
            console.log("where is it", data);
        }
        this.buildChart();
    }

    ngOnChanges() {
        if (this.chart) {
            console.log("barry", this.chart);
        }
    }

    buildChart() {
        const WIDTH = 600;
        const HEIGHT = 200;
        const DATA_MAX = 50;
        const DATA_MIN = -50;
        const DATA_COUNT = 6;
        const BAR_WIDTH = (WIDTH - DATA_COUNT) / DATA_COUNT;
        const data = d3_range(DATA_COUNT).map((d) => DATA_MIN + (DATA_MAX - DATA_MIN) * Math.random());
        const x = d3_scaleLinear()
            .domain([0, DATA_COUNT])
            .range([0, WIDTH]);
        const y = d3_scaleLinear()
            .domain([DATA_MIN, DATA_MAX])
            .range([HEIGHT, 0]);
        const svg = d3_select("#bar-chart")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .append("g");
        svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("clip-path", "url(#rounded-corner)")
            .attr("x", (d, i) => x(i))
            .attr("y", (d) => (d > 0 ? y(d) : y(0)))
            .attr("width", 36)
            .attr("height", (d) => Math.abs(y(d) - y(0)))
            .attr("fill", (d) => (d > 0 ? "#20a187" : "#eb643f"))
            .attr("stroke", "#115449");
        svg.append("line")
            .attr("x1", -6)
            .attr("y1", y(0))
            .attr("x2", WIDTH)
            .attr("y2", y(0))
            .style("stroke", "grey");
    }
}
