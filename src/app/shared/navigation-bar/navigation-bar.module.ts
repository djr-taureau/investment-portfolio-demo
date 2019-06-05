import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgModule } from "@angular/core";
import { PipeModule } from "../pipes/pipe.module";

const COMPONENTS: any = [NavigationBarComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, PipeModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class NavigationBarModule {}
