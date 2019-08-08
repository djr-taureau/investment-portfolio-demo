import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from "@angular/core";
import { PortfolioDashboardActionBarComponent } from "@app/portfolio-dashboard/action-bar/portfolio-dashboard.action-bar.component";
import { PortfolioDashboardActionBarContainer } from "@app/portfolio-dashboard/action-bar/portfolio-dashboard.action-bar.container";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { IconizedSearchableComboModule } from "@shared/iconized-searchable-combo/iconized-searchable-combo.module";
import { PipeModule } from "@shared/pipes/pipe.module";

const COMPONENTS: any = [PortfolioDashboardActionBarContainer, PortfolioDashboardActionBarComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, PipeModule, ButtonsModule, IconizedSearchableComboModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioDashboardActionBarModule {}
