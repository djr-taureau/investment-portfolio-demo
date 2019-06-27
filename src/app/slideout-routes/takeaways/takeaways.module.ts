import { NgModule } from "@angular/core";
import { TakeawaysComponent } from "@app/slideout-routes/takeaways/takeaways.component";
import { TakeawaysContainer } from "@app/slideout-routes/takeaways/takeaways.container";
import { SharedModule } from "@shared/shared.module";

const COMPONENTS: any = [TakeawaysContainer, TakeawaysComponent];

@NgModule({
    imports: [SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class TakeawaysModule {}
