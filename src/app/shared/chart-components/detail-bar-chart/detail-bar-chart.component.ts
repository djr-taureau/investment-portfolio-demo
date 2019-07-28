import { Component, OnInit, ElementRef, Input, ViewEncapsulation } from "@angular/core";
import { select } from "d3-selection";

import * as d3 from "d3";

import { DimensionsType } from "../chart/utils";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import { cashburn } from "../../../company-dashboard/financials-data";

@Component({
    selector: "sbp-detail-bar-chart",
    template: `
        <svg id="bar-chart" width="684" height="136"></svg>
    `,
    styleUrls: ["./detail-bar-chart.component.scss"]
})
export class DetailBarChartComponent implements OnInit {
    xAxisScale;
    el: HTMLElement;

    private width: number;
    private height: number;
    private dimensions: DimensionsType;

    @Input() data: TimelineDataPointFin[];
    @Input() label: string;

    constructor(private elementRef: ElementRef) {
        this.dimensions = {
            marginTop: 40,
            marginRight: 30,
            marginBottom: 75,
            marginLeft: 46,
            height: 136,
            width: 684,
            boundedHeight: 138,
            boundedWidth: 685
        };

        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
        this.el = elementRef.nativeElement;
        this.data = cashburn;
    }

    ngOnInit() {
        this.buildChart();
    }

    buildChart() {
        // data values will need to be transformed
        const dataset = [3, 4, 2, -1, 2, 4];
        const maxHeight = d3.max(dataset, (d) => {
            return d;
        });
        const svg = select(this.el)
            .select("#bar-chart")
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
            .attr("width", 36)
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
        bars.attr("stroke", "#115449");
        const tags = svg
            .selectAll("text")
            .data(dataset)
            .enter()
            .append("text");
        tags.attr("x", (d, i) => {
            return i * (this.dimensions.width / dataset.length) + 5;
        }).attr("y", (d) => {
            if (d > 0) {
                return this.dimensions.height / 2 - 10 * d + 5;
            } else {
                return this.dimensions.height / 2 + 10 * Math.abs(d) - 5;
            }
        });
        // TODO:: Leaving this for adding label text to axis
        // svg.append("text")
        //     .attr("transform", "rotate(-90)")
        //     .attr("y", this.dimensions.marginLeft)
        //     .attr("x", 0 - this.dimensions.height / 2)
        //     .attr("dy", "1em")
        //     .style("text-anchor", "middle")
        //     .text("");
    }
}
