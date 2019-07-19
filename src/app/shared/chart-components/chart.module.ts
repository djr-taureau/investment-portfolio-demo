import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from "@angular/core";
import { MaterialModule } from "../material/material.module";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { ChartComponent } from "./chart/chart.component";
import { AxisComponent } from "./chart/axis/axis.component";
import { AxisBarComponent } from "./chart/axis-bar/axis-bar.component";
import { LineComponent } from "./chart/line/line.component";
import { CirclesComponent } from "./chart/circles/circles.component";
import { BarsComponent } from "./chart/bars/bars.component";
import { GradientComponent } from "./chart/gradient/gradient.component";
import { MicroTimelineComponent } from "./micro-timeline/micro-timeline.component";
import { MicroHistogramComponent } from "./micro-histogram/micro-histogram.component";
import { KpiSummaryComponent } from "./kpi-summary/kpi-summary.component";
import { MicroBarComponent } from "./micro-bar/micro-bar.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { MultiLineKendoComponent } from "./multi-line-kendo/multi-line-kendo.component";
import { MultiLineComponent } from "./multi-line/multi-line.component";
import { DetailBarChartComponent } from "./detail-bar-chart/detail-bar-chart.component";
import { KpiDetailTableComponent } from "./kpi-detail-table/kpi-detail-table.component";

export const COMPONENTS = [
    AxisComponent,
    AxisBarComponent,
    LineComponent,
    CirclesComponent,
    BarsComponent,
    ChartComponent,
    CirclesComponent,
    GradientComponent,
    KpiSummaryComponent,
    LineComponent,
    MicroHistogramComponent,
    MicroBarComponent,
    KpiSummaryComponent,
    KpiSummaryComponent,
    MicroBarComponent,
    MicroTimelineComponent,
    TimelineComponent,
    MultiLineKendoComponent,
    MultiLineComponent,
    DetailBarChartComponent,
    KpiDetailTableComponent
];
@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FlexLayoutModule, MaterialModule, ChartsModule],
    exports: COMPONENTS
})
export class ChartModule {}
