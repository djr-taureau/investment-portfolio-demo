import { NgModule } from "@angular/core";
import { SharedModule } from "@progress/kendo-angular-dropdowns";
import { SummaryWidgetContainer } from "./summary-widget.container";
import { SummaryWidgetComponent } from "./summary-widget.component";

const MODULES = [SharedModule];
const COMPONENTS: any = [SummaryWidgetContainer, SummaryWidgetComponent];

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class SummaryWidgetModule {}
