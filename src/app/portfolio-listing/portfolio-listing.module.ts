import { CommonModule, JsonPipe } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioListingHeaderContainer } from "./portfolio-listing-header/porfolio-listing-header.container";
import { PortfolioListingHeaderComponent } from "./portfolio-listing-header/porfolio-listing-header.component";
import { PortfolioListingTableComponent } from "./portfolio-listing-table/portfolio-listing-table.component";
import { PortfolioListingSummaryComponent } from "./portfolio-listing-summary/portfolio-listing-summary.component";
import { PortfolioListingSummaryContainerComponent } from "./portfolio-listing-summary/portfolio-listing-summary.container.component";
import { PortfolioListingComponent } from "./portfolio-listing.component";
import { PortfolioListingContainer } from "./portfolio-listing.container";

const COMPONENTS: any = [
    PortfolioListingHeaderContainer,
    PortfolioListingHeaderComponent,
    PortfolioListingSummaryComponent,
    PortfolioListingSummaryContainerComponent,
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
