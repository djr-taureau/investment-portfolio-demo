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
    @Input() revenueTableDataHeaders: string[];
    @Input() revenueTableDataAsOf: number[];

    @Input()
    set revenueTableDataVsPy(data: number[]) {
        if (data && data.length > 0) {
            this.vsPyData = data;
            this.vsPyDataShow = true;
        } else {
            this.vsPyDataShow = false;
        }
    }
    get revenueTableDataVsPy() {
        return this.vsPyData;
    }
    private vsPyData;
    public vsPyDataShow = false;

    @Input()
    set revenueTableDataVsPq(data: number[]) {
        if (data && data.length > 0) {
            this.vsPqData = data;
            this.vsPqDataShow = true;
        } else {
            this.vsPqDataShow = false;
        }
    }
    get revenueTableDataVsPq() {
        return this.vsPqData;
    }
    private vsPqData;
    public vsPqDataShow = false;

    @Input()
    set revenueTableDataVsBud(data: number[]) {
        if (data && data.length > 0) {
            this.vsBudData = data;
            this.vsBudDataShow = true;
        } else {
            this.vsBudDataShow = false;
        }
    }
    get revenueTableDataVsBud() {
        return this.vsBudData;
    }
    private vsBudData;
    public vsBudDataShow = false;

    @Input()
    set revenueTableDataVsForecast(data: number[]) {
        if (data && data.length > 0) {
            this.vsForecastData = data;
            this.vsForecastDataShow = true;
        } else {
            this.vsForecastDataShow = false;
        }
    }
    get revenueTableDataVsForecast() {
        return this.vsForecastData;
    }
    private vsForecastData;
    public vsForecastDataShow = false;

    @Input()
    set revenueTableDataVsIcInitial(data: number[]) {
        if (data && data.length > 0) {
            this.vsIcInitialData = data;
            this.vsIcInitialDataShow = true;
        } else {
            this.vsIcInitialDataShow = false;
        }
    }
    get revenueTableDataVsIcInitial() {
        return this.vsIcInitialData;
    }
    private vsIcInitialData;
    public vsIcInitialDataShow = false;

    @Input()
    set revenueTableDataVsIcLatest(data: number[]) {
        if (data && data.length > 0) {
            this.vsIcLatestData = data;
            this.vsIcLatestDataShow = true;
        } else {
            this.vsIcLatestDataShow = false;
        }
    }
    get revenueTableDataVsIcLatest() {
        return this.vsIcLatestData;
    }
    private vsIcLatestData;
    public vsIcLatestDataShow = false;

    public trackByFn = AngularUtils.trackByFn;

    constructor() {}
}
