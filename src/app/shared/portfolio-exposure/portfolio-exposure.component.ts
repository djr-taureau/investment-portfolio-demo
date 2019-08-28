import { Component, Input } from "@angular/core";
import { PortfolioExposure } from "@core/domain/portfolio.model";

@Component({
    selector: "sbp-portfolio-exposure",
    templateUrl: "./portfolio-exposure.component.html",
    styleUrls: ["./portfolio-exposure.component.scss"]
})
export class PortfolioExposureComponent {
    @Input()
    public exposures: PortfolioExposure[];

    @Input()
    public exposureType: string;

    @Input()
    public basedOn: string;

    @Input()
    public currSymbol: string;

    @Input()
    public scale: string;

    public trackByFn = (index: number, item: any): number | string => {
        return item && item.id ? item.id : index;
    }

    constructor() {}
}
