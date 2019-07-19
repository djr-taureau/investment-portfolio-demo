import * as d3 from "d3";
import { SymbolType } from "d3-shape";

class SymbolWrapper {
    constructor(public name: string, public symbol: SymbolType) {}
}

function show(ev: Event) {
    "use strict";
    // Generic setup
    const margin = { top: 20, bottom: 20, right: 20, left: 30 };
    const width = 600 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;

    // create the standard chart
    const svg = d3
        .select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const symbols = [
        new SymbolWrapper("Cross", d3.symbolCross),
        new SymbolWrapper("Circle", d3.symbolCircle),
        new SymbolWrapper("Diamond", d3.symbolDiamond),
        new SymbolWrapper("Square", d3.symbolSquare),
        new SymbolWrapper("Star", d3.symbolStar),
        new SymbolWrapper("Triangle", d3.symbolTriangle),
        new SymbolWrapper("Wye", d3.symbolWye)
    ];

    const color = d3
        .scaleOrdinal()
        .domain(symbols.map((s) => s.name))
        .range(d3.schemeCategory10);

    const xBand = d3
        .scaleBand()
        .domain(symbols.map((s) => s.name))
        .range([0, width])
        .paddingInner(0.1);

    const symbolGroups = svg
        .selectAll(".symbol")
        .data(symbols)
        .enter()
        .append("g")
        .attr("class", (d) => "symbol")
        .attr("transform", (d) => `translate(${xBand(d.name)} 40)`);

    symbolGroups
        .append("path")
        .attr("fill", (d) => color(d.name))
        .attr("d", (d) =>
            d3
                .symbol()
                .size(2400)
                .type(d.symbol)()
        );
}
