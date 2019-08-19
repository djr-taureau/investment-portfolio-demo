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
    @Input() revenueTableDataVsBud: number[];
    @Input() revenueTableDataVsPq: number[];

    public trackByFn = AngularUtils.trackByFn;

    constructor() {}
}
