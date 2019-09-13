import { DirectivesModule } from "@shared/directives/directives.module";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { ComparisonBarModule } from "@shared/comparison-bar/comparison-bar.module";
import { PipeModule } from "@shared/pipes/pipe.module";
import { PortfolioExposureComponent } from "@shared/portfolio-exposure/portfolio-exposure.component";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";

const COMPONENTS: any = [PortfolioExposureComponent];

@NgModule({
    imports: [FlexLayoutModule, CommonModule, PipeModule, DirectivesModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioExposureModule {}
