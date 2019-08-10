import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { OverlayModule } from "@angular/cdk/overlay";
import { EllipsisPipe } from "./ellipsis";
import { TooltipDirective } from "./tooltip/tooltip.directive";
import { TooltipComponent } from "./tooltip/tooltip.component";

@NgModule({
    declarations: [EllipsisPipe, TooltipDirective, TooltipComponent],
    imports: [CommonModule, OverlayModule],
    exports: [EllipsisPipe, TooltipDirective, TooltipComponent],
    entryComponents: [TooltipComponent]
})
export class DirectivesModule {}
