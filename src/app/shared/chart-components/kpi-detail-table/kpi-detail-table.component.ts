import { Component, Input } from "@angular/core";
import { Logger } from "@util/logger";
@Component({
    selector: "sbp-kpi-detail-table",
    styleUrls: ["./kpi-detail-table.component.scss"],
    templateUrl: "./kpi-detail-table.component.html"
})
export class KpiDetailTableComponent {
    private static logger: Logger = Logger.getLogger("KpiDetailTableComponent");
    @Input() data: any;

    constructor() {}
}
