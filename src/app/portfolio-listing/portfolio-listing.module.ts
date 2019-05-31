import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PortfolioListingTableComponent } from "./portco-listing-table/portfolio-listing-table.component";
import { PortfolioListingComponent } from "./portfolio-listing.component";
import { PortfolioListingContainer } from "./portfolio-listing.container";

const COMPONENTS: any = [PortfolioListingContainer, PortfolioListingComponent, PortfolioListingTableComponent];
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
