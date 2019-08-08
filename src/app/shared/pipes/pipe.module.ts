import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CalculatePortfolioDashboardNavBarClassesPipe } from "@shared/pipes/calculate-portfolio-dashboard-nav-bar-classes.pipe";
import { CalculateNavBarClassesPipe } from "./calculate-nav-bar-classes.pipe";

const PIPES = [CalculateNavBarClassesPipe, CalculatePortfolioDashboardNavBarClassesPipe];

@NgModule({
    imports: [CommonModule],
    exports: PIPES,
    declarations: PIPES
})
export class PipeModule {}
