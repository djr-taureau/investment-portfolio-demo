import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";

import { select } from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { DimensionsType } from "../chart/utils";

import { revenueMock, revenueMock2 } from "../../../company-dashboard/financials-data";
import * as _ from "lodash";

@Component({
    selector: "sbp-multi-line",
    template: `
        <svg id="multiLine" width="960" height="500"></svg>
    `,
    styleUrls: ["./multi-line.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class MultiLineComponent implements OnInit {
    el: HTMLElement;
    data: any;

    // svg: any;
    margin = { top: 20, right: 80, bottom: 30, left: 50 };
    g: any;
    width: number;
    height: number;
    x;
    y;
    z;
    line;
    private dimensions: DimensionsType;

    constructor(private elementRef: ElementRef) {
        this.dimensions = {
            marginTop: 7.5,
            marginRight: 5,
            marginBottom: 3.96,
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
        this.data = revenueMock.map((v) => v.values.map((d) => d.date))[0];
        console.log(this.data);
        console.log(revenueMock);
        const seriesData = revenueMock;
        this.initChart();
        this.drawAxis();
        this.drawPath();
    }

    private initChart(): void {
        const multiLine = select(this.el).select("#multiLine");

        this.width = +multiLine.attr("width") - this.margin.left - this.margin.right;
        this.height = +multiLine.attr("height") - this.margin.top - this.margin.bottom;

        this.g = multiLine.append("g").attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);
        this.x = d3Scale.scaleTime().range([0, this.width]);
        this.y = d3Scale.scaleLinear().range([this.height, 0]);
        this.z = d3Scale.scaleOrdinal(d3ScaleChromatic.schemeCategory10);

        this.line = d3Shape
            .line()
            .curve(d3Shape.curveBasis)
            .x((d: any) => this.x(d.date))
            .y((d: any) => this.y(d.temperature));

        this.x.domain(d3Array.extent(this.data, (d: Date) => d));

        this.y.domain([
            d3Array.min(revenueMock, (c) => {
                return d3Array.min(c.values, (d) => {
                    return d.amountInUSD;
                });
            }),
            d3Array.max(revenueMock, (c) => {
                return d3Array.max(c.values, (d) => {
                    return d.amountInUSD;
                });
            })
        ]);

        this.z.domain(
            revenueMock.map((c) => {
                return c.id;
            })
        );
    }

    private drawAxis(): void {
        this.g
            .append("g")
            .attr("class", "axis axis--x")
            .attr("transform", `translate(0, ${this.height})`)
            .call(d3Axis.axisBottom(this.x));

        this.g
            .append("g")
            .attr("class", "axis axis--y")
            .call(d3Axis.axisLeft(this.y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("fill", "#000")
            .text("Values");
    }

    private drawPath(): void {
        const valueLine = this.g
            .selectAll(".valueLine")
            .data(revenueMock)
            .enter()
            .append("g")
            .attr("class", "valueLine");

        valueLine
            .append("path")
            .attr("class", "line")
            .attr("d", (d) => this.line(d.values.length))
            .style("stroke", (d) => this.z(d.id));

        valueLine
            .append("text")
            .datum((d) => {
                return { id: d.id, value: d.values[d.values.length - 1] };
            })
            .attr("transform", (d) => `translate(${this.x(d.value.date)}, ${this.y(d.value.amountInUSD)})`)
            .attr("x", 3)
            .attr("dy", "0.35em")
            .style("font", "10px sans-serif")
            .text((d) => {
                return d.id;
            });
    }
}
