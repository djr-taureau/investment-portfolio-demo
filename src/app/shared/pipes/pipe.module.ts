import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalculateNavBarClassesPipe } from "./calculate-nav-bar-classes.pipe";

const PIPES = [CalculateNavBarClassesPipe];

@NgModule({
    imports: [CommonModule],
    exports: PIPES,
    declarations: PIPES
})
export class PipeModule {}
