import { NgModule } from "@angular/core";
import { CompanyCashRunwayWidgetComponent } from "@app/company-dashboard/company-summary-top-widgets/cash/company-cash-runway-widget.component";
import { CompanyCashWidgetComponent } from "@app/company-dashboard/company-summary-top-widgets/cash/company-cash-widget.component";
import { SharedModule } from "@shared/shared.module";

const COMPONENTS: any = [CompanyCashWidgetComponent, CompanyCashRunwayWidgetComponent];

@NgModule({
    imports: [SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: []
})
export class CompanyCashModule {}
