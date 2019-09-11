import { Component, Input, EventEmitter, Output } from "@angular/core";
import { PortfolioRelativePerformanceSeries } from "@core/domain/portfolio.model";

@Component({
    selector: "sbp-relative-performance",
    templateUrl: "./relative-performance.component.html",
    styleUrls: ["./relative-performance.component.scss"]
})
export class RelativePerformanceComponent {
    @Input()
    public chartData: PortfolioRelativePerformanceSeries[];

    @Output()
    public openCompanyDashboard: EventEmitter<string> = new EventEmitter<string>();

    public onOpenCompanyDashboard(companyId: string) {
        this.openCompanyDashboard.emit(companyId);
    }
}
