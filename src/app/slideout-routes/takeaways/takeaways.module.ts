import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TakeawaysComponent } from "@app/slideout-routes/takeaways/takeaways.component";
import { TakeawaysContainer } from "@app/slideout-routes/takeaways/takeaways.container";
import { SharedModule } from "@shared/shared.module";

const COMPONENTS: any = [TakeawaysContainer, TakeawaysComponent];
const ROUTES: Routes = [
    {
        path: "",
        outlet: "sidebar-outlet",
        component: TakeawaysContainer
    }
];
@NgModule({
    imports: [SharedModule, RouterModule.forChild(ROUTES)],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class TakeawaysModule {}
