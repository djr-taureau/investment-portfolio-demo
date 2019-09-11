import { MatTableDataSource } from "@angular/material";
import { Component, Input } from "@angular/core";
import { Logger } from "@util/logger";
import * as AngularUtils from "@util//angular.util";

@Component({
    selector: "sbp-kpi-detail-table",
    styleUrls: ["./kpi-detail-table.component.scss"],
    templateUrl: "./kpi-detail-table.component.html"
})
export class KpiDetailTableComponent {
    private static logger: Logger = Logger.getLogger("KpiDetailTableComponent");
    @Input() data: any;
    @Input() tableDataHeaders: string[];
    @Input() tableDataAsOf: any[];

    @Input()
    set tableDataVsPy(data: any[]) {
        if (data && data.length > 0) {
            this.vsPyData = data;
            this.vsPyDataShow = true;
        } else {
            this.vsPyDataShow = false;
        }
    }
    get tableDataVsPy() {
        return this.vsPyData;
    }
    private vsPyData;
    public vsPyDataShow = false;

    @Input()
    set tableDataVsPq(data: any[]) {
        if (data && data.length > 0) {
            this.vsPqData = data;
            this.vsPqDataShow = true;
        } else {
            this.vsPqDataShow = false;
        }
    }
    get tableDataVsPq() {
        return this.vsPqData;
    }
    private vsPqData;
    public vsPqDataShow = false;

    @Input()
    set tableDataVsBud(data: any[]) {
        if (data && data.length > 0) {
            this.vsBudData = data;
            this.vsBudDataShow = true;
        } else {
            this.vsBudDataShow = false;
        }
    }
    get tableDataVsBud() {
        return this.vsBudData;
    }
    private vsBudData;
    public vsBudDataShow = false;

    @Input()
    set tableDataVsForecast(data: any[]) {
        if (data && data.length > 0) {
            this.vsForecastData = data;
            this.vsForecastDataShow = true;
        } else {
            this.vsForecastDataShow = false;
        }
    }
    get tableDataVsForecast() {
        return this.vsForecastData;
    }
    private vsForecastData;
    public vsForecastDataShow = false;

    @Input()
    set tableDataVsIcInitial(data: any[]) {
        if (data && data.length > 0) {
            this.vsIcInitialData = data;
            this.vsIcInitialDataShow = true;
        } else {
            this.vsIcInitialDataShow = false;
        }
    }
    get tableDataVsIcInitial() {
        return this.vsIcInitialData;
    }
    private vsIcInitialData;
    public vsIcInitialDataShow = false;

    @Input()
    set tableDataVsIcLatest(data: any[]) {
        if (data && data.length > 0) {
            this.vsIcLatestData = data;
            this.vsIcLatestDataShow = true;
        } else {
            this.vsIcLatestDataShow = false;
        }
    }
    get tableDataVsIcLatest() {
        return this.vsIcLatestData;
    }
    private vsIcLatestData;
    public vsIcLatestDataShow = false;

    public trackByFn = AngularUtils.trackByFn;

    constructor() {}
}
