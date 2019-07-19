import { Component, OnInit, ElementRef, Input } from "@angular/core";
import { revenueMock, revenueMock2 } from "../../../company-dashboard/financials-data";
import * as _ from "lodash";

@Component({
    selector: "sbp-multi-line-kendo",
    template: `
        <kendo-chart style="width: 670px; height: 260px;" [categoryAxis]="{ categories: timePeriods }">
            <kendo-chart-legend position="bottom" orientation="horizontal"></kendo-chart-legend>
            <kendo-chart-tooltip format="{0}"></kendo-chart-tooltip>
            <kendo-chart-series>
                <kendo-chart-series-item *ngFor="let item of data" type="line" style="normal" [data]="item.data" [name]="item.name">
                </kendo-chart-series-item>
            </kendo-chart-series>
        </kendo-chart>
    `,
    styleUrls: ["./multi-line-kendo.component.scss"]
})
export class MultiLineKendoComponent implements OnInit {
    @Input() data: any;
    public timePeriods: any;
    public actuals;
    public budget;
    public forecast;
    public actualsData;
    public budgetData;
    public forecastData;
    lineStyle;
    public seriesData: SeriesItem[];
    constructor(private elementRef: ElementRef) {
        const data = revenueMock;
        const seriesData = revenueMock2.series;
        this.data = seriesData;
        this.actuals = _.find(this.data, (v) => v.name === "actuals");
        this.budget = _.find(this.data, (v) => v.name === "budget");
        this.forecast = _.find(this.data, (v) => v.name === "forecast");
        this.actualsData = _.map(this.actuals.data, "amountInUSD");
        this.budgetData = _.map(this.budget.data, "amountInUSD");
        this.forecastData = _.map(this.forecast.data, "amountInUSD");
        const actualsDataArr = _.get(this.actuals, ["data"]);
        this.timePeriods = actualsDataArr.map((v) => {
            return `Q${v.quarter} ${v.year}`;
        });
    }

    ngOnInit() {
        this.data = [
            {
                name: "Actuals",
                data: this.actualsData
            },
            {
                name: "Budget",
                data: this.budgetData
            },
            {
                name: "Forecast",
                data: this.forecastData
            }
        ];
    }
}

export interface SeriesItem {
    name: string;
    data: number[];
}
