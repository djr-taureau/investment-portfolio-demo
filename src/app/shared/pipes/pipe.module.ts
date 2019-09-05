import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { CalculatePortfolioDashboardNavBarClassesPipe } from "@shared/pipes/calculate-portfolio-dashboard-nav-bar-classes.pipe";
import { PercentOrNotAvailablePipe } from "@shared/pipes/percent-or-not-available.pipe";
import { PositiveOrNegativePipe } from "@shared/pipes/positive-or-negative.pipe";
import { ShortNumberPipe } from "@shared/pipes/short-number.pipe";
import { CalculateNavBarClassesPipe } from "./calculate-nav-bar-classes.pipe";

const PIPES = [
    CalculateNavBarClassesPipe,
    CalculatePortfolioDashboardNavBarClassesPipe,
    ShortNumberPipe,
    PercentOrNotAvailablePipe,
    PositiveOrNegativePipe
];
const PROVIDERS = [DecimalPipe];

@NgModule({
    imports: [CommonModule],
    exports: PIPES,
    declarations: PIPES,
    providers: PROVIDERS
})
export class PipeModule {}
