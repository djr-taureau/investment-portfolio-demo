import { ElementRef, NgModule } from "@angular/core";
import { CompanyInitiativesSummaryComponent } from "@app/company-dashboard/company-initiatives/company-initiatives-summary.component";
import { CompanyInitiativesSummaryContainer } from "@app/company-dashboard/company-initiatives/company-initiatives-summary.container";
import { CompanySummaryModule } from "@app/company-dashboard/company-summary/company-summary.module";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { CompanyDashboardComponent } from "./company-dashboard.component";
import { CompanyDashboardContainer } from "./company-dashboard.container";
import { CompanyKpiContainer } from "./company-kpi-container/company-kpi.container";
import { CompanyKpiContainerTwo } from "./company-kpi-container-two/company-kpi.container-two";
import { CompanyKpiDetailComponent } from "./company-kpi-detail/company-kpi-detail.component";
import { CompanyRevenueDetailContainer } from "@app/company-dashboard/company-revenue-detail/company-revenue-detail.container";
import { CompanyEBITDADetailContainer } from "@app/company-dashboard/company-EBITDA-detail/company-EBITDA-detail.container";
import { CompanyCashDetailContainer } from "@app/company-dashboard/company-cash-detail/company-cash-detail.container";
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
    CompanyKpiContainerTwo,
    CompanyRevenueDetailContainer,
    PeriodSelectorComponent,
    PeriodSelectorContainer,
    CompanyKpiDetailComponent,
    CompanyEBITDADetailContainer,
    CompanyInitiativesSummaryComponent,
    CompanyInitiativesSummaryContainer,
    CompanyCashDetailContainer
];

const MODULE_ROUTES: Routes = [
    {
        path: "",
        component: CompanyDashboardContainer
    }
];

@NgModule({
    imports: [RouterModule.forChild(MODULE_ROUTES), CompanySummaryModule, PopupModule, ButtonsModule, IconizedSearchableComboModule, SharedModule],
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
    entryComponents: [CompanyKpiDetailComponent]
})
export class CompanyDashboardModule {}
