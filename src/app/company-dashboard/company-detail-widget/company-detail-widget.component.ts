import * as ObjectUtil from "@util/object.util";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { RevenueSeriesData, ChartDataPeriod, DetailViewTableRow } from "@core/domain/company.model";
import { Logger } from "@util/logger";
import * as d3 from "d3";

@Component({
    selector: "sbp-company-detail-widget-component",
    templateUrl: "./company-detail-widget.component.html",
    styleUrls: ["./company-detail-widget.component.scss"]
})
export class CompanyDetailWidgetComponent implements OnInit {
    /**
     * Internal logger.
     */
    private static logger: Logger = Logger.getLogger("CompanyDetailWidgetComponent");

    parseDate = d3.timeParse("%m/%d/%Y");
    dateAccessor: any;
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
        }
    }
    public get data(): any[] {
        return this._apiData;
    }
    private _data: any[];
    private _apiData: RevenueSeriesData[];

    @Input() selectedPeriod: any;
    @Input() title: string;
    @Input() allLineChartData: ChartDataPeriod[];
    @Input() tableDataHeaders: string[];
    @Input()
    set allTableData(data: DetailViewTableRow[]) {
        if (data && data.length > 0) {
            this.tableDataAsOf = this.getScenarioData(data, "actual");
            this.tableDataVsPy = this.getScenarioData(data, "vsPY");
            this.tableDataVsPq = this.getScenarioData(data, "vsPQ");
            this.tableDataVsBud = this.getScenarioData(data, "managementBudget");
            this.tableDataVsForecast = this.getScenarioData(data, "managementForecast");
            this.tableDataVsIcInitial = this.getScenarioData(data, "icInitial");
            this.tableDataVsIcLatest = this.getScenarioData(data, "icLatest");
        }
    }
    public tableDataAsOf: number[];
    public tableDataVsPy: number[];
    public tableDataVsPq: number[];
    public tableDataVsBud: number[];
    public tableDataVsForecast: number[];
    public tableDataVsIcInitial: number[];
    public tableDataVsIcLatest: number[];

    private getScenarioData(data: DetailViewTableRow[], scenarioName: string): [] {
        const actualIndex: number = data.findIndex((item) => item.scenario === scenarioName);
        return ObjectUtil.getNestedPropIfExists(data, [String(actualIndex), "data"], []);
    }

    constructor(public store$: Store<any>, public route$: ActivatedRoute) {
        CompanyDetailWidgetComponent.logger.debug(`constructor()`);
    }
    /**
     * Initialize the component.
     */
    public ngOnInit() {
        CompanyDetailWidgetComponent.logger.debug(`ngOnInit()`);
    }
}
