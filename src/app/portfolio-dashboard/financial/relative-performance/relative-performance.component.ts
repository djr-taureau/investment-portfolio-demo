import { Component, Input } from "@angular/core";
import { PortfolioRelativePerformanceSeries } from "@core/domain/portfolio.model";

@Component({
    selector: "sbp-relative-performance",
    templateUrl: "./relative-performance.component.html",
    styleUrls: ["./relative-performance.component.scss"]
})
export class RelativePerformanceComponent {
    @Input()
    public chartData: PortfolioRelativePerformanceSeries[];
}
