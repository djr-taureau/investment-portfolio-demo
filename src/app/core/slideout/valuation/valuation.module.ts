import { NgModule } from "@angular/core";
import { ValuationContainer } from "./valuation.container";
import { ValuationComponent } from "./valuation.component";
import { SharedModule } from "@app/shared/shared.module";
import { SlideoutInfrastructureModule } from "../slideout-infrastructure.module";

const MODULES = [SharedModule, SlideoutInfrastructureModule];
const COMPONENTS: any = [ValuationContainer, ValuationComponent];

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class ValuationModule {}
