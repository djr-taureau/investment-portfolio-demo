import "hammerjs";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { CommonModule } from "@angular/common";
import { ComparisonBarModule } from "@shared/comparison-bar/comparison-bar.module";
import { CompanyNavbarModule } from "./company-navbar/company-navbar.module";
import { ChartModule } from "@shared/chart-components/chart.module";
import { DirectivesModule } from "./directives/directives.module";
import { ExpandablePanelModule } from "@shared/expandable-panel/expandable-panel.module";
import { FilterablePanelModule } from "@shared/filterable-panel/filterable-panel.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IconizedSearchableComboModule } from "@shared/iconized-searchable-combo/iconized-searchable-combo.module";
import { MaterialModule } from "./material/material.module";
import { NgModule } from "@angular/core";
import { PipeModule } from "./pipes/pipe.module";
import { PortfolioNavbarModule } from "./portfolio-navbar/portfolio-navbar.module";
import { TeamMemberAvatarModule } from "@shared/team-member/avatar/team-member-avatar.module";
import { ValuationModule } from "@shared/valuation/valuation.module";

const MODULES = [
    // Angular Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // 3rd Party Modules
    FlexLayoutModule,
    ChartsModule,

    // Application Shared Feature Modules
    CompanyNavbarModule,
    ComparisonBarModule,
    DirectivesModule,
    ExpandablePanelModule,
    IconizedSearchableComboModule,
    FilterablePanelModule,
    MaterialModule,
    PipeModule,
    DirectivesModule,
    PortfolioNavbarModule,
    TeamMemberAvatarModule,
    ValuationModule,
    ChartModule
];

const DECLARATIONS = [];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    declarations: DECLARATIONS
})
export class SharedModule {}
