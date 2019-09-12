import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Unknown } from "@core/domain/enum/unknown.enum";
import { Logger } from "@util/logger";
import { DimensionsType, getUniqueId } from "../chart/utils";
import * as d3 from "d3";
import * as _ from "lodash";

@Component({
    selector: "sbp-micro-bar",
    template: `
        <div id="hist"></div>
    `,
    styleUrls: ["./micro-bar.component.scss"]
})
export class MicroBarComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("MicroBarComponent");

    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() title: string;
    @Input() id: string;
    @Input() selectedPeriod: any;
    @Input() availablePeriods: any[];
    @Input() yAccessorValue: string;

    @Input()
    public set data(value: RevenueSeriesData[]) {
        if (value && value !== this._data) {
            this._data = value;
            this.update();
        }
    }
    public get data(): RevenueSeriesData[] {
        return this._data;
    }
    private _data: RevenueSeriesData[];

    public timePeriods: any[];

    xScale: any;
    yScale: any;
    actualsPresentValue: any;
    dateSelected;
    lineY1: any;
    lineY2: any;
    selectedValue: boolean;
    dimensions: DimensionsType = {
        marginTop: 2,
        marginRight: 5,
        marginBottom: 15,
        marginLeft: 2,
        height: 70,
        width: 71
    };

    el: HTMLElement;
    parseDate = d3.timeParse("%Y-%m-%d");
    sourceTypeAccessor: any;
    budgetAccessorScaled: any;
    indexSelected: number;
    dataValues: any;
    sourceValues;
    indexSource;
    indexDateSelected;
    y: any;
    svg: any;
    barId: string = getUniqueId("bar-chart");
    barTitle: string;
    barWidth;
    rx: any;
    ry: any;

    /**
     * Flag indicating if the component has been initialized.
     */
    private initialized = false;

    constructor(elementRef: ElementRef) {
        MicroBarComponent.logger.debug(`constructor()`);
        this.el = elementRef.nativeElement;
        this.setDimensions();
        this.svg = this.createSvg();
    }

    ngOnInit() {
        MicroBarComponent.logger.debug(`ngOnInit()`);
        this.initialized = true;
        this.svg = this.createSvg();
        this.yAccessor = (v) => {
            if (!!v) {
                return v.value || 0;
            } else {
                MicroBarComponent.logger.warn(`yAccessor( Undefined value found: ${v} )`);
                return 0;
            }
        };
        this.update();
    }

    private createSvg() {
        return d3
            .select(this.el)
            .selectAll("#hist")
            .append("svg")
            .attr("id", `${this.barId}`)
            .attr("width", this.dimensions.width)
            .attr("height", this.dimensions.height)
            .append("g")
            .attr("transform", "translate(0, 10)");
    }

    private setDimensions() {
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
    }

    private update(): void {
        if ((this.initialized && (this.data || []).length < 1) || !this.selectedPeriod) {
            return;
        }

        this.updateAccessorValue(this.yAccessorValue);
        this.sourceTypeAccessor = (d) => d.sourceType;
        this.timePeriods = [];
        this.dateSelected = _.get(this, "selectedPeriod.date", null);
        if (this.data) {
            this.data.map((v) => {
                if (v.date !== null && v.date !== undefined && v.date === this.dateSelected) {
                    this.selectedValue = true;
                }
            });
            this.timePeriods = _.map(this.data, _.property("date"));
            this.dataValues = _.map(this.data, _.property(`${this.yAccessorValue}`)).map((value) =>
                Unknown.isUnknownValue(Number(value)) ? 0 : value
            );
            this.sourceValues = _.map(this.data, _.property("sourceType"));
            this.indexDateSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
            this.indexSource = _.indexOf(this.sourceValues, "B", 0);
        }
        this.indexSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
        this.sourceValues = _.map(this.data, _.property("sourceType"));
        this.indexSelected = _.indexOf(this.timePeriods, this.dateSelected, 0);
        this.indexSource = _.indexOf(this.sourceValues, "B", 0);
        this.updateScales();
    }

    updateAccessorValue(value: string) {
        switch (value) {
            case "valueInUSD": {
                this.yAccessor = (v) => v.valueInUSD;
                break;
            }
            case "valueInNative": {
                this.yAccessor = (v) => v.valueInNative;
                break;
            }
        }
    }
    updateScales() {
        if (!this.svg) {
            return;
        }

        const posData = [];
        const negData = [];
        // separate the data into negative and positive to build rounded bars
        this.dataValues.map((d, i) => {
            if (d > 0) {
                posData[i] = d;
                negData[i] = 0;
            } else {
                posData[i] = 0;
                negData[i] = d;
            }
        });
        const dataLength = (this.dataValues || []).length;
        const dimensionWidth = _.get(this, "dimensions.width", 0);
        this.barWidth = Math.max((dimensionWidth - dataLength) / dataLength + 1, 1);
        this.svg.selectAll("line.select-barline").remove();
        this.svg.selectAll(".bar").remove();
        this.svg.selectAll(".rounded-rect").remove();
        this.svg.selectAll(".y-line").remove();

        const y0 = d3.max(d3.extent(this.dataValues).map((d) => Math.abs(d)));

        //  x scale is range of data which is also the array length
        this.xScale = d3
            .scaleLinear()
            .domain([0, (this.dataValues || []).length])
            .range([0, 90])
            .nice();

        //  yScale needs to run above and below for pos and neg valaues
        this.yScale = d3
            .scaleLinear()
            .domain([-y0 - 0.2, y0 + 0.2])
            .range([50, 0])
            .nice();
        //  rounded corn values
        this.rx = 2;
        this.ry = 2;

        const add = (a, b) => a + b;
        if (dataLength >= 1 && this.dataValues.reduce(add) !== 0) {
            this.svg
                .append("line")
                .attr("x1", this.xScale(this.indexSelected - 1) + 2.5 + this.barWidth / 2)
                .attr("y1", -50)
                .attr("x2", this.xScale(this.indexSelected - 1) + 2.5 + this.barWidth / 2)
                .attr("y2", 25)
                .attr("class", "select-barline")
                .style("stroke-width", 1)
                .style("stroke", "#dbe3f1");
        }
        // positive bars
        this.svg
            .selectAll("bar")
            .data(posData)
            .enter()
            .append("path")
            .attr("class", "rounded-rect")
            .attr("fill", (d) => (d > 0 ? "#20a187" : "#eb643f"))
            .attr("opacity", (d, i) => {
                if (d === 0) {
                    return "0.5";
                } else {
                    return this.sourceValues[i] === "B" ? "0.35" : "1";
                }
            })
            .attr("stroke", (d, i) => {
                if (this.timePeriods[i] === this.dateSelected && d > 0) {
                    this.lineY2 = this.yScale(d);
                    return "#115449";
                } else if (this.timePeriods[i] === this.dateSelected && d < 0) {
                    this.lineY2 = this.yScale(0);
                    return "#6b291d";
                } else if (d === 0) {
                    this.lineY2 = this.yScale(0);
                    return "#68758c";
                } else {
                    return;
                }
            })
            .attr("d", (value, i) => {
                let barString = "";
                if (value === 0) {
                    return (barString = `
                     M${this.barWidth * i + 1},${this.yScale(value)}
                     L${this.barWidth * (i + 1) - 1},${this.yScale(value)}Z
                    `);
                } else {
                    return (barString = `
                     M${this.barWidth * i + 1},${this.yScale(value)}
                     a${this.rx},${this.ry} 0 0 1 ${this.rx},${-this.ry}
                     h${this.barWidth - 2 * this.rx - 2}
                     a${this.rx},${this.ry} 0 0 1 ${this.rx},${this.ry}
                     v${Math.abs(this.yScale(value) - this.yScale(0))}
                     h${-this.barWidth + 2}Z
                   `);
                }
            });
        //  negative values
        this.svg
            .selectAll("bar")
            .data(negData)
            .enter()
            .append("path")
            .attr("class", "rounded-rect")
            .attr("fill", (d) => (d > 0 ? "#20a187" : "#eb643f"))
            .attr("opacity", (d, i) => {
                if (d === 0) {
                    return "0.5";
                } else {
                    return this.sourceValues[i] === "B" ? "0.35" : "1";
                }
            })
            .attr("stroke", (d, i) => {
                if (this.timePeriods[i] === this.dateSelected && d > 0) {
                    this.lineY2 = this.yScale(d);
                    return "#115449";
                } else if (this.timePeriods[i] === this.dateSelected && d < 0) {
                    this.lineY2 = this.yScale(0);
                    return "#6b291d";
                } else {
                    this.lineY2 = this.yScale(0);
                    return "#68758c";
                }
            })
            .attr("d", (value, i) => {
                let barString = "";
                if (value === 0) {
                    return barString;
                } else {
                    return (barString = `
                     M${this.barWidth * i + 1},${this.yScale(value)}
                     a${this.rx},${this.ry} 0 0 0 ${this.rx},${this.ry}
                     h${this.barWidth - 2 * this.rx - 2}
                     a${this.rx},${this.ry} 0 0 0 ${this.rx},${-this.ry}
                     v${-Math.abs(this.yScale(value) - this.yScale(0))}
                     h${-this.barWidth + 2 * this.rx - 2}Z
                   `);
                }
            });
    }
}
