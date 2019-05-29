import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EllipsisPipe } from "./ellipsis";

@NgModule({
    declarations: [EllipsisPipe],
    imports: [CommonModule],
    exports: [EllipsisPipe]
})
export class DirectivesModule {}
