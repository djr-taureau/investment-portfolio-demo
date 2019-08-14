import { NgModule } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common";
import { BillionsPipe } from "@shared/pipes/billions.pipe";
import { CalculatePortfolioDashboardNavBarClassesPipe } from "@shared/pipes/calculate-portfolio-dashboard-nav-bar-classes.pipe";
import { MillionsPipe } from "@shared/pipes/millions.pipe";
import { PositiveOrNegativePipe } from "@shared/pipes/positive-or-negative.pipe";
import { CalculateNavBarClassesPipe } from "./calculate-nav-bar-classes.pipe";

const PIPES = [BillionsPipe, CalculateNavBarClassesPipe, CalculatePortfolioDashboardNavBarClassesPipe, MillionsPipe, PositiveOrNegativePipe];
const PROVIDERS = [DecimalPipe];

@NgModule({
    imports: [CommonModule],
    exports: PIPES,
    declarations: PIPES,
    providers: PROVIDERS
})
export class PipeModule {}
