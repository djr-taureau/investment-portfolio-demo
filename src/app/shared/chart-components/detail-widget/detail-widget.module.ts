import { NgModule } from "@angular/core";
import { SharedModule } from "@progress/kendo-angular-dropdowns";
import { DetailWidgetContainer } from "./detail-widget.container";
import { DetailWidgetComponent } from "./detail-widget.component";

const MODULES = [SharedModule];
const COMPONENTS: any = [DetailWidgetContainer, DetailWidgetComponent];

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class DetailWidgetModule {}
