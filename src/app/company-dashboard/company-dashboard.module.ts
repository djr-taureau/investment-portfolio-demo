import { ElementRef, NgModule } from "@angular/core";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { CompanyDashboardComponent } from "./company-dashboard.component";
import { CompanyDashboardContainer } from "./company-dashboard.container";
import { CompanyKpiContainer } from "./company-kpi-container/company-kpi.container";
import { CompanyKpiDetailContainer } from "./company-kpi-detail/company-kpi-detail.container";
import { CompanyKpiDetailComponent } from "./company-kpi-detail/company-kpi-detail.component";
import { CompanyRevenueDetailContainer } from "@app/company-dashboard/company-revenue-detail/company-revenue-detail.container";
import { CompanySummaryCollapsedComponent } from "./company-summary/collapsed/company-summary-collapsed.component";
import { CompanySummaryContainer } from "./company-summary/company-summary.container";
import { CompanySummaryExpandedComponent } from "./company-summary/expanded/company-summary-expanded.component";
import { IconizedSearchableComboModule } from "@shared/iconized-searchable-combo/iconized-searchable-combo.module";
import { PeriodSelectorComponent } from "./period-selector/period-selector.component";
import { PeriodSelectorContainer } from "@app/company-dashboard/period-selector/period-selector.container";
import { PopupModule, POPUP_CONTAINER } from "@progress/kendo-angular-popup";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "@shared/shared.module";

const COMPONENTS: any = [
    CompanyDashboardComponent,
    CompanyDashboardContainer,
    CompanyKpiContainer,
    CompanyRevenueDetailContainer,
    CompanySummaryCollapsedComponent,
    CompanySummaryContainer,
    CompanySummaryExpandedComponent,
    PeriodSelectorComponent,
    PeriodSelectorContainer,
    CompanyKpiDetailContainer,
    CompanyKpiDetailComponent
];

const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyDashboardContainer
    }
];

@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES), PopupModule, ButtonsModule, IconizedSearchableComboModule, SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [
        {
            provide: POPUP_CONTAINER,
            useFactory: () => {
                return { nativeElement: document.body } as ElementRef;
            }
        }
    ],
    entryComponents: [CompanyKpiDetailComponent, CompanyKpiDetailContainer]
})
export class CompanyDashboardModule {}
