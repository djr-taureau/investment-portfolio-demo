import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from "@angular/core";

import { MaterialModule } from "../material/material.module";
import { ChartModule } from "@progress/kendo-angular-charts";
import { ChartComponent } from "./chart/chart.component";
import { AxisComponent } from "./chart/axis/axis.component";
import { LineComponent } from "./chart/line/line.component";
import { CirclesComponent } from "./chart/circles/circles.component";
import { BarsComponent } from "./chart/bars/bars.component";
import { GradientComponent } from "./chart/gradient/gradient.component";
import { MicroTimelineComponent } from "./micro-timeline/micro-timeline.component";
import { MicroHistogramComponent } from "./micro-histogram/micro-histogram.component";
import { KpiSummaryComponent } from "./kpi-summary/kpi-summary.component";

export const COMPONENTS = [
    AxisComponent,
    BarsComponent,
    ChartComponent,
    CirclesComponent,
    GradientComponent,
    KpiSummaryComponent,
    LineComponent,
    MicroHistogramComponent,
    MicroTimelineComponent
];
@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FlexLayoutModule, MaterialModule, ChartModule],
    exports: COMPONENTS
})
export class D3ChartsModule {}
