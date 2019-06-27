import { NgModule } from "@angular/core";
import { SlideoutInfrastructureModule } from "@core/slideout/slideout-infrastructure.module";
import { TakeawaysComponent } from "@core/slideout/takeaways/takeaways.component";
import { TakeawaysContainer } from "@core/slideout/takeaways/takeaways.container";
import { SharedModule } from "@shared/shared.module";

const MODULES = [SharedModule, SlideoutInfrastructureModule];
const COMPONENTS: any = [TakeawaysContainer, TakeawaysComponent];

@NgModule({
    imports: MODULES,
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class TakeawaysModule {}
