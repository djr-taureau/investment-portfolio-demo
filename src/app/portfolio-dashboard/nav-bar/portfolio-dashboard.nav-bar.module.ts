import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from "@angular/core";
import { PortfolioDashboardNavBarComponent } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar.component";
import { PortfolioDashboardNavBarContainer } from "@app/portfolio-dashboard/nav-bar/portfolio-dashboard.nav-bar.container";
import { PipeModule } from "@shared/pipes/pipe.module";

const COMPONENTS: any = [PortfolioDashboardNavBarContainer, PortfolioDashboardNavBarComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, PipeModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioDashboardNavBarModule {}
