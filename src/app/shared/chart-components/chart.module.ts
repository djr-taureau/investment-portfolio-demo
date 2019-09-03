import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from "@angular/core";
import { SummaryWidgetContainer } from "@shared/chart-components/summary-widget/summary-widget.container";
import { PipeModule } from "@shared/pipes/pipe.module";
import { MaterialModule } from "../material/material.module";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { ChartComponent } from "./chart/chart.component";
import { AxisComponent } from "./chart/axis/axis.component";
import { AxisBarComponent } from "./chart/axis-bar/axis-bar.component";
import { LineComponent } from "./chart/line/line.component";
import { CirclesComponent } from "./chart/circles/circles.component";
import { BarsComponent } from "./chart/bars/bars.component";
import { GradientComponent } from "./chart/gradient/gradient.component";
import { SummaryWidgetComponent } from "./summary-widget/summary-widget.component";
import { MicroBarComponent } from "./micro-bar/micro-bar.component";
import { MicroLineComponent } from "./micro-line/micro-line.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { MultiLineKendoComponent } from "./multi-line-kendo/multi-line-kendo.component";
import { MultiLineComponent } from "./multi-line/multi-line.component";
import { HistogramComponent } from "./histogram/histogram.component";
import { DetailBarChartComponent } from "./detail-bar-chart/_detail-bar-chart.component";
import { KpiDetailTableComponent } from "./kpi-detail-table/kpi-detail-table.component";
import { BarChartComponent } from "./detail-bar-chart/bar-chart.component";

export const COMPONENTS = [
    AxisComponent,
    AxisBarComponent,
    BarChartComponent,
    BarsComponent,
    ChartComponent,
    CirclesComponent,
    DetailBarChartComponent,
    GradientComponent,
    HistogramComponent,
    KpiDetailTableComponent,
    LineComponent,
    MicroBarComponent,
    MicroLineComponent,
    MultiLineKendoComponent,
    MultiLineComponent,
    SummaryWidgetComponent,
    SummaryWidgetContainer,
    TimelineComponent
];
@NgModule({
    declarations: COMPONENTS,
    imports: [CommonModule, FlexLayoutModule, MaterialModule, PipeModule, ButtonsModule, ChartsModule],
    exports: COMPONENTS
})
export class ChartModule {}
