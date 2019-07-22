import {
    Component,
    Input,
    Output,
    ViewChild,
    ElementRef,
    OnInit,
    AfterContentInit,
    OnChanges,
    SimpleChanges,
    HostListener,
    EventEmitter,
    ViewChildren,
    AfterViewInit
} from "@angular/core";
import * as d3 from "d3";
import { combineLatest } from "rxjs";
import { getUniqueId } from "../chart/utils";
import { DimensionsType, ScaleType } from "../interfaces/types";
import { Logger } from "@util/logger";
import { TimelineDataPointFin } from "@shared/chart-components/interfaces/types";
import { revenue, ebitda, cashburn, revenueArr, revenueMock, revenueMock2 } from "../../../company-dashboard/financials-data";
import * as _ from "lodash";
@Component({
    selector: "sbp-timeline",
    templateUrl: "./timeline.component.html",
    styleUrls: ["./timeline.component.scss"]
})
export class TimelineComponent implements OnInit, AfterContentInit, OnChanges {
    private static logger: Logger = Logger.getLogger("TimelineComponent");

    @Input() data: any[];
    @Input() label: string;
    @Input() newData: any;
    @Input() xAccessor?: any;
    @Input() yAccessor?: any;
    @Input() keyAccessor?: any;
    @Input() projectedAccessor?: any;
    @Input() valueAccessor?: any;
    @Input() yLabelVisible?: boolean;

    @ViewChild("container") container: ElementRef;

    public timePeriods: any[];
    public actualsObj;
    public budgetObj;
    public forecastObj;
    public actuals;
    public budget;
    public forecast;
    public seriesData: SeriesItem[];
    public actualsVis: boolean;
    public forecastVis: boolean;
    public budgetVis: boolean;

    historicalData: TimelineDataPointFin[];
    projectedData: TimelineDataPointFin[];
    dimensions: DimensionsType;
    xScale: ScaleType;
    yScale: ScaleType;
    budgetScale: ScaleType;
    forecastScale: ScaleType;

    timePeriodAccessor;
    xAccessorScaled: any;
    yAccessorScaled: any;
    budgetAccessorScaled: any;
    forecastAccessorScaled: any;
    y0AccessorScaled: any;
    y0BudgetAccessorScaled: any;
    y0ForecastAccessorScaled: any;

    formatDate = d3.timeFormat("%m/%d/%Y");
    gradientId: string = getUniqueId("Timeline-gradient");
    gradientColors: string[] = ["rgb(226, 222, 243)", "#f8f9fa"];

    constructor() {
        TimelineComponent.logger.debug(`constructor()`);
        this.dimensions = {
            marginTop: 40,
            marginRight: 30,
            marginBottom: 75,
            marginLeft: 75,
            height: 300,
            width: 600
        };
        this.dimensions = {
            ...this.dimensions,
            boundedHeight: Math.max(this.dimensions.height - this.dimensions.marginTop - this.dimensions.marginBottom, 0),
            boundedWidth: Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0)
        };
    }

    updateDimensions() {
        const width = this.container.nativeElement.offsetWidth;
        this.dimensions.width = this.container.nativeElement.offsetWidth;
        this.dimensions.boundedWidth = Math.max(this.dimensions.width - this.dimensions.marginLeft - this.dimensions.marginRight, 0);
        this.updateScales();
    }

    ngOnInit() {
        TimelineComponent.logger.debug(`ngOnInit()`);

        this.actualsVis = true;
        this.budgetVis = true;
        this.forecastVis = true;
        this.data = revenueMock;
        this.actualsObj = _.find(this.data, (v) => v.id === "actuals");
        this.budgetObj = _.find(this.data, (v) => v.id === "budget");
        this.forecastObj = _.find(this.data, (v) => v.id === "forecast");
        this.actuals = _.get(this.actualsObj, ["values"]);
        this.budget = _.get(this.budgetObj, ["values"]);
        this.forecast = _.get(this.forecastObj, ["values"]);
        this.actuals.map((v) => {
            console.log(this.xAccessor(v));
            console.log(this.yAccessor(v));
        });
        if (this.projectedAccessor) {
            this.historicalData = this.data.filter((v) => v.projected === false);
            this.projectedData = this.data.filter((v) => v.projected === true);
        }
    }

    ngAfterContentInit() {
        this.updateDimensions();
    }

    @HostListener("window:resize", ["$event"])
    onResize() {
        this.updateDimensions();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.updateScales();
        console.log(changes);
    }

    updateScales() {
        this.xScale = d3
            .scaleTime()
            .domain(d3.extent(this.actuals, this.xAccessor) as [Date, Date])
            .range([0, this.dimensions.boundedWidth]);

        this.yScale = d3
            .scaleLinear()
            .domain(d3.extent(this.actuals, this.yAccessor) as [number, number])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.budgetScale = d3
            .scaleLinear()
            .domain(d3.extent(this.budget, this.yAccessor) as [number, number])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.forecastScale = d3
            .scaleLinear()
            .domain(d3.extent(this.forecast, this.yAccessor) as [number, number])
            .range([this.dimensions.boundedHeight, 0])
            .nice();
        this.xAccessorScaled = (d) => this.xScale(this.xAccessor(d));
        this.yAccessorScaled = (d) => this.yScale(this.yAccessor(d));
        this.budgetAccessorScaled = (d) => this.budgetScale(this.yAccessor(d));
        this.forecastAccessorScaled = (d) => this.forecastScale(this.yAccessor(d));
        this.y0AccessorScaled = this.yScale(this.yScale.domain()[0]);
        this.y0BudgetAccessorScaled = this.budgetScale(this.budgetScale.domain()[0]);
        this.y0ForecastAccessorScaled = this.forecastScale(this.budgetScale.domain()[0]);
    }

    toggleVisibilty(event) {
        switch (event) {
            case "actuals":
                this.actualsVis = !this.actualsVis;
                break;
            case "budget":
                this.budgetVis = !this.budgetVis;
                break;
            case "forecast":
                this.forecastVis = !this.forecastVis;
        }
    }
}

export interface SeriesItem {
    name: string;
    data: number[];
}
