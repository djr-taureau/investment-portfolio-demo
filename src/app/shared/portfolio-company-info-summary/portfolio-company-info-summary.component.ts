import * as _ from "lodash";
import { Company } from "@core/domain/company.model";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Group, Text } from "@progress/kendo-drawing";
import { LegendComponent, LegendLabels, LegendMarkers, MarkersVisualArgs } from "@progress/kendo-angular-charts";
import { Point } from "@progress/kendo-drawing/dist/es/geometry";

@Component({
    selector: "sbp-portfolio-company-info-summary",
    templateUrl: "./portfolio-company-info-summary.component.html",
    styleUrls: ["./portfolio-company-info-summary.component.scss"]
})
export class PortfolioCompanyInfoSummaryComponent implements OnInit {
    constructor() {}

    @Input()
    public chartData: any[];

    @Input()
    public companyCount: number;

    @Input()
    public invested: number;

    @Input()
    public totalFund: number;

    @Input()
    public totalApproved: number;

    @Input()
    public valuation: number;

    @Input()
    public moic: number | string;

    @Input()
    public irr: number;

    /**
     * Used to set the configuration of the legend labels
     */
    public legendLabels: LegendLabels = {
        font: "normal 11px PostGrotesk"
    };

    // public labels: any[] = ["Public", "Private", "JV", "Exited"];

    @ViewChild("legend")
    public legend: LegendComponent;

    /**
     * Sets the markers config. In this instance, only using the visual function
     * to add the count
     */
    public legendMarkers: LegendMarkers = {
        /**
         * Adds additional visuals to the marker
         * Haven't found a way to replace the marker
         * https://www.telerik.com/kendo-angular-ui/components/drawing/api/Text/
         * https://www.telerik.com/kendo-angular-ui/components/charts/api/LegendMarkers/
         */
        visual: (e: MarkersVisualArgs) => {
            const defaultLabel = e.createVisual();
            // NOTE: TODO: passing hard coded value here of 10. According to the docs, the MVA should
            // be returning the series as well as the dataItem for the marker which it isn't
            // currently doing. We need support from Kendo on how to proceed, otherwise, maybe
            // we just roll out own legend, although, that will cause us to lose the inter-activity
            //  of the chart
            const text: Text = new Text("10", new Point(60, 0), { font: "normal 11px PostGrotesk" });
            const group = new Group();
            group.append(defaultLabel, text);
            return group;
        }
    };

    public showCompanyTypeChart() {
        return this.companyCount > 0;
    }

    public labelContent(e: any): string {
        return `${e.name}: \n ${e.value}%`;
    }

    public getInvestedPerc(): number {
        return (this.invested / this.totalFund) * 100;
    }

    public getApprovedPerc(): number {
        return (this.totalApproved / this.totalFund) * 100;
    }

    public getTotalPerc(): number {
        return 100;
    }

    public getChartData(idx: number) {
        return _.get(this, `chartData[${idx}.value`, 0);
    }

    /**
     * Initialize the component.
     */
    public ngOnInit(): void {}
}
