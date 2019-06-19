import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ValuationModule } from "@shared/valuation/valuation.module";
import { CompanyNavbarModule } from "./company-navbar/company-navbar.module";
import { FooterModule } from "./footer/footer.module";
import { HeaderModule } from "./header/header.module";
import { MaterialModule } from "./material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { PortfolioNavbarModule } from "./portfolio-navbar/portfolio-navbar.module";
import { SlideoutModule } from "./slideout/slideout.module";
import { ChartsModule } from "@progress/kendo-angular-charts";
import { DirectivesModule } from "./directives/directives.module";
import { PipeModule } from "./pipes/pipe.module";
import "hammerjs";

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
    FooterModule,
    HeaderModule,
    MaterialModule,
    PipeModule,
    PortfolioNavbarModule,
    SlideoutModule,
    ValuationModule
];

const DECLARATIONS = [];

@NgModule({
    imports: MODULES,
    exports: MODULES,
    declarations: DECLARATIONS
})
export class SharedModule {}
