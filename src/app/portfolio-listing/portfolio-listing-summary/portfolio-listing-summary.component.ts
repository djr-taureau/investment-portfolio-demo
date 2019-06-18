import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { LegendComponent, LegendLabels, LegendMarkers, MarkersVisualArgs } from "@progress/kendo-angular-charts";
import { Group, Text } from "@progress/kendo-drawing";
import { Point } from "@progress/kendo-drawing/dist/es/geometry";
import { CHART_ORIENTATION, CHART_POSITION } from "@shared/kendo/chart.const";

@Component({
    selector: "sbp-portfolio-listing-summary",
    templateUrl: "./portfolio-listing-summary.component.html",
    styleUrls: ["./portfolio-listing-summary.component.scss"]
})
export class PortfolioListingSummaryComponent implements OnInit {
    constructor() {}
    @Input()
    public companyCount: number;

    @Input()
    public invested: number;

    @Input()
    public totalFund: number;

    @Input()
    public valuation: number;

    @Input()
    public moic: number | string;

    @Input()
    public irr: number;

    @Input()
    public chartData: any[] = [
        { value: 8, name: "Public", color: "#124f8c" },
        { value: 3, name: "Private", color: "#47a2d6" },
        { value: 2, name: "JV", color: "#1d2759" },
        { value: 12, name: "Exited", color: "#dbe3f1" }
    ];

    /**
     * Used to set the configuration of the legend labels
     */
    public legendLabels: LegendLabels = {
        font: "normal 11px PostGrotesk"
    };

    public labels: any[] = ["Public", "Private", "JV", "Exited"];

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
            // NOTE: TODO: passing hard coded value here of 10. According to the docs, the MVA shoud
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

    public labelContent(e: any): string {
        return `${e.name}: \n ${e.value}%`;
    }
    /**
     * Initialize the component.
     */
    public ngOnInit(): void {
        // These cannot pass prod build if applied to the kendo grid directly (bug)
        this.legend.orientation = "vertical";
        this.legend.position = "custom";
    }
}
