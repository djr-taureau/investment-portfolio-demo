import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioListingSummaryComponent } from "./portfolio-listing-summary/portfolio-listing-summary.component";
import { PortfolioListingSummaryContainerComponent } from "./portfolio-listing-summary/portfolio-listing-summary.container.component";
import { PortfolioListingComponent } from "./portfolio-listing.component";
import { PortfolioListingContainer } from "./portfolio-listing.container";
// test
const COMPONENTS: any = [
    PortfolioListingContainer,
    PortfolioListingComponent,
    PortfolioListingSummaryComponent,
    PortfolioListingSummaryContainerComponent
];
const PORTFOLIO_COMPANIES_ROUTES: Routes = [
    {
        path: "",
        component: PortfolioListingContainer
    }
];
@NgModule({
    imports: [CommonModule, RouterModule.forChild(PORTFOLIO_COMPANIES_ROUTES), SharedModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioListingModule {}
