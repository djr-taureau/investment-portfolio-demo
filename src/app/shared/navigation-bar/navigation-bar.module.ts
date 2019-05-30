import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { NavigationBarComponent } from "../navigation-bar/navigation-bar.component";
import { NgModule } from "@angular/core";

const COMPONENTS: any = [NavigationBarComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class NavigationBarModule {}
