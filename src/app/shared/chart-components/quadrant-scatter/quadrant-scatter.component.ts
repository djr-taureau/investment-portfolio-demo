import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, AfterContentInit } from "@angular/core";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import * as _ from "lodash";
import { DimensionsType, ScaleType } from "../interfaces/types";
import { getUniqueId } from "../chart/utils";

@Component({
    selector: "sbp-quadrant-scatter",
    template: `
        <div id="quadScatter"></div>
        <div class="status"></div>
    `,
    styleUrls: ["./quadrant-scatter.component.scss"]
})
export class QuadrantScatterComponent implements OnInit, OnChanges, AfterContentInit {
    private static logger: Logger = Logger.getLogger("QuadrantScatterComponent");

    @Input() data: any[];
    @Input() label: string;
    @Input() newData: any;
    @Input() xAccessor?: any;
    @Input() yAccessor?: any;
    @Input() keyAccessor?: any;
    @Input() categoryAccessor?: any;
    @Input() projectedAccessor?: any;
    @Input() valueAccessor?: any;
    @Input() yLabelVisible?: boolean;

    @ViewChild("container") container: ElementRef;

    el: HTMLElement;
    dimensions: DimensionsType;
    xScale: any;
    yScale: ScaleType;
    xAccessorScaled: any;
    yAccessorScaled: any;
    xAxisTickValues: any[];
    yAxisTickValues: any[];
    gradientId: string = getUniqueId("Scatter-gradient");
    gradientColors: string[] = ["rgb(226, 222, 243)", "#f8f9fa"];
    quad1: string;
    quad2: string;
    quad3: string;
    quad4: string;
    tooltip: any;
    showTooltip: any;
    moveTooltip: any;
    hideTooltip: any;
    color: any;
    groups: any;
    svg: any;
    x: any;
    y: any;
    z: any;
    size: any;

    constructor(elementRef: ElementRef) {
        QuadrantScatterComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 30,
            marginRight: 30,
            marginBottom: 30,
            marginLeft: 60,
            height: 563,
            width: 790
        };
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
        this.el = elementRef.nativeElement;
    }

    ngOnInit() {
        QuadrantScatterComponent.logger.debug(`ngOnInit()`);
    }

    ngOnChanges(changes: SimpleChanges): void {
        //
    }

    ngAfterContentInit() {
        this.buildChart();
    }

    buildChart() {
        d3.select(this.el)
            .selectAll("circle")
            .remove();
        this.data = this.generateData();
        const pad = 20;
        const leftPad = 100;
        const quad1 = this.data.filter((d) => d.x < 0 && d.y > 0);
        const quad2 = this.data.filter((d) => d.x > 0 && d.y > 0);
        const quad3 = this.data.filter((d) => d.x > 0 && d.y < 0);
        const quad4 = this.data.filter((d) => d.x < 0 && d.y < 0);
        this.quad1 = `${quad1.length}0%`;
        this.quad2 = `${quad2.length}0%`;
        this.quad3 = `${quad3.length}0%`;
        this.quad4 = `${quad4.length}0%`;
        const maxY = d3.max(this.data.map((d) => Math.abs(d.y)));
        const minY = d3.min(this.data.map((d) => Math.abs(d.y)));
        const maxX = d3.max(this.data.map((d) => Math.abs(d.x)));
        const minX = d3.min(this.data.map((d) => Math.abs(d.x)));

        this.groups = ["USA", "CAN", "CHN", "GBR"];
        const groups = _.uniq(_.map(this.data, "group"));
        this.color = d3
            .scaleOrdinal(d3.schemeCategory10)
            .domain(this.groups.values())
            .range(["#eb9e3f", "#47a2d6", "#1d2759", "#dbe3f1"]);
        this.svg = d3
            .select(this.el)
            .selectAll("#quadScatter")
            .append("svg")
            .attr("width", this.dimensions.width + this.dimensions.marginLeft + this.dimensions.marginRight)
            .attr("height", this.dimensions.height + this.dimensions.marginTop + this.dimensions.marginBottom)
            .append("g")
            .attr("transform", "translate(" + this.dimensions.marginLeft + "," + this.dimensions.marginTop + ")");
        this.x = d3
            .scaleLinear()
            .domain([-maxX, maxX])
            .range([leftPad, this.dimensions.width - pad]);
        this.y = d3
            .scaleLinear()
            .domain([-maxY, maxY])
            .range([this.dimensions.height, 0]);
        const xAxis = d3
            .axisBottom(this.x)
            .tickFormat("")
            .tickSize(0);

        const yAxis = d3
            .axisLeft(this.y)
            .tickFormat("")
            .tickSize(0);

        this.svg
            .append("g")
            .attr("class", " x axis")
            .style("stroke", "#99a8bf")
            .style("stroke-dasharray", "2,2")
            .style("opacity", 0.5)
            .attr("transform", "translate(0," + this.dimensions.height / 2 + ")")
            .call(xAxis);
        this.svg
            .append("g")
            .attr("class", "y axis")
            .style("stroke-dasharray", "2,2")
            .style("opacity", 0.5)
            .attr("transform", "translate(" + this.x(0) + ", 0)")
            .call(yAxis);
        this.svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("class", "image")
            .attr("x", this.dimensions.width / 2 + 25)
            .attr("y", this.dimensions.height + 30)
            .style("stroke", "#99a8bf")
            .style("font-size", "14px")
            .style("font-family", "PostGrotesk")
            .style("width", "80px")
            .style("height", "16px")
            .style("opacity", 0.75)
            .text("Revenue vs Bud");
        this.svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", 5)
            .attr("y", this.dimensions.height / 2)
            .style("font-size", "14px")
            .style("font-family", "PostGrotesk")
            .style("opacity", 0.75)
            .style("stroke", "#99a8bf")
            .text("Profit vs Bud");
        // quad 1
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", 48)
            .attr("y", 0)
            .style("stroke", "#3b4659")
            .style("font-size", "12px")
            .style("font-family", "PostGrotesk")
            .style("width", "80px")
            .style("height", "16px")
            .style("opacity", 0.75)
            .text(`${this.quad1} Portfolio Value`);
        const topLeftLeft = this.svg
            .append("image")
            .attr("xlink:href", "https://localhost:4400/assets/image/performance-under.svg")
            .attr("x", -55)
            .attr("y", this.dimensions.marginTop - 20)
            .attr("height", "10px")
            .attr("width", "16px");

        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", 14)
            .attr("y", this.dimensions.marginTop - 12)
            .style("stroke", "#eb643f")
            .style("padding-top", "18px")
            .style("font-size", "10px")
            .style("font-family", "PostGrotesk")
            .style("width", "44px")
            .style("height", "10px")
            .text("REVENUE");
        this.svg
            .append("image")
            .attr("xlink:href", "https://localhost:4400/assets/image/performance-over.svg")
            .attr("x", 30)
            .attr("y", this.dimensions.marginTop - 20)
            .attr("height", "10px")
            .attr("width", "16px");
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", 90)
            .attr("y", this.dimensions.marginTop - 11)
            .style("stroke", "#20a187")
            .style("padding-top", "18px")
            .style("font-size", "10px")
            .style("font-family", "PostGrotesk")
            .style("width", "44px")
            .style("height", "10px")
            .text("PROFIT");
        this.svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", this.dimensions.width - 25)
            .attr("y", 0)
            .style("stroke", "#3b4659")
            .style("font-size", "12px")
            .style("letter-spacing", "0.25px")
            .style("font-family", "PostGrotesk")
            .style("width", "80px")
            .style("height", "16px")
            .style("opacity", 0.75)
            .text(`Portfolio Value ${this.quad2}`);
        this.svg
            .append("image")
            .attr("xlink:href", "https://localhost:4400/assets/image/performance-over.svg")
            .attr("x", this.dimensions.width - 105)
            .attr("y", this.dimensions.marginTop - 20)
            .attr("height", "10px")
            .attr("width", "16px");
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", this.dimensions.width - 42)
            .attr("y", this.dimensions.marginTop - 11)
            .style("stroke", "#20a187")
            .style("padding-top", "18px")
            .style("font-size", "10px")
            .style("font-family", "PostGrotesk")
            .style("width", "44px")
            .style("height", "10px")
            .text("REVENUE");

        this.svg
            .append("image")
            .attr("xlink:href", "https://localhost:4400/assets/image/performance-over.svg")
            .attr("x", this.dimensions.width - 32)
            .attr("y", this.dimensions.marginTop - 19)
            .attr("height", "10px")
            .attr("width", "16px");
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", this.dimensions.width + 24)
            .attr("y", this.dimensions.marginTop - 11)
            .style("stroke", "#20a187")
            .style("padding-top", "18px")
            .style("font-size", "10px")
            .style("font-family", "PostGrotesk")
            .style("width", "44px")
            .style("height", "10px")
            .text("PROFIT");
        this.svg
            .append("text")
            .attr("text-anchor", "middle")
            .attr("x", this.dimensions.width - 25)
            .attr("y", this.dimensions.height)
            .style("stroke", "#3b4659")
            .style("font-size", "12px")
            .style("letter-spacing", "0.25px")
            .style("font-family", "PostGrotesk")
            .style("width", "80px")
            .style("height", "16px")
            .style("opacity", 0.75)
            .text(`Portfolio Value ${this.quad3}`);
        this.svg
            .append("image")
            .attr("xlink:href", "https://localhost:4400/assets/image/performance-over.svg")
            .attr("x", this.dimensions.width - 107)
            .attr("y", this.dimensions.height + 15)
            .attr("height", "10px")
            .attr("width", "16px");
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", this.dimensions.width - 42)
            .attr("y", this.dimensions.height + 14)
            .style("stroke", "#20a187")
            .style("font-size", "10px")
            .style("font-family", "PostGrotesk")
            .style("width", "44px")
            .style("height", "10px")
            .text("REVENUE");
        this.svg
            .append("image")
            .attr("xlink:href", "https://localhost:4400/assets/image/performance-under.svg")
            .attr("x", this.dimensions.width - 30)
            .attr("y", this.dimensions.height + 15)
            .attr("height", "10px")
            .attr("width", "16px");
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", this.dimensions.width + 26)
            .attr("y", this.dimensions.height + 14)
            .style("stroke", "#eb643f")
            .style("font-size", "10px")
            .style("font-family", "PostGrotesk")
            .style("width", "44px")
            .style("height", "10px")
            .text("PROFIT");
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", this.dimensions.marginLeft - 5)
            .attr("y", this.dimensions.height)
            .style("stroke", "#3b4659")
            .style("letter-spacing", "0.25px")
            .style("font-size", "12px")
            .style("font-family", "PostGrotesk")
            .style("width", "80px")
            .style("height", "16px")
            .style("opacity", 0.75)
            .text(`${this.quad4} Portfolio Value`);
        this.svg
            .append("image")
            .attr("xlink:href", "https://localhost:4400/assets/image/performance-under.svg")
            .attr("x", -48)
            .attr("y", this.dimensions.height + 16)
            .attr("height", "10px")
            .attr("width", "16px");
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", 22)
            .attr("y", this.dimensions.height + 15)
            .style("stroke", "#eb643f")
            .style("font-size", "10px")
            .style("font-family", "PostGrotesk")
            .style("width", "44px")
            .style("height", "10px")
            .text("REVENUE");
        this.svg
            .append("image")
            .attr("xlink:href", "https://localhost:4400/assets/image/performance-under.svg")
            .attr("x", 40)
            .attr("y", this.dimensions.height + 16)
            .attr("height", "10px")
            .attr("width", "16px");
        this.svg
            .append("text")
            .attr("text-anchor", "end")
            .attr("x", 99)
            .attr("y", this.dimensions.height + 15)
            .style("stroke", "#eb643f")
            .style("font-size", "10px")
            .style("font-family", "PostGrotesk")
            .style("width", "44px")
            .style("height", "10px")
            .text("PROFIT");
        const padding = 100;
        this.z = d3
            .scaleLinear()
            .domain(d3.extent(this.data.map((d) => d.density)))
            .range([20, 60]);
        this.tooltip = d3
            .select("#quadScatter")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-radius", "5px")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px");
        this.showTooltip = (d) => {
            this.tooltip.transition().duration(1000);
            d3.select(d3.event.currentTarget)
                .style("stroke", "black")
                .attr("stroke-width", "2");
            this.tooltip
                .style("opacity", 1)
                .html("Company: Profit Budget  " + d.y + "  RevenueBudget  " + d.x)
                .style("left", d3.mouse(d3.event.currentTarget)[0] + 30 + "px")
                .style("top", d3.mouse(d3.event.currentTarget)[1] + 30 + "px");
        };
        this.moveTooltip = (d) => {
            this.tooltip.style("left", d3.mouse(d3.event.currentTarget)[0] + 70 + "px").style("top", d3.mouse(d3.event.currentTarget)[1] + "px");
        };
        this.hideTooltip = (d) => {
            d3.select(d3.event.currentTarget).style("stroke", "none");
            this.tooltip
                .transition()
                .duration(1000)
                .style("opacity", 0);
        };
        const highlight = (d) => {
            // reduce opacity of all groups
            d3.selectAll(".bubbles").style("opacity", 0.05);
            // except the one that is hovered
            d3.selectAll("." + d).style("opacity", 1);
        };
        const bubbleHover = (d) => {
            d3.select(d3.event.currentTarget).style("stroke", "black");
        };
        const noHighlight = (d) => {
            d3.selectAll(".bubbles").style("opacity", 1);
        };
        this.svg
            .append("g")
            .selectAll("dot")
            .data(this.data)
            .enter()
            .append("circle")
            .attr("class", (d) => "bubbles " + d.group)
            .attr("cx", (d) => this.x(d.x))
            .attr("cy", (d) => this.y(d.y))
            .attr("r", (d) => this.z(d.density) / 2)
            .attr("fill", (d) => this.color(d.group))
            .attr("opacity", (d) => "0.6")
            .on("mouseover", this.showTooltip, bubbleHover)
            .on("mousemove", this.moveTooltip)
            .on("mouseleave", this.hideTooltip)
            .on("click", (d, i) => console.log("company Id clicked is", d.id, i));
        const circles = this.svg
            .selectAll("dot")
            .data(this.data)
            .enter()
            .append("g");
        circles
            .append("circle")
            .attr("cx", (d) => this.x(d.x))
            .attr("cy", (d) => this.y(d.y))
            .attr("r", (d) => this.z(d.density) / 10)
            .attr("fill", (d) => this.color(d.group))
            .on("mouseover", this.showTooltip)
            .on("mousemove", this.moveTooltip)
            .on("mouseleave", this.hideTooltip)
            .on("click", (d, i) => console.log("company Id clicked is", d.id, i));
        const valuesToShow = [5, 10, 20];
        const xCircle = 390;
        const xLabel = 440;
        const size = 20;
        const allgroups = ["USA", "CAN", "CHN", "GBR"];
        const n = allgroups.length;
        const itemWidth = 80;
        const itemHeight = 18;

        this.svg
            .selectAll("myrect")
            .data(allgroups)
            .enter()
            .append("circle")
            .attr("cx", 390)
            .attr("cy", (d, i) => 10 + i * (size + 5))
            .attr("r", 7)
            .style("fill", (d) => this.color(d));
        this.svg
            .selectAll("mylabels")
            .data(allgroups)
            .enter()
            .append("text")
            .attr("x", 390 + size * 0.8)
            .attr("y", (d, i) => i * (size + 5) + size / 2)
            .style("font-family", "PostGrotesk")
            .style("font-size", "14px")
            .style("fill", "#3b4659")
            .text((d) => d)
            .attr("text-anchor", "left")
            .style("alignment-baseline", "bottom");
    }

    generateData() {
        const groups = ["USA", "CAN", "CHN", "GBR"];
        const companies = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        const data = [];
        _.times(_.random(10, 10), () => {
            data.push({
                id: _.sample(companies),
                density: _.random(10, 1000),
                x: _.random(-100, 100),
                y: _.random(-100, 100),
                group: _.sample(groups)
            });
        });
        return data;
    }
}
