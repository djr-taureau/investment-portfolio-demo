import { Component, OnInit, ElementRef, ViewChild, ViewEncapsulation } from "@angular/core";

import { select } from "d3-selection";
import * as d3Scale from "d3-scale";
import * as d3ScaleChromatic from "d3-scale-chromatic";
import * as d3Shape from "d3-shape";
import * as d3Array from "d3-array";
import * as d3Axis from "d3-axis";
import { axisBottom as d3_axisBottom, axisLeft as d3_axisLeft, scaleLinear as d3_scaleLinear, select as d3_select } from "d3";
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
        const seriesData = revenueMock;
        const WIDTH = 400;
        const HEIGHT = 300;
        const MARGIN = { top: 10, right: 10, bottom: 20, left: 30 };
        const INNER_WIDTH = WIDTH - MARGIN.left - MARGIN.right;
        const INNER_HEIGHT = HEIGHT - MARGIN.top - MARGIN.bottom;
        const svg = d3_select("#multiLine")
            .append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .append("g")
            .attr("transform", "translate(" + MARGIN.left + "," + MARGIN.top + ")");
        const x = d3_scaleLinear()
            .domain([0, 1])
            .range([0, INNER_WIDTH]);
        const y = d3_scaleLinear()
            .domain([0, 1])
            .range([INNER_HEIGHT, 0]);
        const xAxis = d3_axisBottom(x).ticks(6);
        const yAxis = d3_axisLeft(y).ticks(10);
        const xAxisGrid = d3_axisBottom(x)
            .tickSize(-INNER_HEIGHT)
            .tickFormat("")
            .ticks(10);
        const yAxisGrid = d3_axisLeft(y)
            .tickSize(-INNER_WIDTH)
            .tickFormat("")
            .ticks(10);
        // svg.append("g")
        //     .attr("class", "x axis-grid")
        //     .attr("transform", "translate(0," + INNER_HEIGHT + ")")
        //     .call(xAxisGrid);
        svg.append("g")
            .attr("class", "y axis-grid")
            .call(yAxisGrid);
        // Create axes.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + INNER_HEIGHT + ")")
            .call(xAxis);
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);
    }
}
