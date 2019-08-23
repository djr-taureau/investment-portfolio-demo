import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { ComparisonBarModule } from "@shared/comparison-bar/comparison-bar.module";
import { PipeModule } from "@shared/pipes/pipe.module";
import { PortfolioCompanyInfoSummaryComponent } from "@shared/portfolio-company-info-summary/portfolio-company-info-summary.component";
import { PortfolioCompanySummaryInfoContainer } from "@shared/portfolio-company-info-summary/portfolio-company-summary-info.container";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";

const COMPONENTS: any = [PortfolioCompanyInfoSummaryComponent, PortfolioCompanySummaryInfoContainer];

@NgModule({
    imports: [ChartsModule, FlexLayoutModule, ComparisonBarModule, CommonModule, NavigationBarModule, PipeModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioCompanyInfoSummaryModule {}
