import { AfterContentInit, OnInit, Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, ViewChild } from "@angular/core";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import { RevenueSeriesData } from "@core/domain/company.model";
import { DimensionsType, getUniqueId } from "../chart/utils";
import * as _ from "lodash";

@Component({
    selector: "sbp-micro-histogram",
    templateUrl: "./micro-histogram.component.html",
    styleUrls: ["./micro-histogram.component.scss"]
})
export class MicroHistogramComponent implements AfterContentInit, OnChanges, OnInit {
    private static logger: Logger = Logger.getLogger("MicroHistogramComponent");

    @Input() xAccessor: any;
    @Input() yAccessor: any;
    @Input() categoryAccessor: any;
    @Input() projectedAccessor: any;
    @Input() title: string;

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

    sourceTypeAccessor;
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
    sourceValues;
    parseDate = d3.timeParse("%m/%d/%Y");
    bins: any[];
    gradientId: string = getUniqueId("Histogram-gradient");
    gradientColors: string[] = ["#9980FA", "rgb(226, 222, 243)"];
    barId: string = getUniqueId("Histogram-bar");
    barColor = "#eb643f";
    keyAccessor;
    widthAccessorScaled;
    heightAccessorScaled;
    newYAccessor;

    @ViewChild("container") container: ElementRef;

    constructor() {
        MicroHistogramComponent.logger.debug(`constructor()`);
        const barWidth = 5;
        this.dimensions = {
            marginTop: 7.5,
            marginRight: 2.4,
            marginBottom: 3.96,
            marginLeft: 5.4,
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
        this.sourceValues = _.map(this.data, _.property("sourceType"));
    }

    updateDimensions() {
        const width = this.container.nativeElement.offsetWidth;
        this.dimensions.width = this.container.nativeElement.offsetWidth;
        this.dimensions.boundedWidth = Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0);
        this.updateScales();
    }

    @HostListener("window:resize", ["$event"])
    onResize() {
        this.updateDimensions();
    }

    ngAfterContentInit() {
        MicroHistogramComponent.logger.debug(`ngAfterContentInit()`);
        this.updateDimensions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateScales();
    }

    updateScales() {
        if (!this.data) {
            return;
        } else {
            const max = d3.max(this.dataValues);
            const min = d3.min(this.dataValues);
            // Generate a histogram using twenty uniformly-spaced bins.
            const numberOfThresholds = 6;
            const histogram = d3
                .histogram()
                .thresholds(5)
                .value((d) => d);
            const histogramData = histogram(this.dataValues);
            const x0 = Math.max(-d3.min(this.dataValues), d3.max(this.dataValues));
            const y0 = Math.max(-d3.min(histogramData, (d) => d.length), Math.abs(d3.max(histogramData, (d) => d.length)));
            this.xScale = d3
                .scaleLinear()
                .domain([-x0, x0])
                .range([0, this.dimensions.boundedWidth]);

            this.yScale = d3
                .scaleLinear()
                .domain([-y0, y0])
                .range([this.dimensions.boundedHeight, 0])
                .nice();

            const barPadding = 3;

            this.xAccessorScaled = (d) => this.xScale(d.x0) + 2;
            this.yAccessorScaled = (d) => this.dimensions.height - this.yScale(d.length);
            // this.yAccessorScaled = (d) => (d > 0 ? this.yScale(yAccessor(d)) : this.yScale(yAccessor(0)));
            this.widthAccessorScaled = (d) => this.xScale(d.x1) - this.xScale(d.x0) - barPadding;
            this.heightAccessorScaled = (d) => this.dimensions.height - this.yScale(d.length);
            this.sourceTypeAccessor = (d) => d.sourceType;
            this.keyAccessor = (i) => i;

            // this.xAccessorScaled = (d) => this.xScale(d.x0) + barPadding;
            // this.yAccessorScaled = (d) => this.yScale(yAccessor(d));
            // this.newYAccessor = (d) => (d > 0 ? ((this.dimensions.height / 2 - 10 * this.yAccessor(d))) : this.yAccessor(0));
            // this.widthAccessorScaled = (d) => Math.abs(this.xScale(d) - this.xScale(0)) - barPadding;
            // this.heightAccessorScaled = (d) => this.dimensions.boundedHeight - this.yScale(yAccessor(d));
            // this.keyAccessor = (i) => i;
            //         .attr("y", (d) => {
            //             if (d > 0) {
            //                 return this.dimensions.height / 2 - 10 * d;
            //             } else {
            //                 return this.dimensions.height / 2;
            //             }
        }
    }
}
