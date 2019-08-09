import { NgModule } from "@angular/core";
import { CompanySummaryCollapsedComponent } from "@app/company-dashboard/company-summary/collapsed/company-summary-collapsed.component";
import { CompanySummaryContainer } from "@app/company-dashboard/company-summary/company-summary.container";
import { CompanySummaryExpandedComponent } from "@app/company-dashboard/company-summary/expanded/company-summary-expanded.component";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { IconizedSearchableComboModule } from "@shared/iconized-searchable-combo/iconized-searchable-combo.module";
import { SharedModule } from "@shared/shared.module";

const COMPONENTS: any = [CompanySummaryCollapsedComponent, CompanySummaryContainer, CompanySummaryExpandedComponent];

@NgModule({
    imports: [ButtonsModule, IconizedSearchableComboModule, SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: []
})
export class CompanySummaryModule {}
