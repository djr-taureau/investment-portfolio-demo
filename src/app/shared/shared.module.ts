import "hammerjs";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { CommonModule } from "@angular/common";
import { CompanyNavbarModule } from "./company-navbar/company-navbar.module";
import { D3ChartsModule } from "@shared/chart-components/D3Charts.module";
import { DirectivesModule } from "./directives/directives.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
    DirectivesModule,
    MaterialModule,
    PipeModule,
    PortfolioNavbarModule,
    TeamMemberAvatarModule,
    ValuationModule,
    D3ChartsModule
];

const DECLARATIONS = [];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    declarations: DECLARATIONS
})
export class SharedModule {}
