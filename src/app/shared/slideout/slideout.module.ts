import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "../material/material.module";
import { SlideoutPanelComponent } from "./slideout-panel.component";
import { SlideoutContainerComponent } from "./slideout.container.component";

const COMPONENTS: any = [SlideoutPanelComponent, SlideoutContainerComponent];

@NgModule({
    imports: [CommonModule, FlexLayoutModule, MaterialModule, RouterModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    entryComponents: COMPONENTS
})
export class SlideoutModule {}
