import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { select } from "d3-selection";
import { scaleLinear, ScaleBand, scaleBand } from "d3";
import * as d3 from "d3";
import { range, histogram, max, min } from "d3-array";
import { DimensionsType } from "../chart/utils";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import { cashburn } from "../../../company-dashboard/financials-data";

@Component({
    selector: "sbp-micro-bar",
    template: `
        <svg id="hist" width="71" height="60"></svg>
    `,
    styleUrls: ["./micro-bar.component.scss"]
})
export class MicroBarComponent implements OnInit {
    xRoundBands = 0.2;
    xAxisScale;
    el: HTMLElement;

    private width: number;
    private height: number;
    private dimensions: DimensionsType;

    @Input() data: TimelineDataPointFin[];

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
        this.data = cashburn;
    }

    ngOnInit() {
        console.log("test", this.data);
        this.buildChart();
    }

    buildChart() {
        const dataset = [1, 1.1, 1.2, -0.8, 1.1, 1.2];
        const maxHeight = d3.max(dataset, (d) => {
            return d;
        });
        const svg = select(this.el)
            .select("#hist")
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
    }
}
