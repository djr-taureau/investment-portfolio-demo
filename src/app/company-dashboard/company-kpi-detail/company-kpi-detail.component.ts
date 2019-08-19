import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { RevenueSeriesData } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";
import "zone.js";

@Component({
    selector: "sbp-company-kpi-detail-component",
    templateUrl: "./company-kpi-detail.component.html",
    styleUrls: ["./company-kpi-detail.component.scss"]
})
export class CompanyKpiDetailComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyKpiDetailComponent");

    parseDate = d3.timeParse("%m/%d/%Y");
    dateAccessor: any;
    categoryAccessor: any;
    yAccessor: any;
    budgetAccessor: any;
    forecastAccessor: any;
    dateSelected;
    selectedValue;
    timePeriods;
    actualsPresentValue;
    historicalData;
    projectedData;

    /**
     * Constructor.
     * @param store$
     * @param route$
     */

    @Input()
    public set data(value: any[]) {
        if (value) {
            // this._data = value;
            this._apiData = value;
            // this.update();
        }
    }
    public get data(): any[] {
        return this._apiData;
    }
    private _data: any[];
    private _apiData: RevenueSeriesData[];

    @Input() title: string;
    @Input() actuals: RevenueSeriesData[];
    @Input() budget: RevenueSeriesData[];
    @Input() forecast: RevenueSeriesData[];

    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        CompanyKpiDetailComponent.logger.debug(`constructor()`);
    }
    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyKpiDetailComponent.logger.debug(`ngOnInit()`);
        this.dateAccessor = (v) => this.parseDate(v.date);
        this.categoryAccessor = (v) => `${v.financialQuarter}Q${v.date.substr(2, 2)}`;
        this.yAccessor = (v) => v.amountInNative; // ?? : Do we need to have this toggle
    }
}
