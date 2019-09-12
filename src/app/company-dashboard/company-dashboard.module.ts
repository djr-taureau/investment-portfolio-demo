import { CompanyCashModule } from "@app/company-dashboard/company-summary-top-widgets/cash/company-cash.module";
import { CompanyDetailWidgetComponent } from "./company-detail-widget/company-detail-widget.component";
import { ElementRef, NgModule } from "@angular/core";
import { CompanyInitiativesSummaryComponent } from "@app/company-dashboard/company-initiatives/company-initiatives-summary.component";
import { CompanyInitiativesSummaryContainer } from "@app/company-dashboard/company-initiatives/company-initiatives-summary.container";
import { CompanySummaryKpiWidgetsContainer } from "@app/company-dashboard/company-summary-kpi-widgets/company-summary-kpi-widgets.container";
import { CompanySummaryModule } from "@app/company-dashboard/company-summary/company-summary.module";
import { ButtonsModule } from "@progress/kendo-angular-buttons";
import { CompanyDashboardComponent } from "./company-dashboard.component";
import { CompanyDashboardContainer } from "./company-dashboard.container";
import { CompanySummaryTopWidgetsContainer } from "./company-summary-top-widgets/company-summary-top-widgets.container";
import { CompanyDetailWidgetContainer } from "@app/company-dashboard/company-detail-widget/company-detail-widget.container";
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
    CompanySummaryTopWidgetsContainer,
    CompanySummaryKpiWidgetsContainer,
    CompanyDetailWidgetContainer,
    PeriodSelectorComponent,
    PeriodSelectorContainer,
    CompanyDetailWidgetComponent,
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
    imports: [
        RouterModule.forChild(MODULE_ROUTES),
        CompanySummaryModule,
        PopupModule,
        ButtonsModule,
        IconizedSearchableComboModule,
        SharedModule,
        CompanyCashModule
    ],
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
    entryComponents: [CompanyDetailWidgetComponent]
})
export class CompanyDashboardModule {}
