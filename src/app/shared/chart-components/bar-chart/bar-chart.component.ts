import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from "@angular/core";
import * as d3 from "d3";
import { DimensionsType, getUniqueId } from "../chart/utils";
import { ScaleType } from "../interfaces/types";
import { TimelineDataPointFin } from "../interfaces/types";

@Component({
    selector: "sbp-bar-chart",
    templateUrl: "./bar-chart.component.html",
    styleUrls: ["./bar-chart.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit, OnChanges {
    @ViewChild("chart") private chartContainer: ElementRef;
    @Input() data: TimelineDataPointFin[];
    private margin: any = { top: 300, bottom: 400, left: 500, right: 500 };
    private chart: any;
    private width: number;
    private height: number;
    private xScale: any;
    private yScale: any;
    private colors: any;
    private xAxis: any;
    private yAxis: any;

    constructor() {}

    ngOnInit() {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    }

    ngOnChanges() {
        /*if (this.chart) {
          this.updateChart();
        }*/
    }

    createChart() {
        const element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        const svg = d3
            .select(element)
            .append("svg")
            .attr("width", element.offsetWidth)
            .attr("height", element.offsetHeight);

        // chart plot area
        this.chart = svg
            .append("g")
            .attr("class", "bars")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

        // define X & Y domains
        const xDomain = this.data.map((d) => d.date);
        const yDomain = [0, d3.max(this.data, (d) => d.ic)];

        // create scales
        this.xScale = d3
            .scaleBand()
            .padding(0.1)
            .domain(xDomain)
            .rangeRound([0, this.width]);
        this.yScale = d3
            .scaleLinear()
            .domain(yDomain)
            .range([this.height, d3.min(this.data.map((v) => v.IC))]);

        // bar colors
        this.colors = d3
            .scaleLinear()
            .domain([0, this.data.length])
            .range(["red", "blue"] as any[]);

        // x & y axis
        this.xAxis = svg
            .append("g")
            .attr("class", "axis axis-x")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top + this.height})`)
            .call(d3.axisBottom(this.xScale));
        this.yAxis = svg
            .append("g")
            .attr("class", "axis axis-y")
            .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`)
            .call(d3.axisLeft(this.yScale));
    }

    updateChart() {
        // update scales & axis
        this.xScale.domain(this.data.map((d) => d.date));
        this.yScale.domain([0, d3.max(this.data, (d) => d.IC)]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(d3.axisBottom(this.xScale));
        this.yAxis.transition().call(d3.axisLeft(this.yScale));

        const update = this.chart.selectAll(".bar").data(this.data);

        // remove exiting bars
        update.exit().remove();

        // update existing bars
        this.chart
            .selectAll(".bar")
            .transition()
            .attr("x", (d) => this.xScale(d.date))
            .attr("y", (d) => this.yScale(d.IC))
            .attr("width", (d) => this.xScale.bandwidth())
            .attr("height", (d) => this.height - this.yScale(d.IC))
            .style("fill", (d, i) => this.colors(i));

        // add new bars
        update
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d) => this.xScale(d.date))
            .attr("y", (d) => this.yScale(0))
            .attr("width", this.xScale.bandwidth())
            .attr("height", 0)
            .style("fill", (d, i) => this.colors(i))
            .transition()
            .delay((d, i) => i * 10)
            .attr("y", (d) => this.yScale(d.IC))
            .attr("height", (d) => this.height - this.yScale(d.IC));
    }
}
