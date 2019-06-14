import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { MatIconModule } from "@angular/material/icon";
import { NgModule } from "@angular/core";
import { PortfolioListingComponent } from "./portfolio-listing.component";
import { PortfolioListingContainer } from "./portfolio-listing.container";
import { PortfolioListingHeaderComponent } from "./portfolio-listing-header/porfolio-listing-header.component";
import { PortfolioListingHeaderContainer } from "./portfolio-listing-header/porfolio-listing-header.container";
import { PortfolioListingSummaryComponent } from "./portfolio-listing-summary/portfolio-listing-summary.component";
import { PortfolioListingSummaryContainer } from "./portfolio-listing-summary/portfolio-listing-summary.container";
import { PortfolioListingTableComponent } from "./portfolio-listing-table/portfolio-listing-table.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

const COMPONENTS: any = [
    PortfolioListingHeaderContainer,
    PortfolioListingHeaderComponent,
    PortfolioListingSummaryComponent,
    PortfolioListingSummaryContainer,
    PortfolioListingTableComponent,
    PortfolioListingContainer,
    PortfolioListingComponent
];

const PORTFOLIO_COMPANIES_ROUTES: Routes = [
    {
        path: "",
        component: PortfolioListingContainer
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(PORTFOLIO_COMPANIES_ROUTES), SharedModule, MatIconModule, HttpClientModule],
    declarations: COMPONENTS,
    exports: COMPONENTS
})
export class PortfolioListingModule {}
