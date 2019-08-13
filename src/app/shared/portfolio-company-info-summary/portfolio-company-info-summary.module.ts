import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { ComparisonBarModule } from "@shared/comparison-bar/comparison-bar.module";
import { PortfolioCompanyInfoSummaryComponent } from "@shared/portfolio-company-info-summary/portfolio-company-info-summary.component";
import { NavigationBarModule } from "../navigation-bar/navigation-bar.module";

const COMPONENTS: any = [PortfolioCompanyInfoSummaryComponent];

@NgModule({
    imports: [ChartsModule, FlexLayoutModule, ComparisonBarModule, CommonModule, NavigationBarModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioCompanyInfoSummaryModule {}
